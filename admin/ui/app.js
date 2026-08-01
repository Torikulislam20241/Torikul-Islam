/*
  Admin panel UI. Plain ES modules, no build step and no dependencies —
  the server serves this folder directly.
*/

const $ = (selector) => document.querySelector(selector)

const state = {
  schema: {},
  active: null,
  data: null,
  dirty: false,
}

/* --- tiny DOM helper ---------------------------------------------------- */

const el = (tag, props = {}, children = []) => {
  const node = document.createElement(tag)
  for (const [key, value] of Object.entries(props)) {
    if (key === 'class') node.className = value
    else if (key === 'text') node.textContent = value
    else if (key.startsWith('on')) node.addEventListener(key.slice(2).toLowerCase(), value)
    else if (value !== undefined && value !== null && value !== false) node.setAttribute(key, value)
  }
  for (const child of [].concat(children)) {
    if (child) node.append(child)
  }
  return node
}

const api = async (url, options) => {
  const response = await fetch(url, options)
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`)
  return payload
}

const markDirty = () => {
  state.dirty = true
  $('#save').disabled = false
  setSaveState('Unsaved changes')
}

const setSaveState = (text, kind = '') => {
  const node = $('#save-state')
  node.textContent = text
  node.className = `save-state ${kind}`
}

/* --- field renderers ---------------------------------------------------- */

const labelled = (field, control) =>
  el('label', { class: 'field' }, [
    el('span', {}, [
      document.createTextNode(field.label),
      field.hint ? el('span', { class: 'hint', text: ` — ${field.hint}` }) : null,
    ]),
    control,
  ])

const textField = (field, value, onChange) => {
  const control = el(field.type === 'textarea' ? 'textarea' : 'input', {
    type: field.type === 'textarea' ? undefined : field.type === 'number' ? 'number' : 'text',
    value: field.type === 'textarea' ? undefined : value ?? '',
    min: field.min,
    max: field.max,
    onInput: (event) => {
      const raw = event.target.value
      onChange(field.type === 'number' ? Number(raw) : raw)
      markDirty()
    },
  })
  if (field.type === 'textarea') control.value = value ?? ''
  return labelled(field, control)
}

const selectField = (field, value, onChange) => {
  const control = el('select', {
    onChange: (event) => {
      onChange(event.target.value)
      markDirty()
    },
  }, field.options.map((option) => el('option', { value: option, text: option, selected: option === value })))
  return labelled(field, control)
}

/* Editable array of short strings, rendered as removable chips. */
const tagsField = (field, value, onChange) => {
  const items = Array.isArray(value) ? [...value] : []
  const wrap = el('div', { class: 'grid' })

  const render = () => {
    wrap.replaceChildren()
    wrap.append(
      el('div', { class: 'tags' }, items.map((item, index) =>
        el('span', { class: 'tag' }, [
          document.createTextNode(item),
          el('button', {
            type: 'button',
            'aria-label': `Remove ${item}`,
            text: '×',
            onClick: () => {
              items.splice(index, 1)
              onChange([...items])
              markDirty()
              render()
            },
          }),
        ]))),
      el('div', { class: 'string-row' }, [
        el('input', {
          type: 'text',
          placeholder: 'Add and press Enter',
          onKeydown: (event) => {
            if (event.key !== 'Enter') return
            event.preventDefault()
            const text = event.target.value.trim()
            if (!text) return
            items.push(text)
            onChange([...items])
            markDirty()
            event.target.value = ''
            render()
            wrap.querySelector('.string-row input')?.focus()
          },
        }),
      ]),
    )
  }

  render()
  return labelled(field, wrap)
}

/* Array of long strings (About paragraphs), one textarea per entry. */
const stringsField = (field, value, onChange) => {
  const items = Array.isArray(value) ? [...value] : []
  const wrap = el('div', { class: 'string-rows' })

  const render = () => {
    wrap.replaceChildren()
    items.forEach((item, index) => {
      const box = el('textarea', {
        onInput: (event) => {
          items[index] = event.target.value
          onChange([...items])
          markDirty()
        },
      })
      box.value = item
      wrap.append(el('div', { class: 'string-row' }, [
        box,
        el('button', {
          class: 'btn btn-small btn-danger',
          type: 'button',
          text: 'Remove',
          onClick: () => {
            items.splice(index, 1)
            onChange([...items])
            markDirty()
            render()
          },
        }),
      ]))
    })
    wrap.append(el('div', { class: 'add-row' }, [
      el('button', {
        class: 'btn btn-small',
        type: 'button',
        text: '+ Add paragraph',
        onClick: () => {
          items.push('')
          onChange([...items])
          markDirty()
          render()
        },
      }),
    ]))
  }

  render()
  return labelled({ label: field.label || 'Items' }, wrap)
}

const uploadFile = async (file, dir, width) => {
  const body = new FormData()
  body.append('dir', dir)
  if (width) body.append('width', String(width))
  body.append('file', file)
  const response = await fetch('/api/upload', { method: 'POST', body })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload.error || 'Upload failed')
  return payload
}

const imageField = (field, value, onChange) => {
  const preview = el('img', {
    class: 'image-preview',
    alt: '',
    src: value || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
  })
  const pathLabel = el('div', { class: 'image-path', text: value || 'No file selected' })
  const input = el('input', {
    type: 'file',
    accept: field.accept || 'image/*',
    onChange: async (event) => {
      const file = event.target.files?.[0]
      if (!file) return
      pathLabel.textContent = 'Uploading…'
      try {
        const result = await uploadFile(file, field.dir, field.width)
        onChange(result.path)
        markDirty()
        preview.src = result.path
        const saved = result.converted
          ? `${result.path} — ${(result.originalBytes / 1024).toFixed(0)} KB → ${(result.bytes / 1024).toFixed(0)} KB WebP`
          : `${result.path} — ${(result.bytes / 1024).toFixed(0)} KB`
        pathLabel.textContent = saved
      } catch (error) {
        pathLabel.textContent = error.message
      } finally {
        event.target.value = ''
      }
    },
  })

  const control = el('div', { class: 'image-field' }, [
    field.type === 'image' ? preview : null,
    el('div', { class: 'image-actions' }, [
      el('button', {
        class: 'btn btn-small',
        type: 'button',
        text: field.type === 'image' ? 'Upload image' : 'Upload file',
        onClick: () => input.click(),
      }),
      input,
      pathLabel,
    ]),
  ])

  return labelled(field, control)
}

const renderField = (field, container, onChange) => {
  const value = container[field.key]
  const set = (next) => { container[field.key] = next }

  if (field.type === 'list') return tagsField(field, value, (next) => { set(next); onChange?.() })
  if (field.type === 'select') return selectField(field, value, (next) => { set(next); onChange?.() })
  if (field.type === 'image' || field.type === 'file') return imageField(field, value, (next) => { set(next); onChange?.() })
  return textField(field, value, (next) => { set(next); onChange?.() })
}

/* --- list editor (projects, services, skills, testimonials, research) --- */

const renderList = (entry, items, mount) => {
  const render = () => {
    mount.replaceChildren()

    items.forEach((item, index) => {
      const card = el('div', { class: 'card' })
      const title = item[entry.itemLabel] || `Entry ${index + 1}`

      const move = (delta) => {
        const target = index + delta
        if (target < 0 || target >= items.length) return
        const [moved] = items.splice(index, 1)
        items.splice(target, 0, moved)
        markDirty()
        render()
      }

      card.append(
        el('div', { class: 'card-head' }, [
          el('h2', { text: title }),
          el('div', { class: 'list-actions' }, [
            el('button', { class: 'btn btn-small', type: 'button', text: '↑', 'aria-label': `Move ${title} up`, onClick: () => move(-1) }),
            el('button', { class: 'btn btn-small', type: 'button', text: '↓', 'aria-label': `Move ${title} down`, onClick: () => move(1) }),
            el('button', {
              class: 'btn btn-small btn-danger',
              type: 'button',
              text: 'Delete',
              onClick: () => {
                if (!confirm(`Delete "${title}"? You can undo this with git before publishing.`)) return
                items.splice(index, 1)
                markDirty()
                render()
              },
            }),
          ]),
        ]),
        el('div', { class: 'grid' }, entry.fields.map((field) => renderField(field, item))),
      )

      mount.append(card)
    })

    mount.append(el('div', { class: 'add-row' }, [
      el('button', {
        class: 'btn',
        type: 'button',
        text: `+ Add ${entry.label.replace(/s$/, '').toLowerCase()}`,
        onClick: () => {
          const blank = {}
          for (const field of entry.fields) {
            blank[field.key] = field.type === 'list' ? [] : field.type === 'number' ? 0 : ''
          }
          items.push(blank)
          markDirty()
          render()
        },
      }),
    ]))
  }

  render()
}

/* --- object editor (profile, sections) ---------------------------------- */

const renderObject = (entry, data, mount) => {
  mount.replaceChildren()

  for (const group of entry.groups) {
    const card = el('div', { class: 'card' })
    card.append(el('div', { class: 'card-head' }, [el('h2', { text: group.label })]))

    if (group.kind === 'list') {
      const items = data[group.key] ||= []
      const listMount = el('div', { class: 'grid' })
      renderList({ ...group, label: group.label, fields: group.fields }, items, listMount)
      card.append(listMount)
    } else if (group.kind === 'strings') {
      const holder = { value: data[group.key] || [] }
      card.append(stringsField({ label: group.label }, holder.value, (next) => { data[group.key] = next }))
    } else if (group.kind === 'nested') {
      const nested = data[group.key] ||= {}
      card.append(el('div', { class: 'grid' }, (group.fields || []).map((field) => renderField(field, nested))))
      for (const list of group.lists || []) {
        const listMount = el('div', { class: 'grid' })
        if (list.kind === 'strings') {
          listMount.append(stringsField({ label: list.label }, nested[list.key] || [], (next) => { nested[list.key] = next }))
        } else {
          const items = nested[list.key] ||= []
          renderList({ ...list, fields: list.fields }, items, listMount)
        }
        card.append(el('h3', { class: 'muted', text: list.label, style: 'margin-top:16px' }), listMount)
      }
    } else {
      card.append(el('div', { class: 'grid' }, group.fields.map((field) => renderField(field, data))))
    }

    mount.append(card)
  }
}

/* --- section loading ---------------------------------------------------- */

const openSection = async (name) => {
  if (state.dirty && !confirm('You have unsaved changes. Discard them?')) return

  state.active = name
  state.dirty = false
  $('#save').disabled = true
  setSaveState('')

  const entry = state.schema[name]
  $('#section-title').textContent = entry.label
  $('#section-hint').textContent = entry.hint || `Saved to ${entry.file}`

  for (const button of document.querySelectorAll('#nav button')) {
    button.classList.toggle('active', button.dataset.name === name)
  }

  const editor = $('#editor')
  editor.replaceChildren(el('p', { class: 'muted', text: 'Loading…' }))

  const { data } = await api(`/api/content/${name}`)
  state.data = data
  editor.replaceChildren()

  if (entry.kind === 'list') renderList(entry, data, editor)
  else renderObject(entry, data, editor)
}

const save = async () => {
  $('#save').disabled = true
  setSaveState('Saving…')
  try {
    await api(`/api/content/${state.active}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.data),
    })
    state.dirty = false
    setSaveState('Saved — the site preview reloads automatically', 'ok')
  } catch (error) {
    setSaveState(error.message, 'error')
    $('#save').disabled = false
  }
}

