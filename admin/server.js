/*
  Local-only admin server. Started with `npm run admin`.

  Binds to 127.0.0.1 so it is unreachable from other machines, and lives outside
  src/ so Vite never bundles it — the published site contains no admin code.

  Endpoints:
    GET  /api/schema            content schema for the UI
    GET  /api/content/:name     read a content file
    PUT  /api/content/:name     write a content file (validated, atomic)
    POST /api/upload            image/PDF upload; images become WebP
    GET  /api/status            git status + list of changed files
    POST /api/publish           commit, push, and deploy to Vercel (streams output)
*/
import http from 'node:http'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { schema } from './schema.js'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '..')

if (!existsSync(path.join(ROOT, 'package.json'))) {
  console.error('  Could not find package.json — run this from the portfolio folder.')
  process.exit(1)
}

const PORT = Number(process.env.ADMIN_PORT) || 4321
const HOST = '127.0.0.1'
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
}

/* --- helpers ----------------------------------------------------------- */

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, { 'Cache-Control': 'no-store', ...headers })
  res.end(body)
}

const sendJson = (res, status, data) =>
  send(res, status, JSON.stringify(data), { 'Content-Type': 'application/json; charset=utf-8' })

const readBody = (req, limit = MAX_UPLOAD_BYTES) =>
  new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) {
        reject(new Error('Payload too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })

/* Write via a temp file then rename, so a crash mid-write can't truncate content. */
const writeJsonAtomic = async (absolutePath, data) => {
  const temp = `${absolutePath}.tmp`
  await fs.writeFile(temp, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  await fs.rename(temp, absolutePath)
}

/*
  Windows spawn rules, and why this split matters:
  - npm/npx are .cmd shims. Node refuses to spawn those without a shell (CVE-2024-27980),
    so they need `shell: true` — which concatenates arguments without escaping them.
    Only ever pass them fixed arguments.
  - git is a real executable, so it runs without a shell and receives arguments verbatim.
    Everything carrying user input (the commit message) goes through git for that reason.
*/
const isWindows = process.platform === 'win32'
const shellCommands = new Set(['npm', 'npx', 'yarn', 'pnpm'])

const run = (command, args, options = {}) =>
  new Promise((resolve) => {
    const useShell = isWindows && shellCommands.has(command)
    const child = spawn(command, args, { cwd: ROOT, shell: useShell, ...options })
    let stdout = ''
    let stderr = ''
    child.stdout?.on('data', (d) => { stdout += d })
    child.stderr?.on('data', (d) => { stderr += d })
    child.on('close', (code) => resolve({ code, stdout, stderr }))
    child.on('error', (error) => resolve({ code: 1, stdout, stderr: error.message }))
  })

/* --- validation --------------------------------------------------------- */

const collectFields = (entry) => {
  if (entry.kind === 'list') return entry.fields || []
  const fields = []
  for (const group of entry.groups || []) {
    fields.push(...(group.fields || []))
  }
  return fields
}

/* Rejects anything the schema doesn't describe, so a malformed request can't
   write arbitrary shapes into the site's content files. */
const validate = (name, value) => {
  const entry = schema[name]
  if (!entry) return `Unknown content file "${name}"`

  if (entry.kind === 'list') {
    if (!Array.isArray(value)) return 'Expected an array'
    const keys = new Set(collectFields(entry).map((f) => f.key))
    for (const [index, item] of value.entries()) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) return `Entry ${index + 1} must be an object`
      for (const key of Object.keys(item)) {
        if (!keys.has(key)) return `Entry ${index + 1} has unknown field "${key}"`
      }
    }
    return null
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) return 'Expected an object'
  return null
}

/* --- multipart parsing (single file, no dependency) --------------------- */

const parseMultipart = (buffer, contentType) => {
  const boundaryMatch = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType || '')
  if (!boundaryMatch) throw new Error('Missing multipart boundary')
  const boundary = Buffer.from(`--${boundaryMatch[1] || boundaryMatch[2]}`)

  const parts = []
  let index = buffer.indexOf(boundary)
  while (index !== -1) {
    const start = index + boundary.length
    const next = buffer.indexOf(boundary, start)
    if (next === -1) break
    const chunk = buffer.slice(start, next)
    const headerEnd = chunk.indexOf('\r\n\r\n')
    if (headerEnd !== -1) {
      const headers = chunk.slice(0, headerEnd).toString('utf8')
      const body = chunk.slice(headerEnd + 4, chunk.length - 2)
      const nameMatch = /name="([^"]+)"/.exec(headers)
      const fileMatch = /filename="([^"]*)"/.exec(headers)
      parts.push({ name: nameMatch?.[1], filename: fileMatch?.[1], body })
    }
    index = next
  }
  return parts
}

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'upload'

