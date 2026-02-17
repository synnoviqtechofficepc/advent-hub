# Adventure Hub – Vanilla HTML/CSS/JS Version

This folder contains a **plain HTML, CSS, and JavaScript** version of the Adventure Hub site. It has the same layout, styling, and behavior as the React app, but runs without React or a build step.

## How to run

1. **Copy images into `assets/`**  
   From the project root, copy the React app’s images into `vanilla/assets/` so paths like `assets/hero-mountain.jpg` work:

   - If you have `src/assets/`, copy its contents into `vanilla/assets/`.
   - Or after `npm run build`, copy the `dist/assets/` output into `vanilla/assets/`.

   Required image filenames (or equivalents):  
   `hero-mountain.jpg`, `hiking-group.jpg`, `kayaking.jpg`, `rock-climbing.jpg`, `camping-night.jpg`.

2. **Open the app**
   - **Option A:** Open `vanilla/index.html` in your browser (file protocol). Navigation uses hash routes (e.g. `#/about`, `#/events`).
   - **Option B:** Serve the folder with a local server, e.g.  
     `npx serve vanilla`  
     then visit the URL shown (e.g. `http://localhost:3000`).

## Rebuilding CSS

Styles are built from `vanilla/input.css` with Tailwind. From the **project root**:

```bash
npx tailwindcss -i vanilla/input.css -o vanilla/styles.css --minify
```

The main `tailwind.config.ts` already includes `./vanilla/**/*.html` and `./vanilla/**/*.js` in `content`, so utility classes used in the vanilla app are included in the build.

## Structure

- **index.html** – Single page: navbar, footer, and all route content (layout and full-page views).
- **styles.css** – Compiled Tailwind and custom design tokens/animations (from `input.css`).
- **app.js** – Hash routing, theme/RTL toggles, mobile nav, dropdowns, event/blog filters, tabs, accordions, and dynamic content for each route.
- **input.css** – Tailwind source and design system (CSS variables, keyframes, accordion/line-clamp utilities).
- **assets/** – Place images here so links like `assets/hero-mountain.jpg` resolve.

## Routes (hash-based)

- `#/` – Home
- `#/home-2` – Home alternate
- `#/about` – About
- `#/events` – Events list (search/filters)
- `#/events/1`, `#/events/2` – Event details
- `#/blog` – Blog list (search/categories)
- `#/blog/1` – Blog post
- `#/pricing` – Pricing + FAQ accordion
- `#/contact` – Contact form
- `#/dashboard` – Member dashboard (tabs)
- `#/login`, `#/register` – Auth pages
- `#/admin` – Admin dashboard
- `#/maintenance` – Maintenance
- `#/404-demo` – 404 demo  
  Any other hash shows the 404 view.

No backend or build step is required; opening `index.html` (with assets in place) is enough for the app to run.