/* --- publish ------------------------------------------------------------ */

const openPublish = async () => {
  const dialog = $('#publish-dialog')
  const changes = $('#publish-changes')
  const log = $('#publish-log')

  log.hidden = true
  log.replaceChildren()
  changes.replaceChildren(el('p', { class: 'muted', text: 'Checking for changes…' }))
  $('#publish-confirm').disabled = false
  dialog.showModal()

  try {
    const status = await api('/api/status')
    changes.replaceChildren(
      status.clean
        ? el('p', { class: 'muted', text: 'No file changes — publishing will redeploy the current code.' })
        : el('div', {}, [
            el('p', { text: `${status.changes.length} changed file${status.changes.length === 1 ? '' : 's'} on branch ${status.branch}:` }),
            el('ul', {}, status.changes.map((change) => el('li', {}, [el('code', { text: `${change.state} ${change.file}` })]))),
          ]),
    )
  } catch (error) {
    changes.replaceChildren(el('p', { class: 'muted', text: error.message }))
  }
}

const publish = async () => {
  const log = $('#publish-log')
  const confirmButton = $('#publish-confirm')
  confirmButton.disabled = true
  log.hidden = false
  log.replaceChildren()

  const append = (level, text) => {
    log.append(el('div', { class: level, text }))
    log.scrollTop = log.scrollHeight
  }

  const response = await fetch('/api/publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: $('#publish-message').value }),
  })

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (!line.trim()) continue
      const event = JSON.parse(line)
      append(event.level, event.text)
    }
  }

  confirmButton.disabled = false
}

/* --- boot --------------------------------------------------------------- */

const boot = async () => {
  const { schema } = await api('/api/schema')
  state.schema = schema

  $('#nav').replaceChildren(...Object.entries(schema).map(([name, entry]) =>
    el('button', {
      type: 'button',
      'data-name': name,
      text: entry.label,
      onClick: () => openSection(name),
    })))

  $('#save').addEventListener('click', save)
  $('#open-publish').addEventListener('click', openPublish)
  $('#publish-confirm').addEventListener('click', publish)

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault()
      if (state.dirty) save()
    }
  })

  window.addEventListener('beforeunload', (event) => {
    if (!state.dirty) return
    event.preventDefault()
    event.returnValue = ''
  })

  await openSection(Object.keys(schema)[0])
}

boot().catch((error) => {
  document.body.replaceChildren(el('p', { style: 'padding:32px', text: `Failed to start: ${error.message}` }))
})
