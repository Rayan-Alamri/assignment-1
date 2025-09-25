# Technical Documentation

**Project:** Rayan Alamri – Personal Portfolio  
**Scope:** Assignment 1 – Foundation & AI Integration  
**Stack:** HTML5, CSS3, vanilla JavaScript

## 1) Overview

This project is a single-page, responsive portfolio with three sections: About, Projects, and Contact. It demonstrates semantic HTML, a small but scalable CSS architecture using variables (tokens), and two JS enhancements:

- Smooth in-page scrolling (respects reduced-motion settings)
- Dark/light theme toggle with preference stored in localStorage

No backend or build tooling is required.

## 2) Repository Structure

```
assignment-1/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── marsProject.svg
│       └── leagueProject.svg
└── docs/
    ├── ai-usage-report.md
    └── technical-documentation.md   ← (this file)
```

## 3) Technologies & Conventions

**HTML5:** semantic tags (header, main, section, article, footer)

**CSS3:**
- Design tokens via CSS variables for colors/spacing/shape
- Flexbox for layout (single-column card list)
- Data attribute theming: `:root[data-theme="light"|"dark"]`

**JavaScript:**
- Unbundled ES5/ES6, loaded with defer
- `scrollIntoView()` for smooth scrolling
- Theme persistence with localStorage

**Coding guidelines:**
- One `<h1>` (site title), `<h2>` for page sections, `<h3>` for project titles
- Labels tied to inputs (for ↔ id), proper input types, required attributes
- No inline styles or scripts

## 4) HTML Architecture

### Key landmarks & outline

```html
<header>…</header>
<main>
  <section id="about" class="container">…</section>
  <section id="projects" class="container">
    <h2>Projects</h2>
    <div class="projects-list">
      <article class="project-card">…</article>
      <article class="project-card">…</article>
    </div>
  </section>
  <section id="contact" class="container">…</section>
</main>
<footer>…</footer>
```

**Rationale:**
- Semantic grouping helps accessibility and SEO
- `article.project-card` keeps each project's title + description + image in one unit (single border/background)
- Navigation anchors (`href="#about"`, etc.) map to section ids

### Contact form semantics

```html
<form>
  <label for="name">Name:</label>
  <input id="name" name="name" type="text" required>

  <label for="email">Email:</label>
  <input id="email" name="email" type="email" required>

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="5" required></textarea>

  <button type="submit">Send</button>
</form>
```

- `type="email"` uses built-in validation
- `required` triggers native validation (no JS needed)
- Labels are explicit for screen readers

## 5) CSS Architecture

### 5.1 Tokens (Design System)

```css
:root{
  --bg:#ffffff;
  --text:#1f2937;
  --muted:#6b7280;
  --border:#e5e7eb;
  --card:#f9fafb;
  --radius:16px;
  --space-1:8px; --space-2:12px; --space-3:16px; --space-4:24px;
  --max-w:1000px;
}
```

Centralizes colors/spacing so themes and spacing can change in one place.

### 5.2 Base & Layout

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { margin:0; }
body{ background:var(--bg); color:var(--text); font-family:system-ui, ...; line-height:1.6; }

.container{ max-width:var(--max-w); margin:0 auto; padding:0 var(--space-3); }
section{ padding:var(--space-4) 0; }
section + section{ border-top:1px solid var(--border); }
```

- Predictable sizing with border-box
- `.container` constrains line length for readability

### 5.3 Projects (Flex, single column)

```css
.projects-list{
  display:flex;
  flex-direction:column; /* single column on all screens */
  gap:16px;
}
.project-card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:var(--radius);
  padding:16px;
}
.project-card h3{ margin:0 0 8px; }
.project-card p{ margin:0; }
.project-card img{ margin-top:12px; display:block; max-width:100%; border-radius:8px; }
```

Simple and robust: no media queries required for this assignment.

### 5.4 Theming (Dark/Light)

```css
:root[data-theme="light"]{ /* …light tokens… */ }
:root[data-theme="dark"]{  /* …dark tokens…  */ }
```

JS toggles `data-theme` on `<html>`, swapping tokens everywhere.

## 6) JavaScript Architecture

**File:** `js/script.js` (loaded with defer in `<head>`)

### 6.1 Smooth Scrolling

```javascript
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    history.pushState(null, '', id);
  });
});
```

Enhances UX without breaking when JS is disabled.

### 6.2 Theme Toggle with Persistence

```javascript
const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const KEY = 'theme';

