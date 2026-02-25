# Trenton Ringger — Developer Portfolio

Personal portfolio site built with React + Vite. Features an interactive WebGL hex shader background, embedded project videos, and a full project showcase.

**Live site:** [shrimppa.github.io/portfolio](https://shrimppa.github.io/portfolio) <!-- update with your actual URL -->

## Tech Stack

- **React** + **Vite** — component structure and dev server
- **WebGL / GLSL** — custom hex grid shader with mouse and click interaction
- **CSS-in-JS** — all styles scoped inline via template literal
- **gh-pages** — deployment target

## Running Locally

```bash
npm install
npm run dev
```

Site will be live at `http://localhost:5173` with hot reload.

## Deploying to GitHub Pages

Make sure `vite.config.js` has your repo name set as the base:

```js
export default {
  base: '/your-repo-name/',
}
```

Then build and deploy:

```bash
npm run build
npx gh-pages -d dist
```

## Project Structure

```
src/
  App.jsx        # entire portfolio — components, styles, and shader all in one file
public/
  ...
```

## Updating Content

All content is defined near the top of `App.jsx` in two arrays:

- **`FEATURED`** — the two hero video projects (Rocket Power, Star Wars RTS). Update `embedUrl` with your YouTube embed links.
- **`PROJECTS`** — the project cards grid below the featured section.

## Shader

The hero background is a raw WebGL fragment shader written in GLSL. It renders a hexagonal grid that reacts to:
- **Mouse movement** — proximity glow and trailing ripple
- **Clicks** — expanding wave ripples (up to 8 simultaneous)

No Three.js or canvas libraries — just a fullscreen `TRIANGLE_STRIP` quad and a hand-written fragment shader.