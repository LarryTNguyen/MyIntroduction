# CLAUDE.md — Larry Nguyen Personal Website Context

## Project Overview

This project is a personal portfolio website for Larry Nguyen. The current source page is a single-file HTML/CSS prototype with a warm notebook / scrapbook aesthetic. The visual language should feel hand-drawn, personal, and slightly imperfect rather than corporate or overly polished.

Primary goals:

- Present Larry Nguyen as an MS Software Engineering student with UC San Diego machine learning experience and a San Jose, CA location.
- Showcase featured technical projects in a sticky-note board format.
- Include a media/recently-consumed section for movie and album reviews.
- Provide obvious calls to action for viewing work, downloading a resume, contacting Larry, and visiting LinkedIn/GitHub.
- Preserve the notebook-paper metaphor: left binding, ruled paper background, stitches, handwritten fonts, margin notes, polaroid photo, sticky notes, highlight marks, and subtle rotation.

This context file is intended for future AI-assisted development sessions. Follow these rules whenever modifying, refactoring, or expanding the website.

## Dataset / Content Context

The site is not primarily a data-visualization project, but it has structured content that should be treated like a small local dataset.

### Profile Content

Current identity content:

- Name: Larry Nguyen
- Brand mark: `LN ✦`
- Tagline: `✦ MS Software Eng · UC San Diego ML · San Jose, CA`
- Hero heading: `Hi, I'm Larry Nguyen.`
- Placeholder hero bio currently uses lorem ipsum and should be replaced with a real personal summary.
- Photo area is a placeholder polaroid with a note to replace it with a smiling photo.
- Margin note currently reads: `draft · may 2026`.

### Navigation

Current nav items:

- about
- projects
- media
- blog
- say hello ✉

Future pages or sections should preserve these labels unless the site structure changes intentionally.

### Social Links

Current social destinations:

- LinkedIn: `https://linkedin.com/in/larrynguyen`
- GitHub: `https://github.com/larrynguyen`

When adding icons, keep them inline SVG or use a lightweight icon library. Preserve `aria-label` values.

### Featured Projects Dataset

Current project cards:

1. CitiBike Availability Predictor
   - Description: Reframes bike availability as a demand-forecasting problem using hourly flow data across NYC stations, enabling real-time capacity prediction.
   - Tech: Python, XGBoost, K-Means, Parquet
   - Color: yellow sticky note

2. CIFAR-10 Image Classifier
   - Description: Fine-tuned Xception with a three-phase pipeline and built a from-scratch ResNet with cosine LR decay, hitting 94.86% test accuracy.
   - Tech: TensorFlow, Xception, ResNet, AdamW
   - Color: green sticky note

3. Campus Marketplace
   - Description: Full-stack marketplace app for students to buy and sell locally, built with Agile sprint workflows and tested via Postman API suites.
   - Tech: React, Node.js, Postman, Agile
   - Color: blue sticky note

4. Spotify Genre Predictor
   - Description: ML pipeline that classifies songs into genres using audio feature embeddings from the Spotify API, with a lightweight Flask demo.
   - Tech: Python, sklearn, Flask, Spotify API
   - Color: pink sticky note

Project cards should maintain this schema:

```js
{
  number: '01',
  title: 'Project Title',
  description: 'One concise outcome-focused paragraph.',
  tech: ['Tool', 'Tool', 'Tool'],
  href: '#',
  color: 'yellow | green | blue | pink',
  rotation: '-1.2deg'
}
```

### Media / Recently Consumed Dataset

Current media entries:

1. Dune: Part Two
   - Type: latest movie review
   - Creator: Denis Villeneuve
   - Year: 2024
   - Rating: 4 / 5
   - Review: visually breathtaking and emotionally exhausting.
   - Color: purple sticky note

2. GNX
   - Type: latest album review
   - Creator: Kendrick Lamar
   - Year: 2024
   - Rating: 5 / 5
   - Review: surprise drop, raw, confident, high-impact.
   - Color: teal sticky note

Media cards should maintain this schema:

```js
{
  type: 'movie | album | book | game',
  typeLabel: '🎬 latest movie review',
  title: 'Media Title',
  creator: 'Creator Name',
  year: 2024,
  rating: 4,
  maxRating: 5,
  review: 'Short personal review.',
  href: '#',
  color: 'purple | teal'
}
```

## Preferred Libraries

### Current Prototype

The uploaded version is plain HTML, CSS, and vanilla JavaScript. For small edits, preserve the no-build, single-file approach unless explicitly asked to convert the project.

Preferred for prototype-only updates:

- HTML5
- CSS custom properties
- Vanilla JavaScript for small DOM effects
- Inline SVG for simple icons and decorative marks
- Google Fonts: `Kalam` and `Shadows Into Light Two`

### Future React / App Version

If converting to a modern frontend stack, prefer:

- React written in JSX, not TypeScript/TSX.
- Vite for local development.
- CSS Modules, plain CSS, or Tailwind only if the project is already using it.
- Data arrays for projects/media rather than duplicated card markup.
- `lucide-react` for icons only when inline SVG becomes too repetitive.
- Framer Motion only for subtle entrance or hover animations; do not over-animate.