/* --- request handlers --------------------------------------------------- */

const handleGetContent = async (res, name) => {
  const entry = schema[name]
  if (!entry) return sendJson(res, 404, { error: `Unknown content file "${name}"` })
  const raw = await fs.readFile(path.join(ROOT, entry.file), 'utf8')
  return sendJson(res, 200, { data: JSON.parse(raw) })
}

const handlePutContent = async (req, res, name) => {
  const entry = schema[name]
  if (!entry) return sendJson(res, 404, { error: `Unknown content file "${name}"` })

  let payload
  try {
    payload = JSON.parse((await readBody(req, 2 * 1024 * 1024)).toString('utf8'))
  } catch {
    return sendJson(res, 400, { error: 'Request body was not valid JSON' })
  }

  const problem = validate(name, payload)
  if (problem) return sendJson(res, 400, { error: problem })

  await writeJsonAtomic(path.join(ROOT, entry.file), payload)
  return sendJson(res, 200, { ok: true, file: entry.file })
}

const handleUpload = async (req, res) => {
  let parts
  try {
    parts = parseMultipart(await readBody(req), req.headers['content-type'])
  } catch (error) {
    return sendJson(res, 400, { error: error.message })
  }

  const file = parts.find((p) => p.filename)
  if (!file || !file.body.length) return sendJson(res, 400, { error: 'No file received' })

  const dir = parts.find((p) => p.name === 'dir')?.body.toString('utf8') || 'assets'
  const width = Number(parts.find((p) => p.name === 'width')?.body.toString('utf8')) || 0
  if (!['assets', 'projects'].includes(dir)) return sendJson(res, 400, { error: 'Invalid target folder' })

  const extension = path.extname(file.filename).toLowerCase()
  const isImage = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'].includes(extension)
  const isPdf = extension === '.pdf'
  if (!isImage && !isPdf) return sendJson(res, 400, { error: 'Only images and PDF files are allowed' })

  const targetDir = path.join(ROOT, 'public', dir)
  await fs.mkdir(targetDir, { recursive: true })

  if (isPdf) {
    const name = `${slugify(file.filename)}.pdf`
    await fs.writeFile(path.join(targetDir, name), file.body)
    return sendJson(res, 200, {
      path: `/${dir}/${name}`,
      fileName: name,
      bytes: file.body.length,
      converted: false,
    })
  }

  /* Images are resized and re-encoded as WebP so uploads can't bloat the site. */
  const name = `${slugify(file.filename)}.webp`
  const destination = path.join(targetDir, name)
  try {
    const { default: sharp } = await import('sharp')
    let pipeline = sharp(file.body).rotate()
    if (width > 0) pipeline = pipeline.resize({ width, withoutEnlargement: true })
    const output = await pipeline.webp({ quality: 82, effort: 5 }).toBuffer()
    await fs.writeFile(destination, output)
    return sendJson(res, 200, {
      path: `/${dir}/${name}`,
      fileName: name,
      bytes: output.length,
      originalBytes: file.body.length,
      converted: true,
    })
  } catch (error) {
    return sendJson(res, 500, {
      error: `Image conversion failed: ${error.message}. Run "npm install" to make sure sharp is installed.`,
    })
  }
}

const handleStatus = async (res) => {
  const status = await run('git', ['status', '--porcelain'])
  const branch = await run('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
  const changes = status.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({ state: line.slice(0, 2).trim(), file: line.slice(2).trim() }))

  return sendJson(res, 200, {
    branch: branch.stdout.trim(),
    changes,
    clean: changes.length === 0,
  })
}

