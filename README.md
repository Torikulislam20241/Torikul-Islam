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
│   ├── data/
│   │   ├── site.js                   ← profile, nav, socials, CV, stats
│   │   └── research.js               ← publications
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

| What to change                | Where                                                    |
|-------------------------------|----------------------------------------------------------|
| Name, role, email, location   | `src/data/site.js` → `profile`                           |
| CV file / filename            | `public/assets/` + `src/data/site.js` → `cv`             |
| Hero stats (100+, 3+, 98%)    | `src/data/site.js` → `stats`                             |
| Navigation links              | `src/data/site.js` → `navLinks`                          |
| Social links                  | `src/data/site.js` → `socialLinks`                       |
| WhatsApp number / message     | `src/data/site.js` → `whatsapp`                          |
| Hero code-card snippet        | `src/components/Hero.jsx` → `codeSnippet`                |
| Services list                 | `src/components/Services.jsx` → `services`               |
| Projects                      | `src/components/Work.jsx` → `projects`                   |
| Testimonials                  | `src/components/Testimonials.jsx` → `testimonials`       |
| Skills & percentages          | `src/components/Skills.jsx` → `skillGroups`              |
| Accent colour, spacing, radii | `src/styles/custom.css` → `:root` token block            |
| Background gradient / grid    | `src/styles/custom.css` → `.site-background*`            |

---

## 📞 Contact

**Torikul Islam Naeem**
📧 naeemislam0252@gmail.com
🔗 https://www.linkedin.com/in/torikul-islam-naeem
🐱 https://github.com/Torikulislam20241
