# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Polish-language PWA (Progressive Web App) called **"Kalkulator czasu pracy kierowcy"** (Driver's Work Time Calculator). It lets users accumulate driving work time by entering hours and minutes, displaying a running total and entry history.

## Development

No build step, no package manager, no framework. Serve files with any static HTTP server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080`. The PWA service worker only activates over HTTPS or localhost.

There are no tests, no linter, and no CI configured.

## Architecture

The entire app is four files:

- **`index.html`** — all CSS lives here inline in `<style>`. Renders the single input form and history list. Calls `addTime()` via `onclick`.
- **`app.js`** — holds global state (`totalMinutes`), the single `addTime()` function that updates it and re-renders the DOM, and the service worker registration.
- **`service-worker.js`** — cache-first strategy; caches all four assets on install (`/`, `index.html`, `app.js`, `manifest.json`, `icon.png`). Uses cache name `czas-pracy-cache`.
- **`manifest.json`** — PWA manifest; both icon sizes point to the same `icon.png` file.

State is in-memory only — all accumulated time resets on page reload.

## Key Conventions

- UI labels, headings, and user-facing strings are in **Polish**.
- CSS is kept inline in `index.html`, not in a separate stylesheet.
- JavaScript is vanilla ES6, no modules (`app.js` runs as a classic script with `defer`).
- When updating the service worker cache (e.g. adding a new asset), add the path to the `cache.addAll([...])` array in `service-worker.js` and bump the cache name version if breaking changes are made, so old caches are invalidated.