/* Streams command output back as newline-delimited JSON so the UI can show progress. */
const handlePublish = async (req, res) => {
  let payload = {}
  try {
    payload = JSON.parse((await readBody(req, 64 * 1024)).toString('utf8'))
  } catch {
    /* an empty body is fine — fall back to the default message */
  }

  /* Collapse to a single line: git takes this verbatim, and a stray newline would
     silently turn the rest of the message into a commit body. */
  const message =
    (payload.message || '').replace(/\s+/g, ' ').trim().slice(0, 200) ||
    'Update site content from admin panel'

  res.writeHead(200, {
    'Content-Type': 'application/x-ndjson; charset=utf-8',
    'Cache-Control': 'no-store',
  })

  const log = (level, text) => res.write(`${JSON.stringify({ level, text })}\n`)

  const step = async (label, command, args) => {
    log('step', label)
    const result = await run(command, args)
    const output = `${result.stdout}${result.stderr}`.trim()
    if (output) log('output', output)
    if (result.code !== 0) {
      log('error', `${label} failed (exit ${result.code})`)
      return false
    }
    return true
  }

  const status = await run('git', ['status', '--porcelain'])
  if (!status.stdout.trim()) {
    log('info', 'No content changes to commit — deploying the current code instead.')
  } else {
    if (!(await step('Staging changes', 'git', ['add', '-A']))) return res.end()
    if (!(await step('Committing', 'git', ['commit', '-m', message]))) return res.end()
  }

  if (!(await step('Pushing to GitHub', 'git', ['push']))) return res.end()

  log('step', 'Deploying to Vercel (this can take a minute)')
  const deploy = await run('npx', ['vercel', '--prod', '--yes'])
  const deployOutput = `${deploy.stdout}${deploy.stderr}`.trim()
  if (deployOutput) log('output', deployOutput)
  if (deploy.code !== 0) {
    log('error', 'Vercel deploy failed. Run "npx vercel login" if you are not signed in.')
    return res.end()
  }

  const url = /https:\/\/[^\s"]+\.vercel\.app/.exec(deploy.stdout)?.[0]
  log('done', url ? `Published. Live at ${url}` : 'Published.')
  return res.end()
}

const serveStatic = async (res, urlPath) => {
  const relative = urlPath === '/' ? 'ui/index.html' : urlPath.replace(/^\//, '')
  const target = path.join(HERE, relative)
  if (!target.startsWith(HERE)) return send(res, 403, 'Forbidden')

  try {
    const body = await fs.readFile(target)
    return send(res, 200, body, { 'Content-Type': MIME[path.extname(target)] || 'application/octet-stream' })
  } catch {
    return send(res, 404, 'Not found')
  }
}

/* --- server ------------------------------------------------------------- */

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`)
  const { pathname } = url

  try {
    if (pathname === '/api/schema') return sendJson(res, 200, { schema })
    if (pathname === '/api/status') return handleStatus(res)
    if (pathname === '/api/upload' && req.method === 'POST') return handleUpload(req, res)
    if (pathname === '/api/publish' && req.method === 'POST') return handlePublish(req, res)

    const contentMatch = /^\/api\/content\/([a-z]+)$/.exec(pathname)
    if (contentMatch) {
      if (req.method === 'GET') return handleGetContent(res, contentMatch[1])
      if (req.method === 'PUT') return handlePutContent(req, res, contentMatch[1])
      return sendJson(res, 405, { error: 'Method not allowed' })
    }

    return serveStatic(res, pathname)
  } catch (error) {
    return sendJson(res, 500, { error: error.message })
  }
})

/* Run the Vite dev server alongside the panel so edits appear live at :5173. */
const startPreview = () => {
  const vite = spawn('npm', ['run', 'dev'], {
    cwd: ROOT,
    shell: isWindows,
    stdio: 'ignore',
  })
  vite.on('error', () => console.warn('  Could not start the site preview — run "npm run dev" in another terminal.'))
  const stop = () => {
    vite.kill()
    process.exit(0)
  }
  process.on('SIGINT', stop)
  process.on('SIGTERM', stop)
  return vite
}

server.listen(PORT, HOST, () => {
  const url = `http://localhost:${PORT}`
  startPreview()

  console.log('')
  console.log('  Portfolio admin panel')
  console.log(`  ➜  Admin:   ${url}`)
  console.log('  ➜  Preview: http://localhost:5173')
  console.log('')
  console.log('  Press Ctrl+C to stop.')
  console.log('')

  /* Open the browser automatically, but never fail if that isn't possible. */
  const opener = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]]
    : process.platform === 'darwin' ? ['open', [url]]
      : ['xdg-open', [url]]
  spawn(opener[0], opener[1], { stdio: 'ignore', detached: true }).on('error', () => {}).unref()
})

/* Fail loudly if the port is taken rather than dying silently. */
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n  Port ${PORT} is already in use. Close the other admin panel, or run:`)
    console.error('  ADMIN_PORT=4322 npm run admin\n')
    process.exit(1)
  }
  throw error
})
