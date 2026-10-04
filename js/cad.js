// CAD kit. Views draw in real feet; every primitive is also captured as geometry so a sheet can be
// exported as a true-size DXF (millimetres). Sheets carry their own looks (CAD / Colour / Dark / Blueprint),
// a units switch (off / mm / ft-in), plan layers, and SVG / DXF / A3 / A4 / full-screen output.
window.CAD = (function () {
  const MM = 304.8;
  let UNITS = "ftin";
  let uid = 0;

  function fmt(ft) {
    if (UNITS === "mm") return String(Math.round(Math.abs(ft) * MM));
    const inch = Math.round(Math.abs(ft) * 24) / 2;
    const f = Math.floor(inch / 12), i = +(inch - f * 12).toFixed(1);
    const istr = i % 1 ? Math.floor(i) + "½" : String(i);
    return f ? `${f}'${istr}"` : `${istr}"`;
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const n1 = (v) => +(+v).toFixed(1);

  // ── shape helpers (feet) ──
  function arc(cx, cy, r, a0, a1, n) { const o = []; n = n || 10; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; o.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return o; }
  function rrect(x1, y1, x2, y2, r, n) {
    r = Math.min(r, (x2 - x1) / 2, (y2 - y1) / 2); if (r <= 0) return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
    const H = Math.PI / 2; n = n || 6;
    return [...arc(x2 - r, y1 + r, r, -H, 0, n), ...arc(x2 - r, y2 - r, r, 0, H, n), ...arc(x1 + r, y2 - r, r, H, 2 * H, n), ...arc(x1 + r, y1 + r, r, 2 * H, 3 * H, n)];
  }

  // ── layers for DXF, from the drawing class ──
  const LAYER = (cls) => /cut/.test(cls) ? "CUT" : /dim/.test(cls) ? "DIMENSIONS" : /hid/.test(cls) ? "HIDDEN" : /thin|grain/.test(cls) ? "DETAIL" : /led|cove|light/.test(cls) ? "LIGHTING" : /t-/.test(cls) ? "TEXT" : "OUTLINE";

  // ── the builder ──
  function Builder(mode, opts) {
    opts = opts || {};
    const id = "cv" + (++uid);
    const o = [], d = [], views = [];
    let cur = null;
    const B = { id, mode, o, d, views, ly: null, f: fmt, opts };
    const lyc = () => (B.ly ? ` ly-${B.ly}` : "");
    const cap = (item) => { if (cur) cur.items.push(item); };
    B.view = (name, ox, oy, s) => { cur = { name, items: [] }; views.push(cur); return { X: (v) => n1(ox + v * s), Y: (h) => n1(oy - h * s), s, ox, oy, name }; };
    B.endView = () => { cur = null; };
    const fillOf = (kind) => kind ? ` style="fill:url(#${id}-${kind})"` : "";
    // render look only: light glows, soft shadows and washes (never captured for DXF)
    const R = mode === "render";
    const glow = (shape, cls) => { if (R && /sh-(led|cove)/.test(cls)) o.push(shape.replace(/class="[^"]*"/, `class="fx-glow${/cove/.test(cls) ? " fx-cove" : ""}${lyc()}" filter="url(#${id}-glow)"`)); };
    const box = (V, x1, z1, x2, z2) => `x="${V.X(Math.min(x1, x2))}" y="${V.Y(Math.max(z1, z2))}" width="${n1(Math.abs(x2 - x1) * V.s)}" height="${n1(Math.abs(z2 - z1) * V.s)}"`;
    B.fx = (s) => { if (R) o.push(s); };
    B.shadow = (V, x1, z1, x2, z2, op, big) => B.fx(`<rect ${box(V, x1, z1, x2, z2)} rx="${n1(0.12 * V.s)}" fill="#1c120b" opacity="${op || 0.35}" filter="url(#${id}-${big ? "softL" : "soft"})"/>`);
    B.paint = (V, x1, z1, x2, z2, ref, op) => B.fx(`<rect ${box(V, x1, z1, x2, z2)} fill="url(#${id}-${ref})"${op ? ` opacity="${op}"` : ""}/>`);
    B.tex = (V, x1, z1, x2, z2, f, op) => B.fx(`<rect ${box(V, x1, z1, x2, z2)} filter="url(#${id}-${f})"${op ? ` opacity="${op}"` : ""}/>`);
    B.ambient = (V, x1, z1, x2, z2) => { B.paint(V, x1, z1, x2, z2, "amb"); B.paint(V, x1, z1, x2, z2, "vig"); };
    // primitives: cls may be "sh-line" etc.; fill is a pattern kind: cut | ven | lime | marb | bou | flr
    B.line = (V, x1, y1, x2, y2, cls, toDims) => { if (!toDims) glow(`<line x1="${V.X(x1)}" y1="${V.Y(y1)}" x2="${V.X(x2)}" y2="${V.Y(y2)}" class=""/>`, cls); (toDims ? d : o).push(`<line x1="${V.X(x1)}" y1="${V.Y(y1)}" x2="${V.X(x2)}" y2="${V.Y(y2)}" class="${cls}${lyc()}"/>`); cap({ k: "L", p: [[x1, y1], [x2, y2]], L: LAYER(cls) }); };
    B.poly = (V, pts, cls, closed, fill) => {
      const s = pts.map((p) => V.X(p[0]) + "," + V.Y(p[1])).join(" ");
      glow(`<polyline points="${s}" class=""/>`, cls);
      o.push(closed ? `<polygon points="${s}" class="${cls}${lyc()}"${fillOf(fill)}/>` : `<polyline points="${s}" class="${cls}${lyc()}"/>`);
      cap({ k: "P", p: pts, c: !!closed, L: LAYER(fill === "cut" ? "cut" : cls) });
    };
    B.rect = (V, x1, y1, x2, y2, cls, fill, rx) => {
      const a = Math.min(x1, x2), b = Math.min(y1, y2), c = Math.max(x1, x2), e = Math.max(y1, y2);
      glow(`<rect x="${V.X(a)}" y="${V.Y(e)}" width="${n1((c - a) * V.s)}" height="${n1((e - b) * V.s)}" class=""/>`, cls);
      o.push(`<rect x="${V.X(a)}" y="${V.Y(e)}" width="${n1((c - a) * V.s)}" height="${n1((e - b) * V.s)}"${rx ? ` rx="${n1(rx * V.s)}"` : ""} class="${cls}${lyc()}"${fillOf(fill)}/>`);
      cap({ k: "P", p: rrect(a, b, c, e, rx || 0), c: true, L: LAYER(fill === "cut" ? "cut" : cls) });
    };
    B.stadium = (V, x1, y1, x2, y2, cls, fill) => B.rect(V, x1, y1, x2, y2, cls, fill, Math.min(x2 - x1, y2 - y1) / 2);
    B.circle = (V, x, y, r, cls, fill) => { o.push(`<circle cx="${V.X(x)}" cy="${V.Y(y)}" r="${n1(r * V.s)}" class="${cls}${lyc()}"${fillOf(fill)}/>`); cap({ k: "C", p: [[x, y]], r, L: LAYER(cls) }); };
    B.ellipse = (V, x, y, rx, ry, cls, fill) => { o.push(`<ellipse cx="${V.X(x)}" cy="${V.Y(y)}" rx="${n1(rx * V.s)}" ry="${n1(ry * V.s)}" class="${cls}${lyc()}"${fillOf(fill)}/>`); cap({ k: "P", p: arc(0, 0, 1, 0, 2 * Math.PI, 24).map(([a, b]) => [x + a * rx, y + b * ry]), c: true, L: LAYER(cls) }); };
    B.text = (V, x, y, s, cls, anchor, rot) => { o.push(`<text x="${V.X(x)}" y="${V.Y(y)}" class="${cls || "t-lbl"}${lyc()}" text-anchor="${anchor || "middle"}"${rot ? ` transform="rotate(${rot} ${V.X(x)} ${V.Y(y)})"` : ""}>${esc(s)}</text>`); cap({ k: "T", p: [[x, y]], s: String(s), rot: rot || 0, a: anchor || "middle", L: "TEXT" }); };
    B.key = (V, x, y, code) => { o.push(`<g class="key${lyc()}"><circle cx="${V.X(x)}" cy="${V.Y(y)}" r="9" class="k-dot"/><text x="${V.X(x)}" y="${V.Y(y) + 3.2}" class="t-key" text-anchor="middle">${esc(code)}</text></g>`); };
    // dimensions (go in their own group so the units switch can hide them)
    const tick = (V, x, y) => d.push(`<line x1="${V.X(x) - 4}" y1="${V.Y(y) + 4}" x2="${V.X(x) + 4}" y2="${V.Y(y) - 4}" class="sh-dim${lyc()}"/>`);
    const lab = (label, len) => (label === undefined ? fmt(len) : String(label).replace(/\{([\d.]+)\}/g, (_, v) => fmt(+v)));
    B.dimH = (V, x1, x2, y, label, ext) => {
      if (ext !== undefined) { B.line(V, x1, ext, x1, y, "sh-dimx", true); B.line(V, x2, ext, x2, y, "sh-dimx", true); }
      B.line(V, x1, y, x2, y, "sh-dim", true); tick(V, x1, y); tick(V, x2, y);
      const t = lab(label, x2 - x1); d.push(`<text x="${n1((V.X(x1) + V.X(x2)) / 2)}" y="${V.Y(y) - 5}" class="t-dim${lyc()}" text-anchor="middle">${esc(t)}</text>`);
      cap({ k: "T", p: [[(x1 + x2) / 2, y + 0.12]], s: t, rot: 0, a: "middle", L: "DIMENSIONS" });
    };
    B.dimV = (V, y1, y2, x, label, ext) => {
      if (ext !== undefined) { B.line(V, ext, y1, x, y1, "sh-dimx", true); B.line(V, ext, y2, x, y2, "sh-dimx", true); }
      B.line(V, x, y1, x, y2, "sh-dim", true); tick(V, x, y1); tick(V, x, y2);
      const t = lab(label, y2 - y1), cx = V.X(x) - 5, cy = n1((V.Y(y1) + V.Y(y2)) / 2);
      d.push(`<text x="${cx}" y="${cy}" class="t-dim${lyc()}" text-anchor="middle" transform="rotate(-90 ${cx} ${cy})">${esc(t)}</text>`);
      cap({ k: "T", p: [[x - 0.12, (y1 + y2) / 2]], s: t, rot: 90, a: "middle", L: "DIMENSIONS" });
    };
    // paper-space furniture (not captured)
    B.title = (x, y, t, sub) => { o.push(`<text x="${x}" y="${y}" class="t-title">${esc(t)}</text><line x1="${x}" y1="${y + 7}" x2="${x + Math.max(160, t.length * 8.6)}" y2="${y + 7}" class="sh-line"/>`); if (sub) o.push(`<text x="${x}" y="${y + 20}" class="t-sm">${esc(sub)}</text>`); };
    B.note = (x, y, lines, w) => { let yy = y; lines.forEach((ln) => { wrap(ln, Math.floor((w || 300) / 5.6)).forEach((l) => { o.push(`<text x="${x}" y="${yy}" class="t-sm">${esc(l)}</text>`); yy += 13; }); yy += 5; }); return yy; };
    B.block = (x, y, w, info) => {
      let yy = y;
      if (info.keys && info.keys.length) {
        o.push(`<text x="${x}" y="${yy}" class="t-title">KEY</text>`); yy += 22;
        info.keys.forEach(([k, v]) => { o.push(`<circle cx="${x + 9}" cy="${yy - 4}" r="9" class="k-dot"/><text x="${x + 9}" y="${yy - 0.8}" class="t-key" text-anchor="middle">${esc(k)}</text><text x="${x + 26}" y="${yy}" class="t-lbl">${esc(v)}</text>`); yy += 22; });
        yy += 12;
      }
      if (info.notes && info.notes.length) {
        o.push(`<text x="${x}" y="${yy}" class="t-title">NOTES</text>`); yy += 19;
        info.notes.forEach((nt, i) => { wrap(`${String(i + 1).padStart(2, "0")}  ${nt}`, Math.floor((w - 12) / 5.5)).forEach((l) => { o.push(`<text x="${x}" y="${yy}" class="t-sm">${esc(l)}</text>`); yy += 13; }); yy += 5; });
        yy += 12;
      }
      const rows = info.rows || [];
      o.push(`<rect x="${x - 10}" y="${yy}" width="${w}" height="${44 + rows.length * 22}" class="sh-box"/>`);
      o.push(`<text x="${x}" y="${yy + 22}" class="t-brand">A ROOM FULL OF PATIENCE</text>`);
      rows.forEach(([k, v], i) => { const ry = yy + 46 + i * 22; o.push(`<line x1="${x - 10}" y1="${ry - 15}" x2="${x - 10 + w}" y2="${ry - 15}" class="sh-thin"/><text x="${x}" y="${ry}" class="t-sm">${esc(k)}</text><text x="${x + 76}" y="${ry}" class="t-lbl">${esc(v)}</text>`); });
    };
    return B;
  }
  function wrap(s, n) { const w = s.split(" "), out = []; let c = ""; w.forEach((x) => { if ((c + " " + x).trim().length > n) { out.push(c.trim()); c = x; } else c += " " + x; }); if (c.trim()) out.push(c.trim()); return out; }

  // the render look: real material textures from SVG noise, plus light, glow and shadow helpers
  function renderDefs(id) {
    const nz = (n, f, oct, seed, rgb, am, ao, type) => `<filter id="${id}-${n}" x="0" y="0" width="1" height="1"><feTurbulence type="${type || "fractalNoise"}" baseFrequency="${f}" numOctaves="${oct}" seed="${seed}" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 ${rgb[0]} 0 0 0 0 ${rgb[1]} 0 0 0 0 ${rgb[2]} ${am} 0 0 0 ${ao}"/></filter>`;
    const tile = (n, w, h, base, layers, extra) => `<pattern id="${id}-${n}" width="${w}" height="${h}" patternUnits="userSpaceOnUse"><rect width="${w}" height="${h}" fill="${base}"/>${layers.map((f) => `<rect width="${w}" height="${h}" filter="url(#${id}-${f})"/>`).join("")}${extra || ""}</pattern>`;
    const marble = (n, base, mott, vein, soft, seed) => [
      nz(n + "M", 0.01, 3, seed, mott, 0.6, -0.2), nz(n + "V", 0.009, 4, seed + 1, vein, -8, 1.0, "turbulence"), nz(n + "S", 0.006, 3, seed + 2, soft, -4, 0.5, "turbulence"),
      tile(n, 260, 260, base, [n + "M", n + "S", n + "V"])].join("");
    const big = `filterUnits="userSpaceOnUse" x="-300" y="-300" width="3600" height="2800"`;
    return [
      `<pattern id="${id}-cut" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="p-bg"/><line x1="0" y1="0" x2="0" y2="6" class="p-ln"/></pattern>`,
      // white limewash: slow cloudy mottle and a fine trowel grain
      nz("lm1", 0.012, 3, 2, [0.6, 0.54, 0.47], 0.45, -0.16), nz("lm2", 0.8, 1, 5, [0.5, 0.45, 0.4], 0.22, -0.07),
      tile("lime", 240, 240, "#efe9e1", ["lm1", "lm2"]),
      // Dark Diva Crown veneer: vertical grain, lighter flecks and a faint crown figure
      nz("vg1", "0.28 0.009", 3, 7, [0.12, 0.055, 0.03], 1.4, -0.45), nz("vg2", "0.12 0.004", 2, 11, [0.62, 0.38, 0.24], 0.9, -0.5),
      tile("ven", 90, 300, "#4a2b1e", ["vg1", "vg2"], `<path d="M8 300 Q45 110 82 300 M17 300 Q45 150 73 300 M26 300 Q45 190 64 300" fill="none" stroke="#1e0e07" stroke-width="1.2" opacity=".28"/>`),
      // stones
      marble("marb", "#f1e8e2", [0.85, 0.74, 0.72], [0.45, 0.17, 0.23], [0.63, 0.37, 0.41], 4),
      marble("bge", "#e4d4bd", [0.8, 0.69, 0.55], [0.62, 0.48, 0.34], [0.72, 0.6, 0.46], 14),
      marble("dgm", "#4b4440", [0.2, 0.18, 0.17], [0.93, 0.9, 0.87], [0.7, 0.66, 0.62], 24),
      marble("flr", "#bdb2a6", [0.62, 0.56, 0.5], [0.52, 0.47, 0.43], [0.6, 0.55, 0.5], 34),
      // white bouclé: nubby loops; taupe fabric: a fine woven slub
      nz("bq1", 0.35, 2, 3, [0.7, 0.65, 0.58], -3.2, 0.8, "turbulence"), nz("bq2", 0.5, 2, 8, [1, 1, 1], 0.7, -0.3),
      tile("bou", 80, 80, "#f3eee6", ["bq1", "bq2"]),
      `<pattern id="${id}-flute" width="6" height="60" patternUnits="userSpaceOnUse"><rect width="6" height="60" fill="#4a2b1e"/><rect width="1.3" height="60" fill="#1e0e07" opacity=".7"/><rect x="2.6" width="1.8" height="60" fill="#8a5a3c" opacity=".5"/></pattern>`,
      nz("tw1", "0.9 0.22", 2, 4, [0.38, 0.31, 0.25], 0.8, -0.28), nz("tw2", "0.22 0.9", 2, 9, [0.74, 0.66, 0.57], 0.7, -0.3),
      tile("tau", 60, 60, "#9a8875", ["tw1", "tw2"]),
      nz("ln1", "0.9 0.25", 2, 6, [0.62, 0.57, 0.5], 0.5, -0.2), nz("ln2", "0.25 0.9", 2, 12, [0.98, 0.96, 0.92], 0.6, -0.25),
      tile("lin", 60, 60, "#ebe4d7", ["ln1", "ln2"]),
      // light and shade
      `<filter id="${id}-glow" ${big}><feGaussianBlur stdDeviation="5"/></filter>`,
      `<filter id="${id}-soft" ${big}><feGaussianBlur stdDeviation="5"/></filter>`,
      `<filter id="${id}-softL" ${big}><feGaussianBlur stdDeviation="13"/></filter>`,
      `<linearGradient id="${id}-amb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf94" stop-opacity=".24"/><stop offset=".2" stop-color="#ffcf94" stop-opacity="0"/><stop offset=".7" stop-color="#2a1a10" stop-opacity="0"/><stop offset="1" stop-color="#2a1a10" stop-opacity=".3"/></linearGradient>`,
      `<radialGradient id="${id}-vig" cx=".5" cy=".45" r=".78"><stop offset=".55" stop-color="#1a110b" stop-opacity="0"/><stop offset="1" stop-color="#1a110b" stop-opacity=".24"/></radialGradient>`,
      `<linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9dbe6"/><stop offset=".6" stop-color="#eceee8"/><stop offset="1" stop-color="#f4ece0"/></linearGradient>`,
      `<linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".13"/><stop offset=".38" stop-color="#fff" stop-opacity=".03"/><stop offset=".39" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
      `<linearGradient id="${id}-deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a2e"/><stop offset="1" stop-color="#211912"/></linearGradient>`,
      `<linearGradient id="${id}-art" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ece7dd"/><stop offset=".45" stop-color="#dcd8cc"/><stop offset=".62" stop-color="#c9c4b4"/><stop offset=".68" stop-color="#9c907a"/><stop offset=".8" stop-color="#7a6b57"/><stop offset="1" stop-color="#5c4f41"/></linearGradient>`,
      `<linearGradient id="${id}-oak" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d6bb93"/><stop offset="1" stop-color="#b8996f"/></linearGradient>`,
      `<radialGradient id="${id}-warm" cx=".5" cy=".4" r=".5"><stop offset="0" stop-color="#ffd9a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/></radialGradient>`,
    ].join("");
  }
  const defs = (id, mode) => mode === "render" ? `<defs>${renderDefs(id)}</defs>` : `<defs>
    <pattern id="${id}-cut" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="p-bg"/><line x1="0" y1="0" x2="0" y2="6" class="p-ln"/></pattern>
    <pattern id="${id}-ven" width="9" height="40" patternUnits="userSpaceOnUse"><rect width="9" height="40" class="p-ven"/><path d="M1 0 Q3 20 1 40 M5 0 Q7 14 5 40" class="p-grain"/></pattern>
    <pattern id="${id}-lime" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" class="p-bg"/><circle cx="3" cy="4" r=".7" class="p-dot"/><circle cx="9" cy="9" r=".6" class="p-dot"/></pattern>
    <pattern id="${id}-marb" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" class="p-marb"/><path d="M0 11 L6 7 L10 10 L16 4" class="p-vein"/></pattern>
    <pattern id="${id}-bge" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" class="p-bge"/><path d="M0 16 Q8 12 13 14 T22 7" class="p-bgv"/></pattern>
    <pattern id="${id}-dgm" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" class="p-dgm"/><path d="M0 13 L7 8 L11 11 L18 4" class="p-dgv"/></pattern>
    <pattern id="${id}-tau" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" class="p-tau"/><path d="M0 3h6M3 0v6" class="p-tauw"/></pattern>
    <pattern id="${id}-flute" width="5" height="40" patternUnits="userSpaceOnUse"><rect width="5" height="40" class="p-ven"/><line x1="4.5" y1="0" x2="4.5" y2="40" class="p-grain"/></pattern>
    <pattern id="${id}-lin" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" class="p-bou"/><path d="M0 3h6M3 0v6" style="stroke:var(--boud);stroke-width:.4"/></pattern>
    <pattern id="${id}-bou" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" class="p-bou"/><circle cx="2.5" cy="2.5" r=".8" class="p-boud"/></pattern>
    <pattern id="${id}-flr" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" class="p-flr"/><path d="M0 30 Q15 22 22 26 T40 14" class="p-fvein"/></pattern>
  </defs>`;

  // ── output ──
  function svgDoc(sheet, mode, inner, w, h, standalone) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${standalone ? w : "100%"}" ${standalone ? `height="${h}"` : ""} data-mode="${mode}" font-family="'IBM Plex Mono', monospace">${standalone ? `<style>${window.SHEET_CSS || ""}</style>` : ""}${inner}</svg>`;
  }
  function build(sheet, mode, units) {
    UNITS = units === "mm" ? "mm" : "ftin";
    const B = Builder(mode);
    B.o.push(defs(B.id, B.mode));
    if (!sheet.bare) B.o.push(`<rect x="6" y="6" width="${sheet.w - 12}" height="${sheet.h - 12}" class="sh-frame"/>`);
    sheet.build(B);
    UNITS = "ftin";
    return { inner: B.o.join("") + `<g class="dims">${units === "off" ? "" : B.d.join("")}</g>`, views: B.views };
  }
  // standalone SVG of one view (for the 3D room): fn(B, V) drawing over 0..L × 0..H feet
  function viewSVG(fn, L, H, k, mode) {
    UNITS = "ftin";
    const B = Builder(mode || "colour", { bare: true });
    B.o.push(defs(B.id, B.mode));
    const V = B.view("v", 0, H * k, k);
    fn(B, V);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L * k} ${H * k}" width="${L * k}" height="${H * k}" data-mode="${mode || "colour"}" preserveAspectRatio="none">${B.o.join("")}</svg>`;
  }

  // ── DXF (R12 ASCII, mm, views laid side by side at true size) ──
  function dxf(views, title) {
    const L = [];
    const p = (c, v) => L.push(String(c), String(v));
    const layers = [["OUTLINE", 7], ["CUT", 8], ["DETAIL", 9], ["HIDDEN", 4], ["DIMENSIONS", 1], ["TEXT", 7], ["LIGHTING", 2]];
    p(0, "SECTION"); p(2, "HEADER"); p(9, "$ACADVER"); p(1, "AC1009"); p(9, "$INSUNITS"); p(70, 4); p(0, "ENDSEC");
    p(0, "SECTION"); p(2, "TABLES");
    p(0, "TABLE"); p(2, "LTYPE"); p(70, 1); p(0, "LTYPE"); p(2, "CONTINUOUS"); p(70, 0); p(3, "Solid line"); p(72, 65); p(73, 0); p(40, 0); p(0, "ENDTAB");
    p(0, "TABLE"); p(2, "LAYER"); p(70, layers.length);
    layers.forEach(([nm, col]) => { p(0, "LAYER"); p(2, nm); p(70, 0); p(62, col); p(6, "CONTINUOUS"); });
    p(0, "ENDTAB"); p(0, "ENDSEC");
    p(0, "SECTION"); p(2, "ENTITIES");
    let cursor = 0;
    views.forEach((v) => {
      if (!v.items.length) return;
      let mnx = 1e9, mny = 1e9, mxx = -1e9;
      v.items.forEach((it) => it.p.forEach(([x, y]) => { mnx = Math.min(mnx, x); mny = Math.min(mny, y); mxx = Math.max(mxx, x); }));
      const ox = cursor - mnx * MM, oy = -mny * MM;
      const X = (x) => (x * MM + ox).toFixed(2), Y = (y) => (y * MM + oy).toFixed(2);
      p(0, "TEXT"); p(8, "TEXT"); p(10, X(mnx)); p(20, (oy + mny * MM - 400).toFixed(2)); p(30, 0); p(40, 120); p(1, (v.name || "VIEW").toUpperCase());
      v.items.forEach((it) => {
        if (it.k === "L" || it.k === "P") {
          const pts = it.c ? [...it.p, it.p[0]] : it.p;
          for (let i = 0; i < pts.length - 1; i++) { p(0, "LINE"); p(8, it.L); p(10, X(pts[i][0])); p(20, Y(pts[i][1])); p(30, 0); p(11, X(pts[i + 1][0])); p(21, Y(pts[i + 1][1])); p(31, 0); }
        } else if (it.k === "C") { p(0, "CIRCLE"); p(8, it.L); p(10, X(it.p[0][0])); p(20, Y(it.p[0][1])); p(30, 0); p(40, (it.r * MM).toFixed(2)); }
        else if (it.k === "T") { p(0, "TEXT"); p(8, it.L); p(10, X(it.p[0][0])); p(20, Y(it.p[0][1])); p(30, 0); p(40, 70); p(1, it.s.replace(/[^\x20-\x7E]/g, (c) => (c === "½" ? ".5" : ""))); if (it.rot) p(50, it.rot); if (it.a === "middle") { p(72, 1); p(11, X(it.p[0][0])); p(21, Y(it.p[0][1])); p(31, 0); } }
      });
      cursor += (mxx - mnx) * MM + 1500;
    });
    p(0, "ENDSEC"); p(0, "EOF");
    return L.join("\r\n");
  }

  function save(name, text, type) {
    const blob = new Blob([text], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  function printSheet(svg, size, title) {
    const f = document.createElement("iframe"); f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.append(f);
    const doc = f.contentDocument;
    doc.open();
    doc.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>@page{size:${size} landscape;margin:7mm}html,body{margin:0;background:#fff}svg{width:100%;height:auto;display:block}</style></head><body>${svg}</body></html>`);
    doc.close();
    setTimeout(() => { f.contentWindow.focus(); f.contentWindow.print(); setTimeout(() => f.remove(), 2000); }, 350);
  }

  // ── a mounted sheet ──
  const MODES = [["cad", "CAD"], ["colour", "Colour"], ["dark", "Dark"], ["blueprint", "Blueprint"], ["render", "Render"]];
  function mount(host, sheet, initial) {
    initial = initial || {};
    const st = { mode: initial.mode || sheet.mode || "cad", units: "ftin", off: new Set(initial.off || []) };
    host.classList.add("sheet");
    host.innerHTML = `
      <header class="sheet-head">
        <div class="sheet-t"><h3>${esc(sheet.title)}</h3><span class="mono sheet-code">${esc(sheet.code)}</span></div>
        <div class="sheet-ctl">
          <div class="seg" role="group" aria-label="Dimensions">${[["off", "Off"], ["mm", "MM"], ["ftin", "FT·IN"]].map(([v, l]) => `<button type="button" data-u="${v}">${l}</button>`).join("")}</div>
          <div class="seg" role="group" aria-label="Sheet look">${MODES.map(([v, l]) => `<button type="button" data-m="${v}">${l}</button>`).join("")}</div>
        </div>
      </header>
      ${sheet.layers ? `<div class="sheet-layers" role="group" aria-label="Layers"><span class="mono">Layers</span>${sheet.layers.map(([v, l]) => `<button type="button" class="chip" data-ly="${v}">${l}</button>`).join("")}</div>` : ""}
      <div class="sheet-paper"><div class="sheet-svg"></div></div>
      <footer class="sheet-foot">
        <span class="mono">Editable CAD</span><button type="button" class="pill-s" data-x="dxf">DXF · true size</button><button type="button" class="pill-s" data-x="svg">SVG</button>
        <span class="mono">Print</span><button type="button" class="pill-s" data-x="a3">A3 PDF</button><button type="button" class="pill-s" data-x="a4">A4 PDF</button><button type="button" class="pill-s" data-x="full">Full screen</button>
      </footer>`;
    const out = host.querySelector(".sheet-svg");
    let last = null;
    function render() {
      host.dataset.mode = st.mode; host.dataset.off = [...st.off].join(" ");
      host.querySelectorAll("[data-u]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.u === st.units));
      host.querySelectorAll("[data-m]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.m === st.mode));
      host.querySelectorAll("[data-ly]").forEach((b) => b.setAttribute("aria-pressed", !st.off.has(b.dataset.ly)));
      last = build(sheet, st.mode, st.units);
      out.innerHTML = svgDoc(sheet, st.mode, last.inner, sheet.w, sheet.h, false);
    }
    const standalone = () => svgDoc(sheet, st.mode, last.inner.replace(/class="([^"]*?)ly-(\w+)/g, (m, a, l) => (st.off.has(l) ? `style="display:none" class="${a}ly-${l}` : m)), sheet.w, sheet.h, true);
    host.querySelectorAll("[data-u]").forEach((b) => (b.onclick = () => { st.units = b.dataset.u; render(); }));
    host.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => { st.mode = b.dataset.m; render(); }));
    host.querySelectorAll("[data-ly]").forEach((b) => (b.onclick = () => { st.off.has(b.dataset.ly) ? st.off.delete(b.dataset.ly) : st.off.add(b.dataset.ly); render(); }));
    host.querySelectorAll("[data-x]").forEach((b) => (b.onclick = () => {
      const x = b.dataset.x, base = `${sheet.code}-${sheet.title}`.replace(/[^\w-]+/g, "-").toLowerCase();
      if (x === "svg") save(base + ".svg", standalone(), "image/svg+xml");
      else if (x === "dxf") { const keep = sheet.layers ? build(sheet, "cad", "ftin").views : last.views; save(base + ".dxf", dxf(keep, sheet.title), "application/dxf"); }
      else if (x === "a3" || x === "a4") printSheet(standalone(), x.toUpperCase(), sheet.title);
      else if (x === "full") { const p = host.querySelector(".sheet-paper"); (p.requestFullscreen ? p.requestFullscreen() : Promise.reject()).catch(() => {}); }
    }));
    render();
    return { render, st };
  }

  return { fmt, arc, rrect, mount, viewSVG, MM, setUnits: (u) => (UNITS = u) };
})();

// Sheet styling: shared by the page and by exported SVG files.
window.SHEET_CSS = `
[data-mode="cad"]{--bg:#fff;--ink:#111;--thin:#3a3a3a;--dim:#111;--soft:#fff;--ven:#fff;--grain:#9a9a9a;--marb:#fff;--vein:#8a8a8a;--bou:#fff;--boud:#b8b8b8;--flr:#fff;--fvein:#cfcfcf;--led:#111;--key:#111;--keyt:#fff;--ward:#fff;--wardl:#111;--metal:#fff;--dark:#fff;--dot:#9a9a9a;--warn:#111;--bge:#fff;--bgv:#b5b5b5;--dgm:#fff;--dgv:#8a8a8a;--tau:#fff;--tauw:#d0d0d0}
[data-mode="colour"]{--bg:#fffdf9;--ink:#1d1a17;--thin:#5e5852;--dim:#9a4a2a;--soft:#f3eee7;--ven:#6b3a24;--grain:#8c5536;--marb:#f6f0ea;--vein:#a46a5f;--bou:#f4f0e9;--boud:#ddd5ca;--flr:#cfc7bd;--fvein:#ece6de;--led:#d0891f;--key:#6b3a24;--keyt:#fff;--ward:#efe3d6;--wardl:#8c5536;--metal:#c9a46a;--dark:#2a2724;--dot:#bdb6ad;--warn:#b0352a;--bge:#e6d8c3;--bgv:#c4ad8d;--dgm:#5e5650;--dgv:#d8d2cc;--tau:#a99886;--tauw:#9a8a78}
[data-mode="dark"]{--bg:#0d0c0b;--ink:#ece6de;--thin:#97908a;--dim:#e0714f;--soft:#1b1917;--ven:#3a2318;--grain:#5c3a29;--marb:#2a2321;--vein:#7a4e48;--bou:#262422;--boud:#3b3835;--flr:#1d1b19;--fvein:#2c2926;--led:#e7a947;--key:#c98f63;--keyt:#0d0c0b;--ward:#24201c;--wardl:#c98f63;--metal:#a8854f;--dark:#000;--dot:#47423d;--warn:#e0714f;--bge:#3a3229;--bgv:#5c4e3d;--dgm:#2a2725;--dgv:#6c6560;--tau:#3a332c;--tauw:#463e36}
[data-mode="blueprint"]{--bg:#123a6b;--ink:#eaf2ff;--thin:#a9c2e6;--dim:#ffd27a;--soft:#174580;--ven:#1b4c88;--grain:#5d88c4;--marb:#1a4a86;--vein:#8fb0dd;--bou:#174580;--boud:#3c6aa8;--flr:#16427a;--fvein:#2a5b98;--led:#ffd27a;--key:#ffd27a;--keyt:#123a6b;--ward:#1a4a86;--wardl:#ffb3d9;--metal:#ffd27a;--dark:#0b2a52;--dot:#6d97d0;--warn:#ffd27a;--bge:#1a4a86;--bgv:#5d88c4;--dgm:#0f3666;--dgv:#8fb0dd;--tau:#1a4a86;--tauw:#2d5d99}
[data-mode="render"]{--bg:#f6f1ea;--ink:#2a221d;--thin:#6b5f55;--dim:#8a4a2a;--soft:#e6dccf;--ven:#4a2b1e;--grain:#2a160d;--marb:#f1e8e2;--vein:#8a4a55;--bou:#f4efe7;--boud:#d8cfc3;--flr:#bdb2a6;--fvein:#a3988c;--led:#fff1d6;--key:#4a2b1e;--keyt:#fff;--ward:#e9dfd2;--wardl:#6b4a35;--metal:#b8925a;--dark:#101012;--dot:#cfc6bb;--warn:#b0352a;--bge:#e4d4bd;--bgv:#b09070;--dgm:#4d4642;--dgv:#e8e2dc;--tau:#9a8875;--tauw:#7d6c5c}
[data-mode="render"] .sh-line{stroke-opacity:.5;stroke-width:.7}
[data-mode="render"] .sh-thin{stroke-opacity:.3}
[data-mode="render"] .sh-hid{stroke-opacity:.18}
[data-mode="render"] .sh-fill,[data-mode="render"] .sh-soft,[data-mode="render"] .sh-dark{stroke-opacity:.4;stroke-width:.7}
[data-mode="render"] .sh-led,[data-mode="render"] .sh-cove{stroke-dasharray:none;stroke-width:1.1}
[data-mode="render"] .sh-light{fill:#fff3dc}
.fx-glow{fill:none;stroke:#ffb35a;stroke-width:8;stroke-opacity:.75}.fx-cove{stroke-width:16;stroke-opacity:.6}.sh-frame{fill:var(--bg);stroke:var(--ink);stroke-width:1.2}
.sh-line{stroke:var(--ink);stroke-width:1.1;fill:none}
.sh-solid{stroke:var(--ink);stroke-width:1.1}
.sh-thick{stroke:var(--ink);stroke-width:2.2;fill:none}
.sh-thin{stroke:var(--thin);stroke-width:.6;fill:none}
.sh-hid{stroke:var(--thin);stroke-width:.8;fill:none;stroke-dasharray:6 4}
.sh-fill{fill:var(--bg);stroke:var(--ink);stroke-width:1.1}
.sh-soft{fill:var(--soft);stroke:var(--ink);stroke-width:1.1}
.sh-led{stroke:var(--led);stroke-width:1.3;fill:none;stroke-dasharray:2 3}
.sh-cove{stroke:var(--led);stroke-width:1.3;fill:none;stroke-dasharray:9 5}
.sh-light{fill:var(--bg);stroke:var(--led);stroke-width:1.2}
.sh-ward{fill:var(--ward);stroke:var(--wardl);stroke-width:1.4}
.sh-chrome{fill:#d4d8dc;stroke:var(--ink);stroke-width:.6}
.sh-metal{fill:var(--metal);stroke:var(--ink);stroke-width:.6}
.sh-dark{fill:var(--dark);stroke:var(--ink);stroke-width:1}
.sh-warn{stroke:var(--warn);stroke-width:1.4;fill:none;stroke-dasharray:3 3}
.sh-box{fill:none;stroke:var(--ink);stroke-width:1.2}
.sh-dim{stroke:var(--dim);stroke-width:.8;fill:none}
.sh-dimx{stroke:var(--dim);stroke-width:.5;fill:none;opacity:.7}
.p-bg{fill:var(--bg)}.p-ln{stroke:var(--ink);stroke-width:.9}
.p-ven{fill:var(--ven)}.p-grain{stroke:var(--grain);stroke-width:.7;fill:none}
.p-marb{fill:var(--marb)}.p-vein{stroke:var(--vein);stroke-width:.8;fill:none}
.p-bou{fill:var(--bou)}.p-boud{fill:var(--boud)}
.p-flr{fill:var(--flr)}.p-fvein{stroke:var(--fvein);stroke-width:1;fill:none}
.p-dot{fill:var(--dot)}.p-tau{fill:var(--tau)}.p-tauw{stroke:var(--tauw);stroke-width:.5}
.p-bge{fill:var(--bge)}.p-bgv{stroke:var(--bgv);stroke-width:.8;fill:none}.p-dgm{fill:var(--dgm)}.p-dgv{stroke:var(--dgv);stroke-width:.8;fill:none}
.t-dim{fill:var(--dim);font:600 10.5px 'IBM Plex Mono',monospace}
.t-lbl{fill:var(--ink);font:10px 'IBM Plex Mono',monospace}
.t-sm{fill:var(--thin);font:9px 'IBM Plex Mono',monospace}
.t-warn{fill:var(--warn);font:600 9.5px 'IBM Plex Mono',monospace}
.t-title{fill:var(--ink);font:700 15px 'Antonio','Arial Narrow',sans-serif;letter-spacing:.06em}
.t-room{fill:var(--ink);font:700 13px 'Antonio','Arial Narrow',sans-serif;letter-spacing:.1em}
.t-brand{fill:var(--ink);font:700 12px 'Antonio','Arial Narrow',sans-serif;letter-spacing:.16em}
.t-key{fill:var(--keyt);font:700 8.5px 'IBM Plex Mono',monospace}
.k-dot{fill:var(--key)}
`;
