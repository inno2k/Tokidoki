# Tokidoki Tokyo Trip Site

This repository now includes a GitHub Pages-ready static site in `docs/`.

## GitHub Pages setup

1. Push this repository to GitHub.
2. Open repository `Settings`.
3. Open `Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Select your main branch and `/docs` folder.
6. Save and wait for GitHub Pages to publish.

## Site structure

- `docs/index.html`: Pages entry point
- `docs/assets/css/styles.css`: site styles
- `docs/assets/js/app.js`: renderer logic
- `docs/assets/data/tokyo-family-trip-2026.json`: trip content data
- `docs/.nojekyll`: disable Jekyll processing

## Update content

Most travel content now lives in:

- `docs/assets/data/tokyo-family-trip-2026.json`

That means future edits to itinerary, food, maps, or sources can usually be made without touching the HTML layout.
