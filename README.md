# A Room Full of Patience

*Seven years of it, and counting.*

The particulars of one long-awaited bedroom suite (J.V. Mansion): every size, material, drawing and decision on one site, so anyone can read exactly what is wanted.

## How it is built
- **`js/data.js`**: every word on the site. Edit this file to change content, mark items `brief` / `open` / `final`, add versions, questions and log entries.
- **`js/cad.js`**: the drawing engine: CAD / Colour / Dark / Blueprint looks, Off / MM / FT·IN, plan layers, true-size DXF, SVG and A3/A4 print.
- **`js/drawings.js`**: the sheets (suite plan, room elevations, bed wall, desk Rev 21, dressing).
- **`js/room3d.js`**: the drag-around 3D room, built from the same drawings.
- **`js/app.js`**, **`css/style.css`**, **`index.html`**: the pages.

## Adding Blender work
Put files in `assets/media/`, then in `data.js`:
- whole-suite film: `media: { film: "assets/media/walkthrough.mp4" }`
- per piece: add `media: { renders: ["assets/media/bed-1.jpg"], film: "…mp4", model: "assets/media/bed.glb" }` to that item. A `.glb` turns in the page automatically.

## Publishing on GitHub Pages
Repository → Settings → Pages → Source: *Deploy from a branch* → `main` / root. The site is then at `https://<username>.github.io/<repository>/`.
