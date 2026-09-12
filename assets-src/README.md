# assets-src

Full-resolution image masters. **Nothing here is deployed** — this folder sits
outside `public/`, so Vite never copies it into `dist/`.

Each master has a WebP derivative in `public/` under the same relative path,
and that derivative is what the pages reference. The PNGs are kept only so the
art can be re-exported or re-encoded later without going back through git
history.

| Master | Served as |
| --- | --- |
| `images/hero.png` | `/images/hero.webp` |
| `images/hero-ph.png` | `/images/hero-ph.webp` |
| `images/footer 1.png` | `/images/footer 1.webp` |
| `images/footer-1-ph.png` | `/images/footer-1-ph.webp` |
| `blog/*.png` | `/blog/*.webp` |

One exception: `blog/Human-On-the-Loop,-Not-In-It.png` is served as
`/blog/human-on-the-loop-not-in-it.webp` — the derivative is lowercased and
hyphenated, not a case-for-case match.

## Re-encoding a master

`sharp` is already a devDependency. The `public/` WebPs above were produced at
quality 90:

```js
const sharp = require('sharp')
await sharp('assets-src/images/hero.png')
  .webp({ quality: 90, effort: 6 })
  .toFile('public/images/hero.webp')
```

`scripts/verify-build.sh` fails the build if any image in `public/` goes over
700 KB, so keep derivatives under that.
