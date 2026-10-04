// A Room Full of Patience — renders every page from data.js, routed by the hash (#overview, #room/bed …).
(() => {
  const R = window.ROOM;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const LABEL = { brief: "To brief", open: "Deciding", final: "Final" };
  const st = (s) => `<span class="st st-${s}">${LABEL[s]}</span>`;
  const MARK = `<svg viewBox="0 0 44 62" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 2h34M5 60h34"/><path d="M8 2c0 14 9 19 14 29C17 41 8 46 8 60M36 2c0 14-9 19-14 29 5 10 14 15 14 29"/><path d="M14 52c3-4 6-6 8-6s5 2 8 6z" fill="currentColor" stroke="none"/><path d="M22 34v9" stroke-dasharray="1.5 2.4"/></svg>`;
  const SW = {
    floor: "background-image:url(assets/refs/floor-marble-taupe-gray.jpg)",
    veneer: "background-image:url(assets/refs/veneer-dark-diva-crown-OHBF-607-66.jpg);background-position:30% 85%;background-size:420%",
    white: "background:#efeae2",
    boucle: "background:radial-gradient(circle at 50% 50%,#ddd5ca 1.2px,transparent 1.6px) 0 0/6px 6px,#f4f0e9",
    viola: "background-image:url(assets/refs/tv-ref-vertical-viola.jpg);background-position:40% 20%;background-size:300%",
    bronze: "background:linear-gradient(135deg,#7f5d33,#d9b77e 45%,#8e6a3e 70%,#c9a46a)",
    leather: "background:#e6d9c4", cognac: "background:#8a5134",
    doorstone: "background:linear-gradient(125deg,transparent 46%,rgba(255,255,255,.55) 47%,transparent 49%),linear-gradient(60deg,transparent 62%,rgba(255,255,255,.35) 63%,transparent 64%),#5e5650",
    bathstone: "background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.4) 41%,transparent 43%),#d9c7ae",
  };
  const MAT = Object.fromEntries(R.master.map((m) => [m.swatch, m]));
  const matName = (k) => (MAT[k] ? MAT[k].name + " · " + MAT[k].value.split(" ·")[0] : (R.colour.palette.find((p) => p.id === k) || {}).name || k);
  const thumb = (id) => { const d = DRAW.thumbs && DRAW.thumbs[id]; return d ? `<div class="svg-pic">${CAD.viewSVG(d[0], d[1], d[2], 40, "colour").replace('preserveAspectRatio="none"', 'preserveAspectRatio="xMidYMid meet"')}</div>` : ""; };
  const pic = (it, alt) => (it.img ? img(it.img, alt || it.name) : it.thumb ? thumb(it.thumb) : ph(alt === " " ? " " : "Drawing or render to come"));
  const ph = (t) => `<div class="ph">${MARK}${esc(t || "Image to come")}</div>`;
  const img = (src, alt, cls) => (src ? `<img src="${esc(src)}" alt="${esc(alt || "")}" loading="lazy"${cls ? ` class="${cls}"` : ""}>` : ph());
  const allItems = () => R.groups.flatMap((g) => g.items.map((it) => ({ g, it })));
  const tally = (items) => { const c = { final: 0, open: 0, brief: 0 }; items.forEach((i) => c[i.status]++); return c; };
  const tallyLine = (c) => `${c.final} final · ${c.open} deciding · ${c.brief} to brief`;

  const PAGES = [
    { id: "overview", title: "Overview" }, { id: "plan", title: "Plan & drawings" }, { id: "materials", title: "Materials" }, { id: "colour", title: "Colour & paint" },
    { id: "principles", title: "Principles" }, { id: "lighting", title: "Lighting" },
    ...R.groups.map((g) => ({ id: g.id, title: g.title, group: g })),
    { id: "questions", title: "Open questions" }, { id: "log", title: "Decision log" },
  ];

  // ── chrome: nav, menu, footer, lightbox ──
  function chrome() {
    document.body.insertAdjacentHTML("afterbegin", `
      <nav class="nav" aria-label="Main">
        <a class="pill" href="#room">The rooms</a>
        <a class="brand" href="#overview" aria-label="Overview">${MARK}<b>A Room Full of Patience</b></a>
        <button class="pill menu-open" type="button" aria-expanded="false" aria-controls="menu">Menu <span class="burger"></span></button>
      </nav>
      <div class="menu" id="menu" aria-hidden="true">
        <div class="menu-top"><a class="pill" href="#room">The rooms</a><button class="pill menu-close" type="button">Close ✕</button></div>
        <div class="menu-body">
          <div class="menu-mark">${MARK}</div>
          <ol class="menu-list">${PAGES.map((p, i) => `<li style="transition-delay:${0.06 + i * 0.035}s"><a href="#${p.id}"><span>${pad(i)}</span>${esc(p.title)}</a></li>`).join("")}</ol>
        </div>
        <div class="menu-foot mono"><span>A Room Full of Patience</span><span>Seven years of it, and counting · 2026</span></div>
      </div>
      <div class="lb" role="dialog" aria-modal="true" aria-label="Image"><button class="pill" type="button">Close ✕</button><div><img alt=""><p></p></div></div>
      <div class="toast" role="status"></div>`);
    document.body.insertAdjacentHTML("beforeend", `
      <footer class="footer grain">
        <div class="hero-mark" style="color:var(--crown)">${MARK}</div>
        <h2>A Room Full of <em>Patience</em></h2>
        <p class="hero-tag">${esc(R.tagline)}</p>
        <div class="footer-links">${PAGES.map((p) => `<a class="chip" href="#${p.id}">${esc(p.title)}</a>`).join("")}</div>
        <div class="footer-base mono"><span>${esc(R.project)}</span><span>Every decision on one page</span><span>Concept · verify on site</span></div>
      </footer>`);
    const menu = $("#menu"), openB = $(".menu-open");
    const setMenu = (on) => { menu.classList.toggle("is-open", on); menu.setAttribute("aria-hidden", !on); openB.setAttribute("aria-expanded", on); document.documentElement.style.overflow = on ? "hidden" : ""; if (on) $(".menu-close").focus(); };
    openB.onclick = () => setMenu(true);
    $(".menu-close").onclick = () => setMenu(false);
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); closeLb(); } });
    const lb = $(".lb");
    const closeLb = () => lb.classList.remove("is-open");
    lb.onclick = (e) => { if (e.target === lb || e.target.closest("button")) closeLb(); };
    document.addEventListener("click", (e) => {
      const pv = e.target.closest("[data-pv]"); if (pv) { switchPic(pv); return; }
      const t = e.target.closest("[data-lb]"); if (!t || !t.dataset.lb) return;
      $("img", lb).src = t.dataset.lb; $("p", lb).textContent = t.dataset.cap || ""; lb.classList.add("is-open");
    });
    document.addEventListener("click", (e) => {
      const c = e.target.closest("[data-copy]"); if (!c) return;
      const v = c.dataset.copy; (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(() => toast(`Copied ${v}`), () => toast(v));
    });
  }
  function toast(t) { const el = $(".toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 1800); }

  // ── pieces shared by pages ──
  const pageHero = (title, kicker, lede, left, right, bg) => `
    <header class="phero grain">
      ${bg ? `<div class="phero-bg" style="background-image:url('${esc(bg)}')"></div>` : ""}
      <span class="hero-flank l">${esc(left || "")}</span><span class="hero-flank r">${esc(right || "")}</span>
      <div class="phero-in"><span class="eyebrow">${esc(kicker)}</span><h1>${esc(title)}</h1>${lede ? `<p class="lede">${esc(lede)}</p>` : ""}</div>
    </header>`;
  const next = (id) => { const i = PAGES.findIndex((p) => p.id === id), n = PAGES[(i + 1) % PAGES.length]; return `<section class="next"><span class="eyebrow">Next section</span><h2>${esc(n.title)}</h2><a class="pill" href="#${n.id}">Continue</a></section>`; };
  // card picture: flip between the drawing and the reference photos (Photo again steps to the next one)
  function switchPic(b) {
    const card = b.closest(".gl-pic"), photos = JSON.parse(card.dataset.photos || "[]"), draw = $(".svg-pic", card);
    let ph = $(".pic-photo", card), i = +(card.dataset.pi || -1);
    if (b.dataset.pv === "draw") { if (ph) ph.hidden = true; if (draw) draw.hidden = false; delete card.dataset.lb; card.dataset.pi = -1; }
    else {
      i = (i + 1) % photos.length; card.dataset.pi = i;
      if (!ph) { ph = document.createElement("img"); ph.className = "pic-photo"; ph.alt = ""; card.insertBefore(ph, $(".pic-switch", card)); }
      ph.src = photos[i].src; ph.alt = photos[i].cap; ph.hidden = false; if (draw) draw.hidden = true;
      card.dataset.lb = photos[i].src; card.dataset.cap = photos[i].cap;
      const n = $(".pv-n", b); if (n) n.textContent = `${i + 1}/${photos.length}`;
    }
    card.querySelectorAll("[data-pv]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.pv === b.dataset.pv));
  }  const shots = (refs) => `<div class="refs">${refs.map((r) => `<figure class="shot rv" data-lb="${esc(r.src)}" data-cap="${esc(r.caption)}">${img(r.src, r.caption)}<figcaption>${esc(r.caption)}</figcaption></figure>`).join("")}</div>`;
  const mats = (ks) => (ks && ks.length ? `<div class="mats">${ks.map((k) => `<span class="mat"><i class="sw" style="${SW[k] || ""}"></i>${esc(matName(k))}</span>`).join("")}</div>` : "");

  // ── overview ──
  function overview() {
    const items = allItems().map((x) => x.it), c = tally(items);
    const days = Math.floor((Date.now() - new Date(R.waitingSince)) / 864e5);
    const heroSVG = CAD.viewSVG((B, V) => DRAW.views.wallBed(B, V, {}), 16, 10.5, 60, "dark");
    return `
    <header class="hero grain">
      <div class="hero-bg">${R.media.film ? `<video src="${esc(R.media.film)}" autoplay muted loop playsinline></video>` : heroSVG}</div>
      <span class="hero-flank l">Particulars of the room</span><span class="hero-flank r">Every decision on one page</span>
      <div class="hero-in">
        <div class="hero-mark">${MARK}</div>
        <h1>A Room Full<br>of <em>Patience</em></h1>
        <p class="hero-tag">${esc(R.tagline)}</p>
        <p class="hero-lines">A bedroom, a study, a dressing room.<br>Seven years without one.<br>Now it's taking its time.</p>
      </div>
      <div class="counter"><b data-count>${days.toLocaleString("en-GB")} days</b><span>without a room of my own · and counting</span><div class="scroll-cue"></div></div>
    </header>
    <section class="bone">
      <div class="wrap"><span class="eyebrow">What is already decided · not much, but it's a start</span>
        <div class="bone-grid">${["floor", "walls", "veneer", "fabric"].map((id) => { const m = R.master.find((x) => x.id === id); return `<div class="rv"><h3>${esc(m.name)}</h3><p>${esc(m.value)}</p>${st(m.status)}</div>`; }).join("")}</div>
      </div>
    </section>
    <section class="section statement grain"><div class="burst"></div>
      <div class="wrap head"><span class="eyebrow rv">The premise</span><h2 class="rv">Seven years without a room. The least I can do is <em>draw every inch</em> of this one.</h2><p class="lede rv">${esc(R.intro)}</p></div>
    </section>
    <section class="section"><div class="wrap">
      <div class="head"><span class="eyebrow rv">The suite</span><h2 class="rv">Four rooms. One book.</h2><p class="lede rv">${tallyLine(c)}, across everything. Pick a room.</p></div>
      <div class="rooms">${R.groups.map((g, i) => { const t = tally(g.items), cover = g.items.find((x) => x.img); return `
        <a class="room-card rv" href="#${g.id}"><div class="pic">${cover ? img(cover.img, g.title) : ph(g.title)}</div>
          <div class="body"><span class="num">${pad(i + 1)}</span><h3>${esc(g.title)}</h3><p>${esc(g.kicker)}</p><span class="tally">${t.final} of ${g.items.length} final</span></div></a>`; }).join("")}</div>
    </div></section>
    <section class="section"><div class="wrap">
      <div class="head"><span class="eyebrow rv">The index</span><h2 class="rv">Every section, and where it stands.</h2></div>
      <div class="index">${PAGES.slice(1).map((p, i) => { const its = p.group ? p.group.items : null; const t = its ? tally(its) : null; const pct = its ? Math.round((100 * t.final) / its.length) : 100; const lab = its ? tallyLine(t) : "reference"; return `
        <a class="irow rv" href="#${p.id}"><span class="num">${pad(i + 1)}</span><b>${esc(p.title)}</b><span class="bar"><i style="width:${pct}%"></i></span><span class="tally">${lab}</span><span class="arrow">→</span></a>`; }).join("")}</div>
    </div></section>
    <section class="section"><div class="wrap">
      <div class="head"><span class="eyebrow rv">The room in 3D</span><h2 class="rv">A drawing, in three dimensions. Drag it about.</h2><p class="lede rv">The plan on the floor and the four wall elevations standing on it: the same lines as the CAD sheets, so the model can never disagree with the drawings. The wall in your way steps aside.</p></div>
      <div class="rv" data-r3d></div>
    </div></section>
    <section class="section"><div class="wrap">
      <div class="head"><span class="eyebrow rv">The plan</span><h2 class="rv">Switch things on and off.</h2><p class="lede rv">Room sizes, furniture, clearances and the designer's lights, each on its own layer. Download it as true-size DXF, SVG or a printable A3.</p></div>
      <div class="rv" data-sheet="plan"></div>
    </div></section>
    <section class="section"><div class="wrap">
      <div class="head"><span class="eyebrow rv">The film</span><h2 class="rv">Walk the rooms.</h2></div>
      <div class="film rv">${R.media.film ? `<video src="${esc(R.media.film)}" controls playsinline></video>` : `<div class="ph">${MARK}<b>No film yet.</b><em>Seven years, what's a few more weeks.</em><span>Render in Blender · drop the MP4 into assets/media · name it in data.js</span></div>`}</div>
      <div class="chapters">${["From the door", "The bed wall", "The TV wall", "The study", "The dressing", "The bathroom"].map((t, i) => `<button class="chip" type="button" disabled>${pad(i + 1)} · ${t}</button>`).join("")}</div>
    </div></section>
    <section class="section"><div class="wrap">
      <div class="head"><span class="eyebrow rv">The pieces</span><h2 class="rv">Drawn to be made, not just imagined.</h2></div>
      <div class="strip">${allItems().map(({ g, it }, i) => `<a class="piece rv" href="#${g.id}/${it.id}">${pic(it)}<div class="cap"><span class="num">${pad(i + 1)}</span><h3>${esc(it.name)}</h3>${st(it.status)}</div></a>`).join("")}</div>
    </div></section>
    <section class="section"><div class="wrap">
      <div class="head"><span class="eyebrow rv">From the owner's sketch</span><h2 class="rv">Where it all started.</h2><p class="lede rv">The measurements, by hand. Everything on this site is drawn from these.</p></div>
      <div class="sketches">${R.sketches.map((s) => `<figure class="shot rv" data-lb="${esc(s.src)}" data-cap="${esc(s.caption)}">${img(s.src, s.caption)}<figcaption>${esc(s.caption)}</figcaption></figure>`).join("")}</div>
    </div></section>`;
  }

  // ── a room group ──
  function itemHTML(g, it, i, n) {
    const parts = it.parts || [], vers = it.versions || [], refs = it.refs || [], qs = it.questions || [], dws = it.drawings || [];
    const sel = vers.filter((v) => v.state === "selected"), con = vers.filter((v) => v.state !== "selected");
    const facts = (it.facts || []).slice(0, 4);
    const verRow = (v) => `<div class="ver ${v.state === "selected" ? "sel" : ""}"><span class="st ${v.state === "selected" ? "st-final" : "st-brief"}">${v.state === "selected" ? "Selected" : "Considered"}</span><div><b>${esc(v.name)}</b><p>${esc(v.note || "")}</p></div><span class="mono when">${esc(v.date || "")}</span></div>`;
    const partRow = (p) => {
      let val;
      if (p.inherit) { const m = R.master.find((x) => x.id === p.inherit); val = `<b>${esc(m.value)}</b>${m.finish ? ` · ${esc(m.finish)}` : ""}<span class="inherit">↳ from Materials</span>`; }
      else val = p.value ? esc(p.value).replace(/^(DECIDED[^:]*:|DECIDED SIZE:)/, "<b>$1</b>") : `<span class="tbd">${esc(p.hint || "To brief")}</span>`;
      return `<div class="spec-row"><div class="lab">${esc(p.label)}</div><div class="val">${val}</div></div>`;
    };
    const m = it.media || {};
    // reference photos for the card's Drawing / Photo switch
    const photos = [...new Set([it.img, ...refs.map((r) => r.src)].filter(Boolean))].map((src) => ({ src, cap: (refs.find((r) => r.src === src) || {}).caption || it.name }));
    return `
    <article class="item" id="${g.id}-${it.id}">
      <div class="wrap">
        <div class="gl-card rv">
          <div class="gl-pic" ${it.img ? `data-lb="${esc(it.img)}" data-cap="${esc(it.name)}"` : ""}${photos.length ? ` data-photos="${esc(JSON.stringify(photos))}"` : ""}>${pic(it)}${it.thumb && photos.length ? `<div class="seg pic-switch" role="group" aria-label="Picture"><button type="button" data-pv="draw" aria-pressed="true">Drawing</button><button type="button" data-pv="photo" aria-pressed="false">Photo${photos.length > 1 ? ` <span class="pv-n">1/${photos.length}</span>` : ""}</button></div>` : ""}</div>
          <div class="gl-body">
            <div class="gl-top"><span class="num">${pad(i + 1)} / ${pad(n)}</span>${st(it.status)}</div>
            <h2>${esc(it.name)}</h2>
            ${it.line ? `<p class="gl-line">${esc(it.line)}</p>` : `<p class="gl-line" style="color:var(--muted)">Not briefed yet. Patience.</p>`}
            <div class="facts">${facts.map(([v, k]) => (v || k ? `<div><b>${esc(v)}</b><span>${esc(k)}</span></div>` : `<div class="empty"></div>`)).join("")}</div>
            ${mats(it.mats)}
          </div>
        </div>
        <details class="more">
          <summary><b>All details</b><span class="mono">${parts.length} specs · ${vers.length} versions · ${dws.length} drawings · ${refs.length} references · ${qs.length} open questions</span><span class="plus"></span></summary>
          <div class="more-body">
            <section><div class="block-t"><h3>The particulars</h3></div><div class="spec">${parts.map(partRow).join("")}</div></section>
            <section><div class="block-t"><h3>Versions</h3><span class="mono">${sel.length ? "one selected" : "nothing selected yet"}</span></div>
              <div class="versions">${sel.map(verRow).join("")}
                ${con.length ? `<details class="considered" ${sel.length ? "" : "open"}><summary>${con.length} considered ▾</summary><div class="versions">${con.map(verRow).join("")}</div></details>` : ""}
                ${!vers.length ? `<p class="lede" style="font-size:15px">No versions yet. Add one in data.js when there is something to choose between.</p>` : ""}</div></section>
            ${dws.length ? `<section><div class="block-t"><h3>Drawings</h3><span class="mono">CAD · DXF · SVG · PDF</span></div><div class="stack">${dws.map((d) => `<div data-sheet="${d}"></div>`).join("")}</div></section>` : ""}
            <section><div class="block-t"><h3>Renders & 3D</h3><span class="mono">from Blender</span></div>
              <div class="slots">
                ${(m.renders || []).length ? m.renders.map((r) => `<figure class="shot" data-lb="${esc(r)}">${img(r)}</figure>`).join("") : `<div class="slot"><b>Renders</b><small>None yet. Add images to assets/media and list them under this piece.</small></div>`}
                <div class="slot">${m.film ? `<video src="${esc(m.film)}" controls style="width:100%"></video>` : `<b>Walkthrough</b><small>No film yet.</small>`}</div>
                <div class="slot">${m.model ? `<model-viewer src="${esc(m.model)}" camera-controls auto-rotate style="width:100%;height:240px"></model-viewer>` : `<b>3D model</b><small>Export from Blender as .glb and it turns in the page.</small>`}</div>
              </div></section>
            ${it.docs ? `<section><div class="block-t"><h3>Documents</h3></div><div class="docs">${it.docs.map((d) => `<a class="pill" href="${esc(d.src)}" target="_blank" rel="noopener">${esc(d.name)} ↗</a>`).join("")}</div></section>` : ""}
            ${refs.length ? `<section><div class="block-t"><h3>References</h3><span class="mono">${pad(refs.length)}</span></div>${shots(refs)}</section>` : ""}
            ${qs.length ? `<section><div class="block-t"><h3>Open questions</h3></div><ol class="qs">${qs.map((q, j) => `<li><b>Q${pad(j + 1)}</b><span>${esc(q)}</span></li>`).join("")}</ol></section>` : ""}
          </div>
        </details>
      </div>
    </article>`;
  }
  function group(g) {
    const t = tally(g.items), cover = g.items.find((x) => x.img);
    return `${pageHero(g.title, g.kicker, g.intro, g.left, g.right, cover && cover.img)}
    <section style="padding-block:10px 50px"><div class="wrap">
      <div class="gl-index">${g.items.map((it) => `<a class="gl-idx" href="#${g.id}/${it.id}"><div class="pic">${pic(it, " ")}<i class="dot" style="background:var(--${it.status})"></i></div><span>${esc(it.name)}</span></a>`).join("")}</div>
      <p class="tally tally-line">${tallyLine(t)}</p>
      ${g.r3d ? `<div class="block-t" style="margin-top:34px"><h3>${esc(g.title.replace(/^The /, ""))} in 3D</h3><span class="mono">built from the drawings · drag to turn</span></div><div class="rv" data-r3d="${g.r3d}"></div>` : ""}
    </div></section>
    ${g.items.map((it, i) => itemHTML(g, it, i, g.items.length)).join("")}
    ${next(g.id)}`;
  }

  // ── plan & drawings ──
  function plan() {
    const sh = DRAW.sheets;
    return `${pageHero("Plan & drawings", "Every sheet, every size", "The suite to scale, the four walls, and every drawing in the book. Each sheet switches between CAD, colour, dark and blueprint, between feet and millimetres, and downloads as a true-size DXF, an SVG or a printable A3 / A4.", "Measured by hand", "Drawn to the inch")}
    <section class="section" style="padding-top:20px"><div class="wrap stack">
      <div class="facts-list">${R.facts.map((f) => `<div class="rv"><b>${esc(f.k)}</b><p>${esc(f.v)}</p></div>`).join("")}</div>
      <div><div class="block-t"><h3>Drawing index</h3><span class="mono">${pad(DRAW.index.length)} sheets</span></div>
        <table class="dtable"><thead><tr><th>Sheet</th><th>Title</th><th>Piece</th><th>Status</th><th></th></tr></thead><tbody>
        ${DRAW.index.map((d) => `<tr><td>${sh[d.id].code}</td><td><a href="#plan" data-jump="sheet-${d.id}">${esc(sh[d.id].title)}</a></td><td>${esc(d.item)}</td><td>${st(d.status)}</td><td><a class="arrow" href="#plan" data-jump="sheet-${d.id}" aria-label="Open ${esc(sh[d.id].title)}">→</a></td></tr>`).join("")}
        </tbody></table></div>
      <div><div class="block-t"><h3>Documents</h3><span class="mono">originals</span></div><div class="docs">${R.docs.map((d) => `<a class="pill" href="${esc(d.src)}" target="_blank" rel="noopener">${esc(d.name)} ↗</a>`).join("")}</div></div>
      <div class="rv" data-r3d></div>
      ${DRAW.index.map((d) => `<div id="sheet-${d.id}" class="rv" data-sheet="${d.id}"></div>`).join("")}
    </div></section>${next("plan")}`;
  }
  // ── materials ──
  function materials() {
    return `${pageHero("Materials", "What everything is made of", "Fixed first: the floor, the white, the veneer and the bed fabric. The rest is still being chosen, with the options on the table and the rule each one has to obey.", "One wood", "One stone, one metal", "assets/refs/floor-marble-taupe-gray.jpg")}
    <section class="section" style="padding-top:20px"><div class="wrap"><div class="cards">${R.master.map((m) => `
      <article class="mcard rv"><div class="tex" style="${SW[m.swatch] || ""};background-size:cover">${st(m.status)}</div>
        <div class="in"><span class="eyebrow">${esc(m.name)}</span><h3>${esc(m.value)}</h3>${m.finish ? `<p class="v">Finish · ${esc(m.finish)}</p>` : ""}
          <div class="opts">${m.options.map((o) => `<span class="opt ${m.value.includes(o) || (m.finish || "").includes(o) ? "on" : ""}">${esc(o)}</span>`).join("")}</div>
          <p class="r">${esc(m.rule)}</p>
          ${m.refs.length ? `<div class="refs">${m.refs.map((r) => `<figure class="shot" data-lb="${esc(r.src)}" data-cap="${esc(r.caption)}">${img(r.src, r.caption)}</figure>`).join("")}</div>` : ""}</div></article>`).join("")}</div></div></section>${next("materials")}`;
  }
  // ── colour ──
  function colour() {
    const C = R.colour, P = (id) => C.palette.find((p) => p.id === id);
    const bgs = ["#efeae2", "#5b2f1d", "#7a3a2e"], fgs = ["#1d1814", "#f1ebe3", "#f1ebe3"];
    return `${pageHero("Colour & paint", "Sixty, thirty, ten", C.intro, "The quiet sixty", "The loud ten")}
    <section class="section" style="padding-top:20px"><div class="wrap stack">
      <div class="ratio rv">${C.split.map((s, i) => `<div style="background:${bgs[i]};color:${fgs[i]}"><span>${esc(s.name)}</span><b>${s.share}</b><p>${esc(s.v)}</p></div>`).join("")}</div>
      <div><div class="block-t"><h3>The palette</h3><span class="mono">click to copy</span></div>
        <div class="palette">${C.palette.map((p) => `<button class="chipc rv" type="button" data-copy="${p.hex}"><i style="${SW[p.id] || `background:${p.hex}`}"></i><div><b>${esc(p.name)}</b><span>${p.hex} · ${esc(p.role)}</span></div></button>`).join("")}</div></div>
      <div><div class="block-t"><h3>Paint</h3></div><div class="spec">${C.paint.map((p) => `<div class="spec-row"><div class="lab">${esc(p.name)} ${st(p.status)}</div><div class="val"><b>${esc(p.value)}</b> · ${esc(p.note)}</div></div>`).join("")}</div></div>
    </div></section>${next("colour")}`;
  }
  // ── principles ──
  function principles() {
    const P = R.principles;
    return `${pageHero("Principles", "How the room is designed", P.intro, "Rules first", "Then the room")}
    <section class="section" style="padding-top:20px"><div class="wrap pgroups">${P.groups.map((g) => `
      <div class="pgroup rv"><div class="n">${g.n}</div><div><h3>${esc(g.name)}</h3><p class="line">${esc(g.line)}</p>
        ${g.rules.map((r) => `<div class="rule"><h4>${esc(r.t)}</h4><p>${esc(r.body)}</p><div class="check"><span class="mono">Where it stands</span><span>${esc(r.check)}</span></div></div>`).join("")}</div></div>`).join("")}</div></section>${next("principles")}`;
  }
  // ── lighting ──
  function lighting() {
    const L = R.lighting;
    return `${pageHero("Lighting", "Warm, or nothing", L.intro, "3000K", "Every cove dims together")}
    <section class="section" style="padding-top:20px"><div class="wrap stack">
      <ul class="rules">${L.rules.map((r) => `<li class="rv">${esc(r)}</li>`).join("")}</ul>
      <div class="zones">${L.zones.map((z) => `<div class="zone rv"><div class="gl-top"><h3>${esc(z.name)}</h3>${st(z.status)}</div><dl>${z.lights.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl></div>`).join("")}</div>
      <div class="rv" data-sheet="plan" data-off="sizes clear"></div>
      <div class="docs"><a class="pill" href="assets/docs/rcp-lighting-plan.pdf" target="_blank" rel="noopener">RCP-1 · the designer's lighting plan ↗</a></div>
    </div></section>${next("lighting")}`;
  }
  // ── open questions ──
  function questions() {
    const n = allItems().reduce((a, { it }) => a + (it.questions || []).length, 0) + R.questions.length;
    return `${pageHero("Open questions", `${n} still open`, "Everything waiting on an answer. Each one changes a drawing.", "Asked", "Not yet answered")}
    <section class="section" style="padding-top:20px"><div class="wrap">
      <div class="qgroup rv"><h3>The whole suite</h3><ol class="qs">${R.questions.map((q, j) => `<li><b>Q${pad(j + 1)}</b><span>${esc(q)}</span></li>`).join("")}</ol></div>
      ${R.groups.map((g) => { const its = g.items.filter((it) => (it.questions || []).length); if (!its.length) return ""; return `<div class="qgroup rv"><h3>${esc(g.title)}</h3>${its.map((it) => `<h4><a href="#${g.id}/${it.id}">${esc(it.name)} →</a></h4><ol class="qs">${it.questions.map((q, j) => `<li><b>Q${pad(j + 1)}</b><span>${esc(q)}</span></li>`).join("")}</ol>`).join("")}</div>`; }).join("")}
    </div></section>${next("questions")}`;
  }
  // ── decision log ──
  function log() {
    return `${pageHero("Decision log", "What was decided, and when", "Every decision, dated. Newest at the bottom, because patience.", "Decided", "Dated")}
    <section class="section" style="padding-top:20px"><div class="wrap"><div class="log">${R.log.map((l) => `<div class="log-row rv"><span class="d">${esc(l.date)}</span><span class="pt"></span><div><b>${esc(l.item)}</b><p>${esc(l.text)}</p></div></div>`).join("")}</div></div></section>${next("log")}`;
  }

  // ── mount, reveal, route ──
  const RENDER = { overview, plan, materials, colour, principles, lighting, questions, log };
  const main = document.createElement("main"); main.id = "app";
  let io;
  function mountLazy(root) {
    const sheetIO = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; const el = e.target; sheetIO.unobserve(el);
      if (el.dataset.sheet) CAD.mount(el, DRAW.sheets[el.dataset.sheet], { off: (el.dataset.off || "").split(" ").filter(Boolean) });
      if (el.hasAttribute("data-r3d")) ROOM3D.mount(el, el.dataset.r3d);
    }), { rootMargin: "400px 0px" });
    $$("[data-sheet], [data-r3d]", root).forEach((el) => { if (!el.closest("details")) sheetIO.observe(el); });
    $$("details.more", root).forEach((d) => d.addEventListener("toggle", () => { if (d.open) $$("[data-sheet]", d).forEach((el) => { if (!el.classList.contains("sheet")) CAD.mount(el, DRAW.sheets[el.dataset.sheet]); }); }));
  }
  function reveal(root) {
    if (io) io.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    $$(".rv", root).forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
    setTimeout(() => $$(".rv:not(.in)", root).forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); }), 1200);
  }
  let current = null;
  function route() {
    const [id, sub] = (location.hash.slice(1) || "overview").split("/");
    const page = PAGES.find((p) => p.id === id) || PAGES[0];
    if (current !== page.id) {
      current = page.id;
      main.innerHTML = `<div class="page is-on">${page.group ? group(page.group) : RENDER[page.id]()}</div>`;
      document.body.dataset.page = page.id;
      document.title = page.id === "overview" ? `${R.name} · ${R.tagline}` : `${page.title} · ${R.name}`;
      $$(".menu-list a").forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === `#${page.id}`));
      $$(".menu-list a[aria-current]").forEach((a) => a.setAttribute("aria-current", "page"));
      mountLazy(main); reveal(main); window.scrollTo(0, 0); if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      tickCounter();
    }
    if (sub) setTimeout(() => { const t = document.getElementById(`${page.id}-${sub}`); if (t) { const d = $("details.more", t); if (d) d.open = true; if (window.__lenis) window.__lenis.scrollTo(t, { offset: -70 }); else t.scrollIntoView({ behavior: "smooth", block: "start" }); } }, 350);
  }
  function tickCounter() {
    const el = $("[data-count]"); if (!el) return;
    clearInterval(tickCounter.t);
    const upd = () => { const ms = Date.now() - new Date(R.waitingSince); const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5), m = Math.floor((ms % 36e5) / 6e4), s = Math.floor((ms % 6e4) / 1e3); el.textContent = `${d.toLocaleString("en-GB")} days ${pad(h)}:${pad(m)}:${pad(s)}`; };
    upd(); tickCounter.t = setInterval(upd, 1000);
  }
  document.addEventListener("click", (e) => { const j = e.target.closest("[data-jump]"); if (!j) return; e.preventDefault(); const t = document.getElementById(j.dataset.jump); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); });

  // nav: solid after the hero edge, hides on the way down
  let lastY = 0;
  function onScroll() {
    const y = scrollY, nav = $(".nav");
    nav.classList.toggle("is-solid", y > 60);
    nav.classList.toggle("is-hidden", y > 400 && y > lastY + 4 && !$("#menu").classList.contains("is-open"));
    if (y < lastY - 4) nav.classList.remove("is-hidden");
    lastY = y;
  }

  chrome();
  $(".nav").after(main);
  addEventListener("hashchange", route);
  addEventListener("scroll", onScroll, { passive: true });
  route();
  if (window.Lenis && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, prevent: (n) => n.closest && (n.closest(".r3d-stage") || n.closest(".sheet-paper") || n.closest(".menu")) });
    window.__lenis = lenis; lenis.on("scroll", onScroll);
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
  }
  if (allItems().some(({ it }) => it.media && it.media.model)) { const s = document.createElement("script"); s.type = "module"; s.src = "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js"; document.head.append(s); }
})();
