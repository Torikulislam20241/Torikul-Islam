# Torikul Islam Naeem — Portfolio

A modern, responsive personal portfolio built with **React**, **JavaScript**, and **Bootstrap 5**.

---

## 🛠️ Tech Stack

| Layer       | Technology                            |
|-------------|---------------------------------------|
| Frontend    | React 18 + Vite                       |
| Styling     | Bootstrap 5.3 + Custom CSS            |
| SEO         | react-helmet-async                    |
| Fonts       | Syne (display) · DM Sans (body)       |
| Animations  | CSS keyframes · IntersectionObserver  |

---

## ✅ Prerequisites

Make sure you have installed:

- **Node.js** v18 or higher → https://nodejs.org  
- **npm** (comes with Node.js) or **yarn**

Check with:
```bash
node -v
npm -v
```

---

## 🚀 Running in VS Code (Step-by-step)

### 1. Open the project folder in VS Code

- Open **VS Code**
- Go to **File → Open Folder…**
- Select the `portfolio` folder you extracted from the ZIP

### 2. Open the integrated terminal

- Press **Ctrl + `` ` ``** (backtick) — or go to **Terminal → New Terminal**

### 3. Install dependencies

```bash
npm install
```

Wait until it finishes. This installs React, Bootstrap, and all other packages into a `node_modules/` folder.

### 4. Start the development server

```bash
npm run dev
```

You'll see output like:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Open in browser

Click **http://localhost:5173/** or press **O** in the terminal.

Your portfolio is now running locally! 🎉

---

## 🖼️ Adding Your Profile Picture

1. Name your photo **`Picture.png`**
2. Place it inside the **`public/`** folder (replacing any existing placeholder)
3. The site will automatically display it in the Hero and About sections

---

## 📦 Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimised `dist/` folder. Upload that folder to any static host:

- **Vercel** → `vercel --prod` or drag-and-drop the `dist/` folder
- **Netlify** → Drag-and-drop the `dist/` folder
- **GitHub Pages** → Push and configure Pages to serve `dist/`

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── Picture.png          ← Replace with your own photo
├── src/
│   ├── components/
│   │   ├── Cursor.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Work.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   └── custom.css       ← All dark-theme & custom styles
│   ├── App.jsx              ← Root component + SEO Helmet
│   └── main.jsx             ← React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## ✏️ Common Customisations

| What to change          | Where                                      |
|-------------------------|--------------------------------------------|
| Profile picture         | Replace `public/Picture.png`               |
| Name / headline         | `src/components/Hero.jsx`                  |
| About text              | `src/components/About.jsx`                 |
| Services list           | `src/components/Services.jsx` → `services` array |
| Projects / portfolio    | `src/components/Work.jsx` → `projects` array     |
| Testimonials            | `src/components/Testimonials.jsx` → `testimonials` array |
| Skills & percentages    | `src/components/Skills.jsx` → `skillsData` object |
| Contact email           | `src/components/Contact.jsx`               |
| Accent colour (#6ee7b7) | `src/styles/custom.css` → `:root { --accent }` |
| SEO meta tags           | `src/App.jsx` → `<Helmet>` block           |

---

## 📞 Contact

**Torikul Islam Naeem**  
📧 naeemislam0252@gmail.com  
🔗 https://www.linkedin.com/in/torikul-islam-naeem  
🐱 https://github.com/Torikulislam20241
