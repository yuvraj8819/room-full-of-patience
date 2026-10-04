// Motion: drawings that draw themselves, headings that wipe in word by word, photos that open with a slow zoom
// and drift as you scroll. Everything is skipped for people who prefer reduced motion.
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const ease = "cubic-bezier(.2,.7,.1,1)";

  // ── drawings draw themselves: strokes trace on like a pen, then fills and text fade up ──
  const SHAPES = "line,polyline,polygon,rect,circle,ellipse,path";
  function drawOn(svg) {
    const els = $$(SHAPES, svg).filter((el) => !el.closest("defs,pattern,filter,clipPath,mask") && el.getTotalLength);
    const n = els.length; if (!n) return;
    const span = Math.min(1400, 300 + n * 1.2); // the whole sheet traces on over about a second
    els.forEach((el, i) => {
      let L = 0; try { L = el.getTotalLength(); } catch (e) { return; }
      if (!L || !isFinite(L)) return;
      const delay = (i / n) * span;
      el.animate([
        { strokeDasharray: `${L} ${L}`, strokeDashoffset: L, fillOpacity: 0 },
        { strokeDasharray: `${L} ${L}`, strokeDashoffset: 0, fillOpacity: 0, offset: 0.65 },
        { strokeDasharray: `${L} ${L}`, strokeDashoffset: 0, fillOpacity: 1 },
      ], { duration: 900, delay, easing: ease, fill: "backwards" });
    });
    $$("text", svg).forEach((t, i) => t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: span * 0.6 + (i % 12) * 20, fill: "backwards" }));
  }
  const drawIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; drawIO.unobserve(e.target);
    const svg = e.target.querySelector("svg"); if (svg) drawOn(svg);
  }), { rootMargin: "0px 0px -12% 0px" });

  // ── headings wipe in, word by word, from behind a mask ──
  function split(h) {
    if (h.dataset.split) return; h.dataset.split = "1";
    let i = 0;
    const wrap = (node) => { const w = document.createElement("span"); w.className = "w"; const s = document.createElement("span"); s.style.setProperty("--i", i++); w.append(s); s.append(node); return w; };
    Array.from(h.childNodes).forEach((node) => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => { if (!part) return; frag.append(/^\s+$/.test(part) ? document.createTextNode(part) : wrap(document.createTextNode(part))); });
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && node.tagName !== "BR") node.replaceWith(wrap(node.cloneNode(true)));
    });
    h.classList.add("split");
  }
  const textIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("split-in"); textIO.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });

  // ── photos open with a slow zoom and drift a little against the scroll ──
  const pics = new Set();
  const picIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("zin"); pics.add(e.target); } else pics.delete(e.target); }), { rootMargin: "10% 0px" });
  function drift() {
    const vh = innerHeight;
    pics.forEach((img) => { if (!img.closest(".gl-pic")) return; const r = img.getBoundingClientRect(); const k = ((r.top + r.height / 2) - vh / 2) / vh; img.style.setProperty("--py", `${(-k * 26).toFixed(1)}px`); });
    requestAnimationFrame(drift);
  }
  requestAnimationFrame(drift);

  // ── wire everything that appears on the page, now and after every route change or lazy mount ──
  function scan() {
    $$(".sheet").forEach((s) => { if (s.dataset.drawn) return; const svg = s.querySelector(".sheet-svg svg"); if (!svg) return; s.dataset.drawn = "1"; drawIO.observe(s.querySelector(".sheet-svg")); });
    $$("main .svg-pic").forEach((p) => { if (p.dataset.drawn) return; p.dataset.drawn = "1"; drawIO.observe(p); });
    $$("main h1, main h2").forEach((h) => { if (h.closest(".sheet,.r3d,.menu") || h.dataset.split) return; split(h); textIO.observe(h); });
    $$("main .gl-pic img, main .shot img, main .sketches img").forEach((img) => { if (img.dataset.cine) return; img.dataset.cine = "1"; img.classList.add("cine"); picIO.observe(img); });
  }
  let t = 0;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(scan, 60); }).observe(document.body, { childList: true, subtree: true });
  addEventListener("DOMContentLoaded", scan); setTimeout(scan, 300);
})();
