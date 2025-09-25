# AI Usage Report

**Course / Assignment:** Assignment 1 – Foundation & AI Integration  
**Student:** Rayan Alamri 202247900
**Repo:** https://github.com/Rayan-Alamri/assignment-1 
**Date:** 25/09/2025

---

## 1) Tools Used & Concrete Use Cases
**Primary tools**
- **ChatGPT (this session)**
  - Clarified requirements (tagline/one-liner, placeholder images, form expectations).
  - Reviewed **HTML semantics** (landmarks, heading hierarchy, ids vs classes).
  - Co-designed **layout** and switched Projects from Grid to **single-column Flexbox**.
  - Wrote and explained **CSS tokens** (variables for colors/spacing) + base reset.
  - Added **JS features**: smooth in-page scrolling (respects reduced motion), dark-mode toggle with `localStorage` persistence, `aria-pressed` state.
  - Accessibility guidance (labels/ids pairing, alt text, `aria-label` for nav).
- **VS Code + Live Server**
  - Hot reload for fast testing; mobile previews on LAN.
- **Browser DevTools (Chrome)**
  - **Responsive mode** to test 320–1000px.
  - **Network** panel to diagnose missing placeholder image paths.
  - **Elements/Computed** to confirm Flex overrides and color variables.
- **Image placeholder (local JPG/SVG)**
  - Temporary project imagery to stabilize layout and test responsiveness.

---

## 2) Benefits & Challenges

### Benefits
- **Speed & quality:** Faster iteration with immediate feedback on semantics and layout; fewer layout bugs thanks to `box-sizing: border-box` and a clean tokens system.
- **Accessibility by default:** Explicit labels/ids, alt text, nav `aria-label`, and dark-mode contrast handled by CSS variables.
- **Clear structure:** Headings mapped to a proper outline (`h1` → `h2` sections → `h3` project titles).

### Challenges
- **Nesting headings** at first (e.g., `<h3>` inside `<h2>`).  
  *Fix:* Converted section text to `<p>` and kept headings as labels only.
- **Path/filename issues** for placeholders (case sensitivity).  
  *Fix:* Standardized names `assets/images/...` and verified 200/404 in DevTools Network.
- **Conflicting styles** (old Grid vs new Flex).  
  *Fix:* Removed obsolete `.projects-grid` rules or overrode them; confirmed final `display:flex` in Computed styles.

---

## 3) Understanding: Rationale for Decisions
- **Why Flex over Grid for Projects:** With two cards and a mobile-first design, a **single-column Flex** is simpler and aligns with readability.
- **Why CSS variables:** Centralized tokens (`--bg`, `--text`, spacing) enable instant theming (light/dark) and consistent spacing.
- **Why heading hierarchy matters:** Headings are **document labels**, not containers. Proper `h1/h2/h3` improves screen-reader navigation and SEO.
- **Why `required` and input types:** HTML5 built-in validation (`type="email"`, `required`) gives accessibility and UX benefits with no JS or backend.
- **Why `aria-pressed` on the toggle:** Conveys the on/off state to assistive tech; pairs with `localStorage` to persist user choice.
- **Why smooth scroll with reduced motion check:** Delivers smooth UX while respecting `prefers-reduced-motion`.

---

## 4) How I Modified AI Suggestions Responsibly
- **Renamed classes** to match my structure (`.projects-list`, `.project-card`) and **deleted** unused grid CSS to avoid conflicts.  
- **Validated every change** in DevTools (Computed styles, responsive widths, 404 checks).  
- **Authored my own copy** (About + project blurbs) and rewrote code comments in my words.  
- **Ensured accessibility**: real labels tied to inputs, clear alt text, sensible color contrast.  
- **Scoped features to the rubric** (3 sections, responsiveness, at least one JS interaction, clean docs).

---

## 5) Innovation & Creativity
- **Tokenized design system** (colors/spacing/radius) with **theme switching** via `data-theme`.
- **Ethical & accessible dark mode**: honors system preference on first load, then lets the user override with memory.
- **Robust smooth scroll**: includes a **reduced-motion** fallback.
- **Card wrapper pattern**: One visual container for title + description + image avoids “double bubble” UI.

---

## 6) Learning Outcomes
- Build a **semantic HTML skeleton** that screen readers can navigate.
- Use **CSS variables** + a small reset to make layouts predictable and themeable.
- Implement **Flexbox** for simple, robust single-column layouts.
- Add **progressive enhancement** with JS: smooth scroll and persisted theme.
- Debug with **DevTools** to verify behavior rather than guessing.

---

