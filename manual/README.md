# Tiny App Suite — Operations Manual (static site)

User-facing documentation. **No build step** — static HTML/CSS/JS.

## Live URLs (GitHub Pages)

| Site | URL |
|------|-----|
| **App** | https://gm298.github.io/tiny-app-suite-back-office/ |
| **Manual** | https://gm298.github.io/tiny-app-suite-back-office/manual/ |

The manual is deployed into the `manual/` subfolder of the same Pages repo as the Expo web app. Asset paths are relative, so no `<base>` tag is required.

## Local preview

```powershell
cd website-manual
npx --yes serve .
```

Open the URL shown (e.g. `http://localhost:3000`) — same layout as production, without the `/manual/` prefix in the path.

## Deploy

**With app** (rebuilds Expo + copies manual):

```powershell
npm run deploy:web:github-pages
```

**Manual only** (doc/screenshot updates, no app rebuild):

```powershell
npm run deploy:manual:github-pages
```

Requires a one-time clone of the Pages repo:

```powershell
git clone https://github.com/gm298/tiny-app-suite-back-office.git deploy-site
```

(`deploy-site/` is gitignored in this repo.)

## Screenshots

Drop PNG files into `images/` using filenames from `index.html` (e.g. `login-01.png`, `po-barcode.png`). Missing files show an automatic SVG placeholder.

## Theme (matches app dark UI)

| Token | Hex |
|-------|-----|
| Background | `#020617` |
| Surface | `#0f172a` |
| Accent | `#2563eb` |
