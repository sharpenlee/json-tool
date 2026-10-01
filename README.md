# JSON Tool

A browser-only JSON toolkit: [json-tool.com](https://json-tool.com/). The app is plain HTML, CSS and JavaScript with no build step, no bundler and no third-party dependencies — every file in this repo is what gets served.

Licensed under MIT; see [LICENSE](LICENSE).

## Features

- Format (beautify), minify and validate JSON
- Indent width 1–20; changing it re-runs the last action automatically
- Recursive key sorting, including objects nested inside arrays
- Line numbers, character counts and a floating copy button over the output
- Download the result as `formatted.json`, clear the editor, or load sample data
- Light/dark theme, remembered in `localStorage`
- `Ctrl/Cmd + Enter` formats the input

## Repository structure

Fifty-three published pages, all at fixed paths, plus the shared assets they reference:

| Path | What it is |
| --- | --- |
| `index.html` | The formatter — the tool itself, in English |
| `json-validator.html`, `json-minifier.html`, `sort-json-keys.html`, `pretty-print-json.html`, `json-syntax.html` | English-only long-tail pages; the tool pages share `tool-page.css` |
| `blog/index.html` and `blog/*.html` | English-only articles on the parser errors people search for; they reach `/page.css` and `/page.js` with root-absolute paths |
| `about.html`, `privacy.html`, `terms.html`, `contact.html` | Informational and legal pages |
| `es/ fr/ ja/ ko/ pt/ ru/ zh/ zh-hant/` | Eight locales, each a translated copy of those five page types |
| `page.css`, `page.js`, `tool-page.css`, `consent.css`, `consent.js` | Shared styles and behaviour — the only non-page code in the repo |
| `sitemap.xml`, `robots.txt`, `<32-hex>.txt` | Crawl files; the hex file is the IndexNow key, which the protocol requires to sit at the site root |
| `og-image.html`, `og-image.png`, `favicon.svg`, `favicon.ico` | Social card and icons. `og-image.html` is the design source for the PNG and is listed in `.vercelignore`, so it is never published |

## Running locally

Open `index.html` in a browser — there is no backend, and the page keeps working offline. To serve it over HTTP instead:

```bash
python3 -m http.server 8000
```

## Privacy

Parsing happens entirely in the browser, so pasted JSON never leaves the machine. Google Analytics is loaded only after a visitor accepts the cookie banner; before that, no request reaches Google. The choice is stored in `localStorage` under `cookie-consent`, and any page can re-open the banner via the footer's Cookie Settings link.

## Deploying

The tool page is self-contained, and the published site is now `index.html`, the five extra English-only long-tail pages (`json-validator.html`, `json-minifier.html`, `sort-json-keys.html`, `pretty-print-json.html`, `json-syntax.html`) that share `tool-page.css`, the four informational pages (`about.html`, `privacy.html`, `terms.html`, `contact.html`) with their shared `page.css`, `page.js`, `consent.css` and `consent.js`, the English-only `blog/` directory (an index and the guides beneath it) that reaches the same shared assets through root-absolute paths, plus `robots.txt`, `sitemap.xml`, an IndexNow key file (`<32-hex-key>.txt`, used to notify Bing/Yandex/DuckDuckGo of new URLs) and `og-image.png`. Everything is served from the repo root as-is, so any static host works. The live domain is `json-tool.com`.

Those five extra pages target long-tail queries and exist in English only, so they carry no `hreflang` alternates and are absent from the locale directories; each one is a plain `<url>` entry at the end of `sitemap.xml`. The `blog/` pages follow the same convention — English only, no alternates, one plain `<url>` entry each. Blog code samples must sit directly inside `<main>`: the shared `main > pre` rule is scoped that way so it cannot override the tool pages' own `.result pre` styling. If any of these pages is ever translated, convert its entry into a grouped entry with alternates, the way the other pages are listed.

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

## Contributing

Issues and pull requests are welcome, especially for incorrect behaviour in the parser or validator, awkward translations, and accessibility problems. Please open an issue before a large change so the effort is not wasted.

Two boundaries are deliberate, and both are stated on the [about page](https://json-tool.com/about.html): the tool does not send anything anywhere, so there is no account, no history and no server-side storage; and it does not offer a diff view. A diff would be a different product with different guarantees, and the site is better off being one thing done well. Proposals that would cross either line are unlikely to be merged — that is a positioning decision, not an oversight.