Avoid introducing heavy frameworks, complex state managers, or charting libraries unless the feature requires them.

## Coding Conventions

### HTML

- Use semantic landmarks where possible: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Keep links as `<a>` elements when they navigate; use `<button>` only for actions.
- Add meaningful `aria-label` values for icon-only links.
- Avoid empty `href="#"` in production. Replace with real routes or IDs.
- Preserve text hierarchy: one primary `h1`, section headings after that.

### CSS

- Centralize theme values in `:root` custom properties.
- Reuse existing variables before adding new hex values.
- Keep the existing handcrafted style: slight rotations, imperfect borders, layered pseudo-elements, and soft shadows.
- Prefer utility-like component classes such as `.sticky-proj`, `.sticky-pill`, `.btn-resume` over inline styles.
- Move repeated inline transforms into data-driven classes if refactoring.
- Do not remove the lined-paper background unless changing the whole visual direction.

### JavaScript

- Keep vanilla JS minimal and progressive.
- Current JS generates binding stitches dynamically. Preserve this behavior or replace it with a declarative component if converting to React.
- Do not add dependencies for effects that can be handled with CSS.
- If using React, map over `projects` and `mediaItems` arrays rather than hardcoding repeated cards.

### File Naming

Use descriptive names:

- `index.html` for the single-page prototype
- `CLAUDE.md` or `PROJECT_CONTEXT.md` for persistent AI context
- `projects.js` / `media.js` for content data
- `NotebookLayout.jsx`, `ProjectStickyNote.jsx`, `MediaStickyNote.jsx` for React components

Avoid generic names like `new.html`, `test.js`, `style2.css`, or `component.jsx`.

## Style Guidelines

### Visual Theme

The site should feel like a page from a personal engineering notebook:

- Warm off-white paper background
- Subtle lined-paper ruling
- Left-side notebook binding with stitches
- Handwritten typography
- Sticky-note project cards
- Polaroid photo treatment
- Scribbled underline accent
- Soft shadows and imperfect rotations
- Small margin annotations
- Highlight-marker emphasis

### Typography

Current fonts:

- Body and most UI text: `Kalam`, cursive
- Brand, hero heading, section labels, card titles: `Shadows Into Light Two`, cursive

Current sizing patterns:

- Brand: 30px
- Nav links: 18px
- Hero heading: 64px
- Body text: 16px with 36px notebook line-height
- Section labels: 26px
- Project titles: 18px
- Media titles: 20px
- Pills: 11px

When scaling responsively, preserve the hierarchy rather than exact pixel values.

### Color Palette

Use these CSS variables as the canonical palette:

```css
:root {
  --line-h: 36px;
  --ink-dark: #2a1a0e;
  --ink-mid: #5c4433;
  --ink-light: #8a7060;
  --amber: #c17f4a;
  --paper: #fffdf5;
  --line-color: #d4c8b8;
}
```

Additional theme colors already present:

```css
--page-bg: #e8e0d4;
--binding-bg: #c8b89a;
--binding-line: #b0a088;
--stitch: #a09070;
--warm-shadow: #8a6040;
--tag-bg: #fff3c4;
--tag-border: #e0c96a;
--tag-shadow: #d4b850;

--sticky-yellow: #fff9c4;
--sticky-yellow-top: #f0d000;
--sticky-green: #d4f0d4;
--sticky-green-top: #6aba6a;
--sticky-blue: #cfe8f8;
--sticky-blue-top: #5aaad8;
--sticky-pink: #f8d4e8;
--sticky-pink-top: #d870a8;
--sticky-purple: #ede0f8;
--sticky-purple-top: #9b50d8;
--sticky-teal: #d0f0ec;
--sticky-teal-top: #3abcaa;
```

Do not replace the palette with cool grays, neon gradients, glassmorphism, or generic SaaS styling.

### Layout Standards

- Overall layout: `.outer` flex container with fixed notebook binding and flexible page content.
- Main content padding: `0 56px` on desktop; reduce on smaller screens.
- Nav height: 72px.
- Hero desktop layout: two-column grid, text plus photo column.
- Project board: flex wrap with small gaps and varied rotations.
- Media board: two-column flex layout on desktop; stack on mobile.
- Keep elements aligned to the 36px line rhythm where reasonable.

### Interaction Standards

- Nav links should use a warm amber underline animation.
- Buttons should look hand-drawn with pseudo-element borders.
- Primary CTA should use dark ink fill with warm offset shadow.
- Hover states should increase clarity but not feel flashy.
- Preserve keyboard focus visibility when adding or changing interactive elements.

## Visualization Standards

Although this site is not currently chart-heavy, future visualizations should match the notebook aesthetic.

### Chart / Graphic Style

- Use the existing warm palette and sticky-note accent colors.
- Prefer hand-annotated visual treatments, subtle paper texture, and clear labels.
- Use dark ink for primary text and amber for emphasis.
- Avoid default chart colors unless intentionally overridden.
- Avoid glossy, corporate, or high-saturation chart themes.

### Data Integrity