function apply(theme){
  root.setAttribute('data-theme', theme);
  btn.setAttribute('aria-pressed', String(theme === 'dark'));
}

// Init: saved preference or system default
(function(){
  const saved = localStorage.getItem(KEY);
  if (saved === 'dark' || saved === 'light') apply(saved);
  else apply(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();

// Toggle and save
btn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  apply(next);
  localStorage.setItem(KEY, next);
});

// Optional: footer year autofill
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
```

**Why this approach:**
- Progressive enhancement: site works without JS; JS only adds behavior
- Accessibility: `aria-pressed` reflects the toggle's state
- User respect: uses system preference on first load; stores explicit user choice afterward

## 7) Accessibility Considerations

- **Headings:** single `<h1>`; `<h2>` for sections; `<h3>` for project titles. No nested headings
- **Forms:** label/for pairings; proper input types; required for validation
- **Images:** meaningful alt text ("Mars CPU project placeholder image", etc.)
- **Color contrast:** managed by tokens; dark mode uses high-contrast values
- **Motion:** smooth scroll respects `prefers-reduced-motion`
- **Landmarks:** clear header, main, section, and footer landmarks; nav has `aria-label="Primary"`

## 8) Responsiveness

- **Mobile-first:** base layout is a readable single column
- **Flex list** for projects avoids complex breakpoints

To expand later, you can switch Projects to a grid for wider screens:

```css
@media (min-width: 700px){
  .projects-list{ display:grid; grid-template-columns: 1fr 1fr; gap:16px; }
}
```

## 9) Performance Notes

- **Images:** keep placeholders small; add real screenshots at appropriate sizes. Consider width/height attributes to reduce layout shift
- **CSS/JS:** single small files; no frameworks. Browser caching will help on reload
- **No render-blocking:** JS uses defer

## 10) Known Limitations

- Contact form has no backend. Submissions are not sent anywhere
- No routing (single page). If you add subpages, move shared CSS/JS to layout templates or modules
- No build pipeline (no minification/bundling). Acceptable for this assignment's scope

## 11) How to Extend

**Add projects:** append another `<article class="project-card">…</article>` inside `.projects-list`.

**Switch layout density:** convert `.projects-list` to a responsive grid at larger breakpoints.

**Deploy:**
- **GitHub Pages:** push to main and enable Pages → "Deploy from branch" → / (root)
- **Netlify/Vercel:** drag-and-drop the folder or connect the Git repo

## 12) Testing Checklist

- [ ] Navigation links scroll to the correct sections
- [ ] Projects render as stacked cards on mobile and desktop
- [ ] Dark mode toggle switches instantly and persists after reload
- [ ] Form fields show browser validation for empty/bad input
- [ ] Images load (no 404s); alt text reads correctly in screen readers
- [ ] No horizontal scrolling at 320px width
- [ ] Lighthouse (optional): run a quick check for Accessibility and Best Practices

## 13) Changelog (summary for Assignment 1)

- Initial semantic HTML skeleton
- CSS tokens + base reset added
- Projects switched from Grid to single-column Flex for clarity
- Contact form labels/ids/required added; email type set
- Smooth scrolling and dark mode toggle implemented with persistence
- Documentation: README, AI Usage Report, and this Technical Documentation

---

**Maintainer:** Rayan Alamri  
**License/Use:** Academic (KFUPM Assignment 1)