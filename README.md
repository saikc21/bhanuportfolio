# Bhanu Charan K — Portfolio

A super-professional, fully responsive single-page portfolio website for [bhanucharank.dev](https://bhanucharank.dev).

## ✨ Features

- **Dark glassmorphism design** with animated gradient orbs and dot-grid background
- **Typewriter hero** — cycling through role phrases
- **Animated counters** (years experience, projects, technologies)
- **Scroll-reveal** entrance animations (up / left / right)
- **Skill bars** animated on scroll into view
- **Vertical timeline** for work experience
- **Project cards** with hover effects & featured badge
- **Client-side validated contact form** with loading / success states
- **Fully responsive** — mobile, tablet, desktop
- **Accessible** — semantic HTML5, ARIA labels, keyboard-navigable
- **Zero dependencies** — plain HTML + CSS + Vanilla JS

## 📁 File Structure

```
bhanuportfolio/
├── index.html   # Main single-page HTML
├── styles.css   # All styles (dark theme, animations, responsive)
├── script.js    # Vanilla JS (nav, typing, counters, scroll-reveal, form)
└── README.md
```

## 🚀 Deployment

### GitHub Pages
1. Push to a public repo.
2. Go to **Settings → Pages → Source → main / root**.
3. Set your custom domain to `bhanucharank.dev` in the **Custom domain** field.
4. Add a CNAME record in your DNS: `bhanucharank.dev → <username>.github.io`.

### Netlify / Vercel
Drag-and-drop the folder or connect the GitHub repo — the static site deploys instantly.

## 🛠 Customisation

| What to update | Where |
|---|---|
| Name, tagline, bio | `index.html` – `#home`, `#about` sections |
| Social links & email | `index.html` – `hero__social`, `contact__info`, footer |
| Work experience | `index.html` – `#experience` timeline cards |
| Projects | `index.html` – `#projects` grid |
| Education & certs | `index.html` – `#education` section |
| Skills & proficiency % | `index.html` – `#skills` section |
| Resume PDF link | `<a href="#">` in about section — set `href` to your PDF path |
| Typing phrases | `script.js` – `phrases` array |
| Colour scheme | `styles.css` – `:root` CSS custom properties |
| Contact form back-end | `script.js` – replace the `setTimeout` stub with Formspree / EmailJS |

## 📄 License

MIT — feel free to use and customise for your own portfolio.