For any project metrics, ML scores, or media ratings:

- Show enough context for the number to be meaningful.
- Do not invent missing results, links, model metrics, or project outcomes.
- If content is placeholder, label it as placeholder or leave a TODO.
- Preserve specific existing metrics, such as CIFAR-10 test accuracy of 94.86%, unless updated with a verified source.

### Responsive Visualization Rules

- Cards and visual modules must remain readable on mobile.
- Avoid fixed widths that cause horizontal scroll.
- Sticky notes may stack vertically on small screens.
- Decorative elements may be simplified on mobile, but should not obscure content.

## Accessibility Standards

- Maintain readable contrast between text and sticky-note backgrounds.
- Use semantic buttons and links correctly.
- Include accessible names for icon-only controls.
- Do not rely on rotation, color, or icons alone to communicate meaning.
- Ensure focus states are visible.
- Keep body copy readable despite the handwritten font.
- Respect `prefers-reduced-motion` for any added animations.

## Performance Standards

- Keep the page lightweight.
- Avoid large animation libraries for simple hover effects.
- Optimize the eventual profile photo before adding it.
- Use `font-display: swap` if self-hosting fonts later.
- Avoid loading unused icon packs or UI frameworks.
- Inline SVG is acceptable for small decorative icons.

## Quality Checklist

Before finishing any implementation, verify:

- The notebook/scrapbook visual identity is preserved.
- CSS variables are used for repeated colors and spacing.
- The hero, projects, media, and navigation content still render correctly.
- All project cards include title, description, tech tags, and link.
- All media cards include type label, title, creator/year, rating, review, and link text.
- Placeholder text is clearly marked or replaced.
- Links are real or intentionally marked as TODO.
- Buttons and links are keyboard accessible.
- Mobile layout does not overflow horizontally.
- Decorative rotations do not harm readability.
- Social links include accessible labels.
- No unnecessary dependencies were added.
- Any future React code uses JSX, not TSX.
- Code is easy to edit in future sessions.

## Suggested Refactor Roadmap

When improving this prototype, prioritize in this order:

1. Replace lorem ipsum hero text with a polished personal summary.
2. Replace placeholder photo with an optimized real image.
3. Add real project links and resume link.
4. Convert repeated project/media cards into reusable data-driven components.
5. Add responsive breakpoints for tablet and mobile.
6. Add dedicated About, Projects, Media, and Blog sections or pages.
7. Add subtle animations only after content and layout are stable.

## AI Assistant Working Rules

When asked to modify this project:

- Read this context before editing.
- Preserve the existing aesthetic unless the user explicitly requests a redesign.
- Make targeted changes rather than rewriting the whole file unnecessarily.
- Use the current HTML/CSS as source of truth for theme and content.
- Ask before introducing a build system, router, database, CMS, or backend.
- Prefer simple, maintainable solutions.
- When uncertain, choose the option that best preserves the warm handwritten notebook feel.

## Implementation Log - 2026-06-01

### Features worked on

- Converted the original single-file notebook prototype into a React/Vite app using JSX.
- Added BrowserRouter routes for `/`, `/projects`, `/media`, `/contact`, and hidden `/admin`.
- Removed the blog navigation item and changed the CTA language to `contact me`.
- Added Larry's uploaded resume at `public/assets/Nguyen_Larry_Resume.pdf` and optimized the uploaded profile photo to `public/assets/larry-photo.jpg`.
- Replaced placeholder hero copy with Larry's supplied bio, lightly corrected for grammar.
- Added canonical LinkedIn and GitHub links from the requirements document.
- Built a responsive notebook layout with binding, ruled-paper background, sticky notes, polaroid photo treatment, handwritten fonts, and wider adaptive grids for large screens.
- Added featured project cards on the home page and wide sticky-note project cards on the projects page.
- Added blank sticky-note placeholders for movie and album reviews.
- Added a media page with independent movie and album column structure for future scrollable review lists.
- Added a contact page using a `mailto:` link.
- Added a hidden `/admin` placeholder page for the future Supabase Google-login CRUD workflow.
- Added GitHub Pages SPA fallback through `public/404.html` and set Vite base path to `/MyIntroduction/`.
- Added a GitHub Actions Pages deployment workflow.

### Content decisions

- Supabase is the planned backend for the next pass, but this implementation does not connect to Supabase yet.
- Admin email for the next pass: `larrynguyen4567@gmail.com`.
- Login method for the next pass: Google login through Supabase Auth.
- The resume remains unchanged, including existing contact details and GitHub spelling.
- Media entries start empty rather than using sample Dune/GNX content.
- Project descriptions are intentionally plain and editable in `src/data/projects.js`.

### Unresolved issues / next pass

- Run `npm install` locally before building, because dependencies were not installed in this environment.
- Add a package lock after the first local install so GitHub Actions can use `npm ci` if desired.
- Wire Supabase Auth, row-level security, tables, storage, and admin CRUD.
- Add project and media image upload support through Supabase Storage rather than storing image binaries in table rows.
- Replace or refine any project descriptions after Larry reviews the generated wording.
- Add live demo URLs for any additional projects once available.
