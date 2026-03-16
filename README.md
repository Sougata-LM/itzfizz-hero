# Itzfizz Digital — Scroll-Driven Hero Section

> Internship Assignment: Scroll-Driven Hero Section Animation  
> Built with Next.js 14, GSAP (ScrollTrigger), Tailwind CSS

## ✦ Live Demo

**[View Live →](https://Sougata-LM.github.io/itzfizz-hero)**

## ✦ Features

### Initial Load Animation
- Badge fades in with a pulsing dot
- Headline letters stagger in one-by-one with `translateY` easing
- Subtitle and divider line animate in sequence
- Statistics count up from zero with a smooth easing curve
- Central device visual scales in with elastic easing

### Scroll-Based Animation (Core)
- Device visual moves upward and slightly tilts as you scroll (GSAP ScrollTrigger, `scrub: 1.2`)
- Headline letters scatter in different directions based on scroll progress
- Statistics fade out smoothly as the user scrolls away
- Ambient orbs parallax at a different speed for depth
- Continuous floating animation on the device (GSAP `yoyo`)

### Below-Fold Section
- Service cards reveal with scroll-triggered stagger + 3D `rotateX`
- CTA block scales in with `back.out` easing

### Performance
- All animations use `transform` and `opacity` — no layout reflows
- `will-change` applied only to animated elements
- `passive: true` on scroll listeners
- GSAP `ScrollTrigger` with `scrub` for GPU-smooth scroll binding
- Dynamic GSAP import (code splitting)

### UX Details
- Custom cursor with smooth ring follow
- Scroll progress bar
- Scan line + noise texture overlays
- CSS glitch effect on headline
- Animated dot in badge

## ✦ Tech Stack

| Tech | Purpose |
|---|---|
| **Next.js 14** | Framework (App Router, static export) |
| **React 18** | UI components |
| **GSAP 3 + ScrollTrigger** | Scroll animations & intro timeline |
| **Tailwind CSS** | Utility styling |
| **Barlow Condensed** | Display typeface |
| **Space Mono** | Monospace / labels |

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
```

## ✦ Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to **GitHub Actions**
4. Push to `main` — the workflow auto-deploys

## ✦ Project Structure

```
src/
  app/
    globals.css        # CSS variables, base styles, keyframes
    layout.js          # Root layout with Google Fonts
    page.js            # Main page composition
  components/
    HeroSection.js     # Hero with GSAP intro + scroll animations
    BelowFold.js       # Services section with scroll-triggered cards
    NavBar.js          # Animated navbar
    CustomCursor.js    # Custom cursor + ring follow
    ScrollProgress.js  # Top progress bar
```

---

Made with ♥ for the Itzfizz Digital Internship
