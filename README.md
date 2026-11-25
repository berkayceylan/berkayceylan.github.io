# berkayceylan.github.io

Personal site of Berkay Ceylan. Next.js, exported as static HTML and deployed to GitHub Pages by GitHub Actions.

## Editing

All text lives in `content/`:

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, lead, bio, links, site title and description |
| `projects.ts` | Projects. Add a `page` to give a project its own URL |
| `publications.ts` | Publications |
| `cv.ts` | Experience, education and skills |

The portrait is in `public/images/` (`berkay-ceylan*.{webp,jpg}`).

## Running

```bash
npm install
npm run dev
```

`npm run build` writes the site to `out/`; `npm run preview` serves it. Pushing to `main` deploys it.

## Files that are not part of the app

`public/others/` (app privacy policies, flipbooks, `books.json`) and `public/15_puzzle/` were hosted on the previous
site and keep their URLs, because apps and store listings may link to them. `public/flutter_service_worker.js` removes
the service worker that the previous Flutter site left in visitors' browsers.
