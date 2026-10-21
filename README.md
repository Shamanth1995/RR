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

## Contact details and enquiries (js/data.js)

- `window.CONFIG.phones` holds the two numbers. Each has `display` (how it is
  shown) and `number` (digits with the 91 country code, used for WhatsApp and
  calls).
- **Enquiries go to WhatsApp.** The form builds a message with the guest's
  name, dates, number of guests, room and notes. Guests pick which number to
  send it to (the first is the default).
  - On a phone: **Send on WhatsApp** opens the WhatsApp app.
  - On a laptop or desktop: **Send via WhatsApp Web** opens web.whatsapp.com,
    and **Open WhatsApp app** hands over to the desktop app.
- `lat` / `lng` place the map pin and the "Get directions" link; `mapsUrl` is
  the "Open in Google Maps" link; `address` is the text shown under the logo.
- Room names and descriptions are in `window.ROOMS` (written from the photos,
  so check them), and the dormitory text is in `window.DORM`.
- Set `distance: '45 min drive'` on any entry in `window.PLACES` to show it as
  a tag on that nearby place.

## Logo

`images/logo.png` (512 px), `logo-192.png` and `logo-64.png` (favicon) were
cleaned up from the photo you sent. If you have the original logo file, drop
it in with the same names for a sharper result.

## Swapping photos

Replace a file in `images/` (and its copy in `images/thumbs/`) keeping the
same name, or add new entries to `window.GALLERY` / `window.ROOMS`.
Around 1600 px on the long side is plenty for full-size images, and 720 px
for thumbs.

## Colours

Edit the tokens at the top of `css/styles.css` (`--ground`, `--ink`,
`--laterite` …). Tailwind classes such as `text-laterite` and `bg-surface`
read the same tokens.
