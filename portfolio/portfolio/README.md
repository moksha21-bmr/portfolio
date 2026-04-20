# 🚀 Bommireddy Mokshagna — Portfolio

A sleek, dark-themed personal portfolio with advanced animations, particle effects, and smooth transitions.

## 🌟 Features

- **8 Separate Sections** — Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
- **Custom cursor** with trailing glow effect
- **Particle network** background on hero
- **Typed text** animation cycling through identities
- **Scroll reveal** animations (fade up, slide left/right, scale)
- **Animated gradient borders** on profile photo
- **SVG score rings** that animate on scroll (Education section)
- **Hover glow** effects on all cards (follows mouse)
- **Sticky nav** with section highlighting
- **Fully responsive** for mobile

## 📁 Structure

```
portfolio/
├── index.html              ← Main portfolio file (open this in browser)
├── assets/
│   ├── css/style.css       ← All styles & animations
│   ├── js/main.js          ← All interactivity
│   ├── images/
│   │   ├── profile/        ← Add photo.jpg here
│   │   └── projects/       ← Add project screenshots here
│   ├── README.md           ← Image placement guide
│   └── Resume_Moksha.pdf   ← Your resume (download button ready)
```

## 🚀 Getting Started

1. Open `index.html` in any browser — works instantly
2. Add your photo to `assets/images/profile/photo.jpg`
3. Add project screenshots to `assets/images/projects/`
4. See `assets/README.md` for detailed image specs

## 🎨 Customization

All design tokens are CSS variables in `:root` — easy to retheme:
- `--accent` → main blue color
- `--accent2` → purple accent
- `--accent3` → green accent
- `--bg`, `--bg2`, `--bg3` → background layers

## 📦 Deployment

Works as a **static site** — upload the entire `portfolio/` folder to:
- GitHub Pages
- Netlify (drag & drop)
- Vercel
- Any web hosting

No build step required. Pure HTML/CSS/JS.
