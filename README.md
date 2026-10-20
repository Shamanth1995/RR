# Coorg River Rest website

A single-page hotel site built with plain HTML, CSS and JavaScript, plus
**Vue 3** and **Tailwind CSS** loaded from CDNs. There is no build step and
nothing to install.

## Run it

- Double-click `index.html`, or
- serve the folder: `python3 -m http.server 8000`, then open http://localhost:8000

To publish, upload the whole folder to any static host (Netlify, Vercel,
GitHub Pages, cPanel, S3, …).

## Files

```
index.html        page markup (also the Vue template)
css/styles.css    colours, type, components, animations
js/data.js        ALL editable content: contact details, rooms, services,
                  nearby places, gallery
js/art.js         generates the coffee-branch vines and card illustrations
js/app.js         Vue app: rooms carousel, enquiry form, gallery lightbox,
                  menus, scroll effects
images/           photos (full size) and images/thumbs/ (small versions)
```

## Things to fill in (js/data.js)

1. **Contact details** in `window.CONFIG`: `whatsapp` (digits with country code,
   e.g. `919876543210`), `phone`, `email`, `address`, `mapsUrl`, `instagram`.
   - With `whatsapp` set, the enquiry form gets a **Send on WhatsApp** button
     that opens a pre-filled message with the guest's dates, guests and room.
   - With `email` set, it gets **Send by email**.
   - With neither, guests can only copy their enquiry text.
2. **Room names and descriptions** in `window.ROOMS`. They are written from
   the photos, so check that the names, bed types and features match.
3. **Distances** for nearby places: set `distance: '45 min drive'` on any entry
   in `window.PLACES` and it shows as a tag on that card.

## Swapping photos

Replace a file in `images/` (and its copy in `images/thumbs/`) keeping the
same name, or add new entries to `window.GALLERY` / `window.ROOMS`.
Around 1600 px on the long side is plenty for full-size images, and 720 px
for thumbs.

## Colours

Edit the tokens at the top of `css/styles.css` (`--ground`, `--ink`,
`--laterite` …). Tailwind classes such as `text-laterite` and `bg-surface`
read the same tokens.
