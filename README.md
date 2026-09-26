# JSON Tool

A browser-only JSON formatter. The app itself is a single `index.html` at the repo root — no build step and no third-party dependencies.

## Features

- Format (beautify), minify and validate JSON
- Indent width 1–20; changing it re-runs the last action automatically
- Recursive key sorting, including objects nested inside arrays
- Line numbers, character counts and a floating copy button over the output
- Download the result as `formatted.json`, clear the editor, or load sample data
- Light/dark theme, remembered in `localStorage`
- `Ctrl/Cmd + Enter` formats the input

## Running locally

Open `index.html` in a browser — there is no backend, and the page keeps working offline. To serve it over HTTP instead:

```bash
python3 -m http.server 8000
```

## Privacy

Parsing happens entirely in the browser, so pasted JSON never leaves the machine. Google Analytics is loaded only after a visitor accepts the cookie banner; before that, no request reaches Google. The choice is stored in `localStorage` under `cookie-consent`, and any page can re-open the banner via the footer's Cookie Settings link.

## Deploying

The tool page is self-contained, and the published site is now `index.html`, the five extra English-only long-tail pages (`json-validator.html`, `json-minifier.html`, `sort-json-keys.html`, `pretty-print-json.html`, `json-syntax.html`) that share `tool-page.css`, the four informational pages (`about.html`, `privacy.html`, `terms.html`, `contact.html`) with their shared `page.css`, `page.js`, `consent.css` and `consent.js`, plus `robots.txt`, `sitemap.xml`, an IndexNow key file (`<32-hex-key>.txt`, used to notify Bing/Yandex/DuckDuckGo of new URLs) and `og-image.png`. Everything is served from the repo root as-is, so any static host works. The live domain is `json-tool.com`.

Those five extra pages target long-tail queries and exist in English only, so they carry no `hreflang` alternates and are absent from the locale directories; each one is a plain `<url>` entry at the end of `sitemap.xml`. If they are ever translated, convert their entries into grouped entries with alternates, the way the other pages are listed.

`og-image.html` is the design source for the social card, not a page: it is listed in `.vercelignore` so it never gets published. To regenerate the image after editing it:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1200,630 --screenshot=/tmp/og-2x.png "file://$PWD/og-image.html"
sips -z 630 1200 -s format png /tmp/og-2x.png --out og-image.png
```

Rendering at 2× and downsampling keeps the text crisp at the 1200×630 size crawlers expect.

## Languages

English is the source of truth and lives at the repo root. Eight locale directories hold translated copies of the same five pages — `/ko/`, `/ja/`, `/zh/` (Simplified Chinese), `/zh-hant/` (Traditional Chinese), `/ru/`, `/es/`, `/pt/` (pt-BR), `/fr/` — each containing `index.html`, `about.html`, `privacy.html`, `terms.html` and `contact.html`.

- Shared assets (`/page.css`, `/page.js`, `/consent.css`, `/consent.js`, `/og-image.png`, `robots.txt`) are served from the root; locale pages reference them with root-absolute paths and link between their own pages with relative paths.
- Every page declares `<link rel="alternate" hreflang="…">` for all nine locales plus `x-default` in its `<head>`, and `sitemap.xml` groups the locales of each page type into one `<url>` entry carrying the same alternates.

**Maintenance note:** the tool page's inline `<script>` is duplicated across all nine copies (only its user-facing string literals differ), so any change to the tool's logic must be applied to `index.html` and every locale's `index.html`. `consent.js`, `page.js` and `page.css` contain no user-facing text and are already shared.
