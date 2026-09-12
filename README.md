# JSON Tool

A browser-only JSON formatter. The whole app is the single `index.html` at the repo root — no build step and no third-party dependencies.

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

Parsing happens entirely in the browser, so pasted JSON never leaves the machine. Google Analytics is loaded on the page; delete the gtag snippet in the `<head>` of `index.html` for a fully untracked build.

## Deploying

The deliverable is one static file, so any static host works. The live domain is `json-tool.com`.
