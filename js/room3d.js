// The room in three dimensions, built from the drawings themselves: the plan lies on the floor and each
// wall elevation stands on its edge. Walls show only their inner face, so whichever wall is between you
// and the room disappears and you always see in. Drag to turn, scroll or pinch to zoom.
window.ROOM3D = (function () {
  // scenes: walls stand on the floor plan's edges. Wall at the far edge (plan y = D): rot 0, u = x.
  // Near edge (y = 0): rot 180, u = W - x. Left edge (x = 0): rot -90, u = y. Right edge (x = W): rot 90, u = D - y.
  const SCENES = {
    room: () => {
      const v = DRAW.views, W = 16, D = 13;
      return { W, D, Ht: 10.5, k: 30, fitW: 1350,
        views: [["From the door", -38, 58], ["Bed wall", 180, 62], ["TV wall", 0, 62], ["Desk wall", 90, 62], ["Dressing side", -90, 62], ["From above", -20, 12]],
        floor: (B, V) => v.plan(B, V, { floor: true, labels: false }),
        walls: [
          { name: "TV wall", L: 15.75, fn: (B, V) => v.wallTV(B, V, {}), mx: W / 2, my: 0, rot: 0 },
          { name: "Bed wall", L: 16, fn: (B, V) => v.wallBed(B, V, {}), mx: W / 2, my: D, rot: 180 },
          { name: "Desk wall", L: 13, fn: (B, V) => v.wallDesk(B, V, {}), mx: 0, my: D / 2, rot: -90 },
          { name: "Dressing side", L: 13, fn: (B, V) => v.wallDressing(B, V, {}), mx: W, my: D / 2, rot: 90 },
        ], panels: [] };
    },
    bath: () => {
      const v = DRAW.views, b = DRAW.bath, W = b.BW, D = b.BD;
      return { W, D, Ht: b.BH, k: 52, fitW: 1150,
        views: [["From the door", -20, 58], ["Shower & WC", 90, 62], ["Window", 0, 62], ["Vanity", -90, 62], ["Door wall", 180, 62], ["From above", -20, 12]],
        floor: (B, V) => v.bathPlan(B, V, { bare: true }),
        walls: [
          { name: "Window wall", L: W, fn: (B, V) => v.bathWallWindow(B, V, {}), mx: W / 2, my: 0, rot: 0 },
          { name: "Door wall", L: W, fn: (B, V) => v.bathWallDoor(B, V, { bare: true }), mx: W / 2, my: D, rot: 180 },
          { name: "Left wall", L: D, fn: (B, V) => v.bathWallLeft(B, V, {}), mx: 0, my: D / 2, rot: -90 },
          { name: "Right wall", L: D, fn: (B, V) => v.bathWallRight(B, V, {}), mx: W, my: D / 2, rot: 90 },
        ],
        // the fixed glass, standing free of the walls
        panels: [{ name: "Fixed glass", L: b.GL, h: b.GH, mx: b.GL / 2, my: D - b.GLASS, rot: 0, cls: "r3d-glass" }] };
    },
  };
  function mount(host, name) {
    const sc = (SCENES[name] || SCENES.room)(), { W, D, Ht, k, walls } = sc, VIEWS = sc.views;
    const MODES = [["cad", "CAD"], ["colour", "Colour"], ["dark", "Dark"], ["blueprint", "Blueprint"], ["render", "Render"]];
    let mode = "render";    const svgOf = (w) => CAD.viewSVG(w.fn, w.L, Ht, k, mode);
    const floorSVG = () => CAD.viewSVG(sc.floor, W, D, k, mode);
    walls.forEach((w) => (w.svg = svgOf(w)));
    const floor = floorSVG();
    host.classList.add("r3d");
    host.innerHTML = `
      <div class="r3d-stage" data-mode="render" tabindex="0" aria-label="3D room. Drag to turn, scroll to zoom."><div class="r3d-dim"></div>
        <div class="r3d-world" style="width:${W * k}px;height:${D * k}px">
          <div class="r3d-floor">${floor}</div>
          ${sc.panels.map((p) => `<div class="r3d-wall ${p.cls}" title="${p.name}" style="width:${p.L * k}px;height:${p.h * k}px;left:${p.mx * k - (p.L * k) / 2}px;top:${p.my * k - p.h * k}px;transform:rotateZ(${p.rot}deg) rotateX(-90deg)"></div>`).join("")}
          ${walls.map((w) => `<div class="r3d-wall" title="${w.name}" style="width:${w.L * k}px;height:${Ht * k}px;left:${w.mx * k - (w.L * k) / 2}px;top:${w.my * k - Ht * k}px;transform:rotateZ(${w.rot}deg) rotateX(-90deg)">${w.svg}</div>`).join("")}
        </div>
      </div>
      <div class="r3d-ui">
        <div class="r3d-views">${VIEWS.map(([n], i) => `<button type="button" class="chip" data-v="${i}">${String(i + 1).padStart(2, "0")} · ${n}</button>`).join("")}</div>
        <div class="seg" role="group" aria-label="Look">${MODES.map(([m, l]) => `<button type="button" data-look="${m}" aria-pressed="${m === mode}">${l}</button>`).join("")}</div>
        <span class="mono r3d-hint">Drag to turn · scroll to zoom</span>
      </div>`;
    const stage = host.querySelector(".r3d-stage"), world = host.querySelector(".r3d-world");
    const s = { yaw: VIEWS[0][1], pitch: VIEWS[0][2], zoom: 1, ty: 0, tz: 0 };
    let target = { ...s }, raf = 0;
    const apply = () => { world.style.transform = `translate(-50%,-50%) translateZ(${-60}px) rotateX(${s.pitch}deg) rotateZ(${s.yaw}deg) scale3d(${s.zoom},${s.zoom},${s.zoom}) translateZ(${-Ht * k * 0.25}px)`; };
    const fit = () => { const w = stage.clientWidth; target.zoom = Math.max(0.42, Math.min(1.0, w / sc.fitW)); };
    function tick() {
      let moving = false;
      ["yaw", "pitch", "zoom"].forEach((p) => { const d = target[p] - s[p]; if (Math.abs(d) > 0.001) { s[p] += d * 0.14; moving = true; } else s[p] = target[p]; });
      apply(); raf = moving ? requestAnimationFrame(tick) : 0;
    }
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    let drag = null;
    stage.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, yaw: target.yaw, pitch: target.pitch }; stage.setPointerCapture(e.pointerId); stage.classList.add("is-drag"); });
    stage.addEventListener("pointermove", (e) => { if (!drag) return; target.yaw = drag.yaw + (e.clientX - drag.x) * 0.35; target.pitch = Math.max(5, Math.min(82, drag.pitch - (e.clientY - drag.y) * 0.25)); go(); });
    const up = () => { drag = null; stage.classList.remove("is-drag"); };
    stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
    stage.addEventListener("wheel", (e) => { e.preventDefault(); target.zoom = Math.max(0.35, Math.min(2.2, target.zoom * (e.deltaY > 0 ? 0.92 : 1.08))); go(); }, { passive: false });
    stage.addEventListener("keydown", (e) => { const m = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] }[e.key]; if (m) { target.yaw += m[0]; target.pitch = Math.max(5, Math.min(82, target.pitch + m[1])); go(); e.preventDefault(); } });
    host.querySelectorAll("[data-v]").forEach((b) => (b.onclick = () => { const [, y, p] = VIEWS[+b.dataset.v]; target.yaw = y; target.pitch = p; host.querySelectorAll("[data-v]").forEach((x) => x.setAttribute("aria-pressed", x === b)); go(); }));
    host.querySelector('[data-v="0"]').setAttribute("aria-pressed", "true");
    host.querySelectorAll("[data-look]").forEach((b) => (b.onclick = () => {
      mode = b.dataset.look; stage.dataset.mode = mode;
      host.querySelectorAll("[data-look]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      host.querySelector(".r3d-floor").innerHTML = floorSVG();
      host.querySelectorAll(".r3d-wall:not(.r3d-glass)").forEach((el, i) => (el.innerHTML = svgOf(walls[i])));
    }));
    fit(); Object.assign(s, target); apply();
    // living 3D: the lights come up when the room scrolls into view, and it turns slowly by itself until touched
    let auto = !matchMedia("(prefers-reduced-motion: reduce)").matches, seen = false, last = 0;
    const stop = () => { auto = false; };
    ["pointerdown", "wheel", "keydown"].forEach((ev) => stage.addEventListener(ev, stop, { passive: true }));
    host.querySelectorAll("[data-v]").forEach((b) => b.addEventListener("click", stop));
    new IntersectionObserver((es) => es.forEach((e) => { seen = e.isIntersecting; if (seen) stage.classList.add("lit"); }), { threshold: 0.25 }).observe(stage);
    const spin = (t) => { if (auto && seen && last) { target.yaw += (t - last) * 0.0045; go(); } last = t; if (auto) requestAnimationFrame(spin); };
    requestAnimationFrame(spin);
    addEventListener("resize", () => { fit(); go(); });
  }
  return { mount, SCENES };
})();
