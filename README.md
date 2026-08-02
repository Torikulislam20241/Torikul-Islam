# Torikul Islam Naeem — Portfolio

A modern, responsive personal portfolio built with **React 18** and **Vite**, styled with hand-written CSS (no UI framework).

---

## 🛠️ Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | React 18 + Vite 5                                   |
| Styling    | Custom CSS with design tokens (`src/styles/custom.css`) |
| Fonts      | Space Grotesk (headings) · Inter (body) · system mono (code card) |
| Icons      | Inline SVG (`src/components/TechIcon.jsx`)          |
| Forms      | EmailJS with a `mailto:` fallback                   |
| Animations | CSS keyframes · IntersectionObserver                |

No CSS framework, icon package, or animation library is installed — the only runtime
dependencies are `react`, `react-dom`, and `emailjs-com`.

---

## ✅ Prerequisites

- **Node.js** v18 or higher → https://nodejs.org
- **npm** (comes with Node.js)

```bash
node -v
npm -v
```

---

## 🚀 Running in VS Code

1. **File → Open Folder…** and select the `portfolio` folder.
2. Open the terminal with **Ctrl + `` ` ``**.
3. Install dependencies:

```bash
npm install
```

4. Start the dev server:

```bash
npm run dev
```

5. Open **http://localhost:5173/**.

---

## 🛠️ Admin panel

Edit every piece of text, every project, and every image on the site from a local
dashboard — no code required.

```bash
npm run admin
```

That opens **http://localhost:4321** in your browser and starts the site preview at
**http://localhost:5173** at the same time. Edit a field and the preview updates after
you save. When you're happy, click **Publish…** — any pending edits are saved
automatically, then the panel checks the production build, commits and pushes to GitHub,
deploys to Vercel production, and verifies the new build at the live URL before reporting
success.

**What you can edit**

| Section | Covers |
|---|---|
| Profile & contact | Name, role, location, summary, email, phone, WhatsApp, portrait, avatar, CV, hero stats, hero tags, nav links, social links |
| Section text | The eyebrow, heading, and description above every section, plus the About page copy and info cards |
| Projects | Add, edit, reorder, delete project cards including screenshots |
| Services | Service cards, icons, and deliverables |
| Skills | Skill groups, icons, percentages, and individual skills |
| Testimonials | Client quotes, names, roles, and ratings |
| Research & publications | Papers, abstracts, authors, keywords — each gets its own `/research/<slug>` page |

**Uploads** are optimised automatically: images are rotated upright, resized to the size
the layout actually needs, and re-encoded as WebP. A 4.7 MB phone photo becomes roughly
29 KB. PDFs (your CV) are stored as-is.

**Safety**

- The server binds to `127.0.0.1`, so nothing outside your computer can reach it.
- It lives in `admin/`, outside `src/` — Vite never bundles it, and the published site
  contains no admin code. Verified on every build.
- Writes go to plain JSON files in `src/content/`, so every edit is a normal git diff.
  Made a mistake? `git checkout src/content/` restores everything, or use the version
  history in VS Code.
- Requests are validated against `admin/schema.js`; unknown fields are rejected.

**If something goes wrong**

| Problem | Fix |
|---|---|
| `Port 4321 is already in use` | Close the other panel, or run `ADMIN_PORT=4322 npm run admin` |
| Publish fails at the Vercel step | Run `npx vercel login`, then publish again |
| Publish fails at the push step | Check your GitHub credentials, then publish again |
| Image upload says conversion failed | Run `npm install` to reinstall `sharp` |
| Preview didn't start | Run `npm run dev` in a second terminal |

To add a new editable field, add it to `admin/schema.js` — the form builds itself from
that file.

---

## 📄 Replacing the CV

The CV is served as a static file and linked with the HTML `download` attribute from the
hero, the desktop navbar, the mobile menu, the About page, and the footer.

1. Export your new CV as a PDF.
2. Rename it to **`Torikul-Islam-CV.pdf`**.
3. Replace **`public/assets/Torikul-Islam-CV.pdf`**.

Keeping the same filename means no code changes are needed. To use a different filename,
update `cv.href` and `cv.fileName` in [`src/data/site.js`](src/data/site.js) — every
download link reads from there.

---

## 🖼️ Images

Images live in `public/` and are served as WebP for size:

| Asset                                     | Used by                       |
|-------------------------------------------|-------------------------------|
| `public/assets/torikul-islam-portrait.webp` | About page portrait (720×720) |
| `public/assets/torikul-islam-avatar.webp`   | Hero code-card avatar (160×160) |
| `public/projects/project-*.webp`            | Project cards                 |

To swap the portrait, export a square image, save it as WebP at ~720×720, and replace the
file (or point `profile.portrait` in `src/data/site.js` at a new path). The original PNG
and JPG sources are kept in `public/` for reference; they are not requested by the site.

---

## 📦 Build for Production

```bash
npm run build
```

This creates an optimised `dist/` folder. Deploy it to Vercel, Netlify, or any static host.
`vercel.json` already rewrites all routes to `index.html` for client-side routing.

---

## 📁 Project Structure

```
portfolio/
├── admin/                            ← local admin panel (never deployed)
│   ├── server.js                     ← content API, uploads, publish
│   ├── schema.js                     ← defines every editable field
│   └── ui/                           ← dashboard (plain HTML/CSS/JS)
├── public/
│   ├── assets/
│   │   ├── Torikul-Islam-CV.pdf      ← replace to publish a new CV
│   │   ├── torikul-islam-portrait.webp
│   │   └── torikul-islam-avatar.webp
│   └── projects/                     ← project screenshots
├── src/
│   ├── components/
│   │   ├── SiteBackground.jsx        ← fixed gradient + grid backdrop
│   │   ├── Navbar.jsx                ← desktop nav + accessible mobile menu
│   │   ├── Logo.jsx                  ← wordmark
│   │   ├── Hero.jsx                  ← hero with code-card visual
│   │   ├── SectionHeading.jsx        ← shared eyebrow/title/description block
│   │   ├── TechIcon.jsx              ← inline SVG icon set
│   │   ├── About.jsx / Skills.jsx / Services.jsx / Work.jsx
│   │   ├── Testimonials.jsx / Achievements.jsx / Contact.jsx / Footer.jsx
│   │   ├── ResearchDetail.jsx / Cursor.jsx / ScrollProgress.jsx / WhatsAppChat.jsx
│   ├── content/                      ← all site content as JSON (admin panel writes here)
│   │   ├── profile.json  ├ sections.json  ├ projects.json
│   │   ├── services.json ├ skills.json    ├ testimonials.json
│   │   └── research.json
│   ├── data/
│   │   ├── site.js                   ← thin adapter over profile.json
│   │   └── research.js               ← thin adapter over research.json
│   ├── styles/
│   │   └── custom.css                ← design tokens + all styles
│   ├── App.jsx                       ← routing, page titles, scroll reveal
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## ✏️ Common Customisations

Most content is editable in the admin panel (`npm run admin`) — the table below is for
things that still need code.

| What to change                | Where                                                    |
|-------------------------------|----------------------------------------------------------|
| Any site text, projects, skills, services, testimonials, research, images, CV | **Admin panel** — `npm run admin` |
| Hero code-card snippet        | `src/components/Hero.jsx` → `codeSnippet`                |
| Accent colour, spacing, radii | `src/styles/custom.css` → `:root` token block            |
| Background gradient / grid    | `src/styles/custom.css` → `.site-background*`            |
| Page titles / SEO meta        | `index.html` and `src/App.jsx` → `pageTitles`            |
| A new editable admin field    | `admin/schema.js`                                        |

---

## 📞 Contact

**Torikul Islam Naeem**
📧 naeemislam0252@gmail.com
🔗 https://www.linkedin.com/in/torikul-islam-naeem
🐱 https://github.com/Torikulislam20241
