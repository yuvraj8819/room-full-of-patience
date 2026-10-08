// The drawings. Views draw in feet in their own frame; sheets place views on an A3-proportioned page.
// Plan frame: x from the desk/entry wall (0) to the dressing-side wall (16); y from the bed wall (0) to the TV wall (13).
// Only the bed and bed wall are drawn as designs (confirmed). Everything else is an envelope marked "deciding".
window.DRAW = (function () {
  const { arc, rrect } = CAD;
  const H = Math.PI / 2;
  const ROW = (code, drawing, status) => [["PROJECT", "J.V. MANSION · BEDROOM"], ["DRAWING", drawing], ["SHEET", code], ["STATUS", status], ["DATE", "02 OCT 2026"], ["UNITS", "FT-IN · MM ON SWITCH"]];
  const CUTW = (B, V, x1, y1, x2, y2) => B.rect(V, x1, y1, x2, y2, "sh-line", "cut");

  // ───────── the plan ─────────
  function plan(B, V, o) {
    o = o || {};
    const xi = (y) => 16 - (0.25 * y) / 13; // dressing-side wall runs 3" out of square
    // floors
    if (o.floor) { B.ly = "furn"; B.rect(V, 0, 0, 16, 13, "sh-none", "flr"); B.rect(V, 16.75, 0, 24.25, 5.583, "sh-none", "flr"); B.rect(V, 15.25, -5.833, 24.25, -0.75, "sh-none", "flr"); B.ly = null; }
    // walls
    CUTW(B, V, -0.75, 3, 0, 13.75); CUTW(B, V, -0.75, 13, 13.333, 13.75); CUTW(B, V, 15.333, 13, 20.6, 13.75); CUTW(B, V, 24, 13, 25, 13.75);
    B.rect(V, 13.333, 13, 15.333, 13.75, "sh-fill"); B.line(V, 13.333, 13.375, 15.333, 13.375, "sh-line");
    B.rect(V, 20.6, 13, 24, 13.75, "sh-fill"); B.line(V, 20.6, 13.375, 24, 13.375, "sh-line");
    CUTW(B, V, -0.75, -0.75, 19.167, 0); CUTW(B, V, 21.667, -0.75, 25, 0);
    B.poly(V, [[16, 0], [16.75, 0], [16.75, 1.667], [xi(1.667), 1.667]], "sh-line", true, "cut");
    B.poly(V, [[xi(4.167), 4.167], [16.75, 4.167], [16.75, 13], [15.75, 13]], "sh-line", true, "cut");
    CUTW(B, V, 16.75, 5.583, 19.25, 6.333); CUTW(B, V, 21.75, 5.583, 24.25, 6.333);
    CUTW(B, V, 24.25, -6.583, 25, 13.75); CUTW(B, V, 14.5, -6.583, 15.25, -0.75); CUTW(B, V, 14.5, -6.583, 24.25, -5.833);
    // doors
    B.poly(V, arc(0, 0, 3, H, 0, 12), "sh-hid"); B.line(V, 0, 0, 3, 0, "sh-thick");
    // the way into the dressing is an open doorway: no door
    B.poly(V, arc(21.75, 6.333, 2.5, Math.PI, H, 12), "sh-hid"); B.line(V, 21.75, 6.333, 21.75, 8.833, "sh-thick");
    // bed wall veneer + R1'6" curve into the dressing doorway (confirmed)
    B.rect(V, 1.5, 0, 15, 0.1, "sh-line", "ven");
    B.poly(V, [[15, 0], [16, 0], [16, 1], ...arc(15, 1, 1, 0, -H, 10).slice(1)], "sh-line", true, "ven");
    // furniture
    B.ly = "furn";
    if (o.furn === false) { B.ly = null; }
    else {
    B.rect(V, 4.792, 0.2, 11.208, 1.0, "sh-fill", "bou", 0.05);
    [3.292, 11.208].forEach((a) => B.rect(V, a, 0.2, a + 1.5, 1.563, "sh-line", "ven"));
    B.rect(V, 4.792, 1.0, 11.208, 7.708, "sh-fill", "bou", 0.208); B.rect(V, 5, 1.0, 11, 7.5, "sh-line", null, 0.1);
    B.rect(V, 5.7, 1.2, 7.8, 2.2, "sh-soft", null, 0.2); B.rect(V, 8.2, 1.2, 10.3, 2.2, "sh-soft", null, 0.2);
    B.text(V, 8, 4.7, "BED", "t-room"); B.text(V, 8, 4.2, "confirmed", "t-sm");
    B.text(V, 4.25, 0.6, "NS", "t-sm"); B.text(V, 11.75, 0.6, "NS", "t-sm");
    B.rect(V, 0, 3.417, 2.667, 10.417, "sh-fill", null, 0.2); B.rect(V, 0.083, 3.5, 2.583, 10.333, "sh-line", "ven", 0.115); B.rect(V, -0.0, 3.5, 0.12, 10.334, "sh-line", "tau");
    B.line(V, 0.1, 4.917, 2.567, 4.917, "sh-hid"); B.line(V, 0.1, 8.917, 2.567, 8.917, "sh-hid"); B.text(V, 1.33, 6.9, "DESK · REV 21", "t-sm", "middle", -90);
    B.rect(V, 0, 10.417, 2.667, 13, "sh-line", "ven"); B.text(V, 1.33, 11.7, "SHELF", "t-sm");
    B.circle(V, 3.7, 6.917, 0.8, "sh-hid");
    B.rect(V, 3.667, 12.917, 13.333, 13, "sh-line", "marb"); B.poly(V, arc(3.667, 12, 1, H, Math.PI, 10), "sh-line"); B.poly(V, [[4.75, 13], ...arc(5.45, 12.45, 0.7, Math.PI, 1.5 * Math.PI, 8), ...arc(10.55, 12.45, 0.7, 1.5 * Math.PI, 2 * Math.PI, 8), [11.25, 13]], "sh-line", true, "ven"); B.text(V, 8, 12.3, "TV UNIT", "t-sm");
    B.rect(V, 22.25, 0, 24.25, 5.583, "sh-ward"); B.line(V, 22.25, 2.79, 24.25, 2.79, "sh-thin");
    extCupboards(B, V, {}); perfumePlan(B, V, {});
    B.poly(V, [[17, 5.15], [17.45, 5.45], [18.85, 5.45], [19.3, 5.15]], "sh-line");
    B.ly = null;
    }
    if (o.labels !== false) {
      B.text(V, 7.6, 10.2, "BEDROOM", "t-room"); B.text(V, 20.5, 3.2, "DRESSING", "t-room"); B.text(V, 19.75, -2.0, "EXTENSION", "t-room");
      B.text(V, 20.5, 10.1, "BATHROOM", "t-room"); B.text(V, 20.5, 9.5, "size from RCP · to confirm", "t-warn");
      B.text(V, 1.5, 1.3, "ENTRY", "t-sm"); B.text(V, 14.33, 14.1, "WINDOW", "t-sm");
    }
    if (o.lights) {
      B.ly = "lights";
      B.rect(V, 2.0, 2.6, 13.8, 11.5, "sh-cove", null, 1.2);
      const dl = [[4.3, 12.3], [5.0, 12.3], [10.8, 12.3], [11.5, 12.3], [5.65, 10.0], [6.37, 10.0], [9.46, 10.0], [10.16, 10.0], [7.76, 6.0], [8.45, 6.0], [9.15, 6.0], [6.37, 4.0], [10.16, 4.0], [14.5, 11.55], [14.5, 7.3], [14.5, 6.6], [14.5, 2.4], [14.5, 1.7], [1.26, 7.3], [1.26, 6.6], [1.26, 2.4], [1.26, 1.7], [18.0, 4.5], [21.1, 4.5], [18.0, 3.25], [21.1, 3.25]];
      dl.forEach(([x, y]) => { B.circle(V, x, y, 0.16, "sh-light"); B.line(V, x - 0.24, y, x + 0.24, y, "sh-thin"); B.line(V, x, y - 0.24, x, y + 0.24, "sh-thin"); });
      [4.042, 11.958].forEach((x) => { B.circle(V, x, 0.77, 0.32, "sh-light"); B.circle(V, x, 0.77, 0.12, "sh-light"); });
      B.text(V, 7.9, 11.0, "COVE (RCP-1)", "t-sm");
      B.ly = null;
    }
    if (o.dims) {
      B.ly = "sizes";
      B.dimH(V, 0, 15.75, 14.7); B.dimH(V, 16.75, 24.25, 14.7); B.dimV(V, 0, 13, -2.2); B.dimV(V, 0, 5.583, 26); B.dimV(V, 6.333, 13, 26, "≈{6.667}"); B.dimV(V, -5.833, -0.75, 26); B.dimH(V, 15.25, 24.25, -7.3);
      B.dimV(V, 0, 3, -1.3); B.dimV(V, 3.417, 10.417, -1.3); B.dimV(V, 10.417, 13, -1.3); B.dimH(V, 13.333, 15.333, 14.15); B.dimH(V, 0, 16, -1.5);
      B.ly = "clear";
      B.dimH(V, 0, 3.292, 0.55); B.dimH(V, 12.708, xi(0.55), 0.55); B.dimV(V, 7.708, 11.75, 12.2, "{4.042} to TV unit"); B.dimV(V, 0, 7.708, 12.2, "bed {7.708}");
      B.dimH(V, 2.667, 5, 6.0, "{2.333}"); B.rect(V, 2.667, 5.6, 5, 6.4, "sh-warn"); B.text(V, 3.83, 5.3, "TIGHT", "t-warn");
      B.ly = null;
    }
  }

  // ───────── the four walls, from inside the room ─────────
  // bed wall: e from the dressing side (0) to the desk side (16)
  const BVH = 7.667; // bed-wall veneer: 7'8", the top of the doorway's marble frame
  // nightstand front, a = left edge (owner, 10 Oct): a 2" Calacatta Viola slab underneath on a recessed black plinth;
  // the drawer box and its top all Dark Diva, two soft-edged handle-less drawers. No marble on top.
  function nightstand(B, V, a) {
    B.rect(V, a + 0.1, 0, a + 1.4, 0.2, "sh-dark");
    B.rect(V, a, 0.2, a + 1.5, 0.367, "sh-line", "marb", 0.012);
    B.rect(V, a, 0.367, a + 1.5, 1.667, "sh-line", "ven", 0.02);
    B.rect(V, a + 0.008, 0.38, a + 1.492, 0.995, "sh-line", "ven", 0.05); B.rect(V, a + 0.008, 1.035, a + 1.492, 1.655, "sh-line", "ven", 0.05);
  }
  function wallBed(B, V, o) {
    o = o || {};
    B.rect(V, 0, 0, 16, 10.5, "sh-none", "lime");
    const VH = BVH; // veneer height: level with the top of the doorway's marble frame (10 Oct)
    const ven = [[0, 0], [0, VH], ...arc(12.5, VH - 2, 2, H, 0, 12), [14.5, 0]];
    B.poly(V, ven, "sh-line", true, "ven");
    for (let e = 0.167; e < 3.5; e += 0.167) B.line(V, e, 0, e, VH, "sh-thin");
    for (let e = 12.667; e < 14.5; e += 0.167) B.line(V, e, 0, e, Math.min(VH, VH - 2 + Math.sqrt(Math.max(0, 4 - (e - 12.5) ** 2))), "sh-thin");
    [3.5, 5, 6.5, 8, 9.5, 11, 12.5].forEach((e) => B.line(V, e, 0, e, VH, "sh-line"));
    // the panel floats 1" off the wall; COB hidden behind its top edge and rounded corner throws a halo on the white wall
    B.poly(V, [[0, VH + 0.08], ...arc(12.5, VH - 2, 2.08, H, 0, 12), [14.58, 0.3]], "sh-cove"); B.paint(V, 0, VH, 14.5, Math.min(VH + 1.6, 10.2), "warm", 0.45);
    B.line(V, 0, 10.3, 16, 10.3, "sh-cove");
    if (o.bare) return; // the 3D room stands the furniture up as solids instead
    B.shadow(V, 4.9, 0.9, 11.1, 2.85, 0.4); B.shadow(V, 4.6, 0, 11.4, 0.5, 0.5, true); [3.292, 11.208].forEach((a) => B.shadow(V, a + 0.05, 0, a + 1.6, 1.75, 0.32));
    [4.042, 11.958].forEach((e) => { B.line(V, e, 10.5, e, 4.63, "sh-thin"); B.paint(V, e - 1.2, 2.2, e + 1.2, 5.0, "warm", 0.6); B.rect(V, e - 0.165, 3.67, e + 0.165, 4.57, "sh-light", null, 0.04); B.rect(V, e - 0.06, 4.57, e + 0.06, 4.63, "sh-dark"); });
    // headboard, bed, nightstands (envelopes)
    B.rect(V, 4.792, 1.15, 11.208, 3.25, "sh-line", "bou", 0.06);
    B.rect(V, 5.5, 0, 10.5, 0.15, "sh-line", "cut");
    B.rect(V, 5, 1.0, 11, 1.6, "sh-fill", null, 0.08);
    B.rect(V, 5.7, 1.6, 7.8, 2.3, "sh-fill", null, 0.25); B.rect(V, 8.2, 1.6, 10.3, 2.3, "sh-fill", null, 0.25);
    B.rect(V, 4.792, 0.15, 11.208, 1.15, "sh-line", "bou", 0.208);
    [3.292, 11.208].forEach((a) => nightstand(B, V, a));
    B.ambient(V, 0, 0, 16, 10.5);
    if (o.labels) {
      B.text(V, 0.75, 4.4, "CURVE R1'0\" TO MARBLE BORDER", "t-sm", "middle", -90);
      B.text(V, 4.04, 1.9, "NIGHTSTAND", "t-sm"); B.text(V, 11.96, 1.9, "NIGHTSTAND", "t-sm");
      B.key(V, 1.0, 9.3, "L1"); B.key(V, 2.6, 6.6, "V2"); B.key(V, 7.2, 6.1, "V1"); B.key(V, 8, 2.55, "F1"); B.key(V, 13.4, 4.37, "P1"); B.key(V, 14.3, 9.0, "LED");
    }
  }
  // TV wall: x from the desk wall (0) to the dressing-side wall (15.75)
  // TV wall: x from the desk wall (0) to the dressing-side wall (15.75).
  // Selected: a Viola band, 4 ft tall, curving forward into the shelf on R1 ft and running square to the window.
  // 55" Sony Bravia 8 (about 48.4 × 27.9 in) on the bed centreline; floating console 7 ft 0 in, centred.
  // o.niche: "A" (contrast strip with a lit niche) | "B" (twin lit niches) | undefined (band only)
  const TVW = 48.4 / 12, TVH = 27.9 / 12, TVZ = 2.84, BAND = [2.667, 2.167, 13.333, 6.167], CON = [4.5, 0.45, 11.5, 1.72], CAP = 0.75; // 10 Oct: 7 ft floating Dark Diva console, curved ends (R9"), fridge behind the middle front
  function wallTV(B, V, o) {
    o = o || {};
    B.rect(V, 0, 0, 15.75, 10.5, "sh-none", "lime");
    B.rect(V, 0, 0, 2.667, 9.5, "sh-line", "ven");
    B.rect(V, 0, 0, 2.667, 2.5, "sh-soft");
    B.rect(V, 13.333, 0.417, 15.333, 7, "sh-fill"); B.paint(V, 13.333, 0.417, 15.333, 7, "sky"); B.line(V, 14.333, 0.417, 14.333, 7, "sh-line");
    B.rect(V, BAND[0], BAND[1], BAND[2], BAND[3], "sh-line", "marb");
    for (let x = 2.72; x < 3.667; x += 0.12 + (x - 2.667) * 0.12) B.line(V, x, BAND[1], x, BAND[3], "sh-thin");
    B.line(V, 3.667, BAND[1], 3.667, BAND[3], "sh-hid");
    // halo: the panel stands 1" off the wall, COB hidden behind its edges (no visible strips)
    B.rect(V, BAND[0] + 0.1, BAND[1] - 0.08, BAND[2] + 0.08, BAND[3] + 0.08, "sh-cove"); B.paint(V, BAND[0], BAND[3], BAND[2], BAND[3] + 1.0, "warm", 0.35);
    B.shadow(V, 8 - TVW / 2 - 0.05, TVZ - 0.15, 8 + TVW / 2 + 0.1, TVZ + TVH - 0.05, 0.5);
    B.rect(V, 8 - TVW / 2, TVZ, 8 + TVW / 2, TVZ + TVH, "sh-dark", null, 0.02); B.paint(V, 8 - TVW / 2, TVZ, 8 + TVW / 2, TVZ + TVH, "glass");
    // skirting runs on behind the floating console
    B.rect(V, 2.667, 0, 15.75, 0.333, "sh-line", "flr");
    // the console: floating Dark Diva, ends curving back to the wall (R9"), thin top, handle-less fronts; the wider middle front hides a fridge
    B.shadow(V, CON[0] + 0.4, 0.05, CON[2] - 0.4, 0.4, 0.35, true);
    B.rect(V, CON[0], CON[1], CON[2], 1.62, "sh-line", "ven", 0.03);
    B.line(V, CON[0] + CAP, CON[1] + 0.04, CON[0] + CAP, 1.6, "sh-hid"); B.line(V, CON[2] - CAP, CON[1] + 0.04, CON[2] - CAP, 1.6, "sh-hid");
    B.rect(V, CON[0], 1.63, CON[2], CON[3], "sh-line", "ven", 0.02);
    [[CON[0] + CAP, 6.958], [6.958, 9.042], [9.042, CON[2] - CAP]].forEach(([a, b]) => { B.rect(V, a + 0.006, CON[1] + 0.05, b - 0.006, 1.56, "sh-line", "ven"); B.line(V, a + 0.006, 1.575, b - 0.006, 1.575, "sh-dark"); });
    B.rect(V, 7.028, CON[1] + 0.07, 8.972, 1.52, "sh-hid");
    // skirting, 4" floor marble; curtains at the window: taupe linen stacked either side, sheer between
    B.rect(V, 13.25, 0.05, 13.95, 9.96, "sh-line", "tau"); B.rect(V, 15.3, 0.05, 15.75, 9.96, "sh-line", "tau");
    for (let x = 13.95; x < 15.3; x += 0.21) B.line(V, x, 0.05, x, 9.96, "sh-thin");
    B.line(V, 13.2, 9.98, 15.75, 9.98, "sh-thick");
    B.line(V, 0, 10.3, 15.75, 10.3, "sh-cove");
    B.ambient(V, 0, 0, 15.75, 10.5);
    if (o.labels) {
      B.text(V, 8, 4.0, "55\" BRAVIA 8", "t-sm"); B.text(V, 1.33, 6, "SHELF", "t-sm"); B.text(V, 14.6, 8.6, "CURTAINS", "t-sm"); B.text(V, 3.17, 6.55, "CURVE R1'0\"", "t-sm"); B.text(V, 8, 1.0, "FRIDGE BEHIND", "t-sm"); B.text(V, 8, 2.45, "CALACATTA VIOLA PANEL", "t-sm");
      if (o.niche === "A") B.text(V, 11.67, 7.3, "A · CONTRAST STRIP", "t-sm");
      if (o.niche === "B") B.text(V, 8, 6.55, "B · TWIN NICHES", "t-sm");
    }
    if (o.dims) {
      B.dimH(V, BAND[0], BAND[2], -0.55, "BAND {10.667}"); B.dimH(V, CON[0], CON[2], -1.15, "CONSOLE {7}"); B.dimH(V, 8 - TVW / 2, 8 + TVW / 2, 5.5, "TV {4.033}");
      B.dimV(V, BAND[1], BAND[3], 13.75 - 0.25, "{4}"); B.dimV(V, 0, BAND[1], 13.75 - 0.25); B.dimV(V, 0, CON[1], 4.15, "{0.458}"); B.dimV(V, 0, CON[3], 3.45); B.dimV(V, 0, TVZ + TVH / 2, 12.35, "TV ¢ {4}");
      if (o.niche === "A") { B.dimH(V, 11.25, 12.083, 7.6, "{0.833}"); B.dimV(V, 3.4, 5.0, 12.4); }
      if (o.niche === "B") { B.dimH(V, 3.95, 4.783, 6.05, "{0.833}"); B.dimV(V, 2.6, 5.75, 3.6); }
    }
  }
  function tvPlan(B, V) {
    CUTW(B, V, -0.75, 13, 13.333, 13.75); CUTW(B, V, 15.333, 13, 16.5, 13.75); CUTW(B, V, -0.75, 9.5, 0, 13.75);
    B.rect(V, 13.333, 13, 15.333, 13.75, "sh-fill"); B.line(V, 13.333, 13.375, 15.333, 13.375, "sh-line");
    B.rect(V, 0, 10.417, 2.667, 13, "sh-line", "ven"); B.text(V, 1.33, 11.7, "SHELF", "t-sm");
    B.poly(V, [[13.333, 13], [3.667, 13], ...arc(3.667, 12, 1, H, Math.PI, 12), [2.667, 11.9], [2.583, 11.9], ...arc(3.667, 12, 1.083, Math.PI, H, 12), [13.333, 12.917]], "sh-line", true, "marb");
    B.poly(V, [[CON[0], 12.95], ...arc(CON[0] + CAP, 11.5 + CAP, CAP, Math.PI, 1.5 * Math.PI, 10), ...arc(CON[2] - CAP, 11.5 + CAP, CAP, 1.5 * Math.PI, 2 * Math.PI, 10), [CON[2], 12.95]], "sh-line", true, "ven"); B.rect(V, 7.028, 11.54, 8.972, 12.75, "sh-hid"); B.text(V, 8, 12.2, "FRIDGE", "t-sm");
    B.rect(V, 8 - TVW / 2, 12.75, 8 + TVW / 2, 12.9, "sh-dark");
    B.rect(V, 4.792, 6.708, 11.208, 7.708, "sh-hid"); B.text(V, 8, 7.1, "FOOT OF BED", "t-sm"); B.line(V, 8, 6.7, 8, 13.6, "sh-hid");
    B.text(V, 3.0, 11.3, "BAND CURVES INTO SHELF", "t-sm", "start");
    B.dimV(V, 7.708, 11.5, 12.2, "{3.792} CLEAR"); B.dimV(V, 11.5, 13, 12.2, "{1.5}"); B.dimH(V, 2.667, 3.667, 13.95, "R{1}");
  }
  function tvSection(B, V) {
    CUTW(B, V, -0.75, 0, 0, 7.5); B.line(V, -0.75, 0, 2.2, 0, "sh-thick");
    B.rect(V, 0.083, BAND[1], 0.183, BAND[3], "sh-line", "marb"); B.circle(V, 0.04, BAND[3] - 0.1, 0.03, "sh-light");
    B.rect(V, 0.25, TVZ, 0.39, TVZ + TVH, "sh-dark"); B.rect(V, 0.167, 3.7, 0.25, 4.3, "sh-line");
    B.rect(V, 0, CON[1], 1.45, 1.62, "sh-line", "cut", 0.02); B.rect(V, 0, 1.63, 1.47, CON[3], "sh-line", "ven"); B.rect(V, 0.03, 0.55, 1.4, 1.52, "sh-hid"); B.rect(V, 0, 1.1, 0.06, 1.3, "sh-metal");
    B.text(V, 0.72, 1.0, "FRIDGE", "t-sm"); B.text(V, 2.55, 0.15, "WALL-HUNG ON A STEEL RAIL", "t-sm", "start");
    B.text(V, 1.1, 5.4, "1\" OFF THE WALL · COB HALO", "t-sm", "start"); B.text(V, 1.1, 5.05, "CONDUIT BEHIND TV", "t-sm", "start");
    B.dimH(V, 0, 1.5, -0.55, "{1.5}"); B.dimV(V, 0, CON[1], 1.85, "{0.458}"); B.dimV(V, 0, CON[3], 2.25);
  }  // desk wall: d from the bed wall (0) to the TV wall (13)
  function wallDesk(B, V, o) {
    o = o || {};
    B.rect(V, 0, 0, 13, 10.5, "sh-none", "lime");
    B.rect(V, 0, 0, 3, 7, "sh-fill"); B.rect(V, 0.2, 0, 2.8, 6.85, "sh-line"); B.circle(V, 2.5, 3.5, 0.08, "sh-line");
    B.rect(V, 10.417, 0, 13, 9.5, "sh-line", "ven");
    // study wall (04 Oct): cozy gaming setup on white limewash, after the owner's reference
    B.rect(V, 3.7, 5.35, 6.7, 5.45, "sh-line", "ven"); B.rect(V, 6.3, 6.3, 9.4, 6.4, "sh-line", "ven");
    B.ellipse(V, 4.25, 5.95, 0.32, 0.17, "sh-light"); B.line(V, 4.25, 5.45, 4.25, 5.8, "sh-line");
    B.rect(V, 5.0, 5.45, 5.75, 5.7, "sh-dark"); B.circle(V, 6.2, 5.73, 0.23, "sh-light");
    B.rect(V, 6.55, 6.4, 7.35, 7.45, "sh-line"); B.rect(V, 7.5, 6.4, 8.3, 7.45, "sh-line"); B.line(V, 6.8, 6.7, 7.1, 7.15, "sh-thin"); B.line(V, 7.75, 6.7, 8.05, 7.15, "sh-thin");
    [[3.95, 5.45, 2.0], [9.15, 6.4, 2.6]].forEach(([d, z, l]) => { B.rect(V, d - 0.17, z, d + 0.17, z + 0.32, "sh-fill"); [-0.12, 0, 0.12].forEach((k, n) => B.poly(V, [[d + k, z + 0.1], [d + k * 1.6, z - l * (0.55 + 0.2 * n)]], "sh-thin")); });
    B.circle(V, 9.95, 7.6, 0.6, "sh-led"); B.circle(V, 9.95, 7.6, 0.55, "sh-line");
    B.rect(V, 4.7, 2.5, 9.1, 2.68, "sh-line", "ven"); B.rect(V, 5.55, 2.95, 8.25, 4.2, "sh-dark", null, 0.04); B.rect(V, 5.7, 4.22, 8.1, 4.3, "sh-dark"); B.rect(V, 6.8, 2.68, 7.0, 2.95, "sh-dark");
    B.rect(V, 9.0, 2.5, 9.8, 4.0, "sh-fill", null, 0.04); [2.85, 3.3, 3.75].forEach((z) => B.circle(V, 9.4, z, 0.17, "sh-led"));
    B.line(V, 0, 10.3, 13, 10.3, "sh-cove");
    if (!o.bare) { B.shadow(V, 3.45, 0, 10.45, 2.45, 0.4); deskFront(B, V, false); }
    B.ambient(V, 0, 0, 13, 10.5);
    if (o.labels) B.text(V, 6.9, 7.9, "COZY GAMING WALL", "t-sm");
    if (o.labels) { B.text(V, 1.5, 3.6, "ENTRY", "t-sm"); B.text(V, 6.9, 1.4, "DESK · REVISION 21", "t-sm"); B.text(V, 11.7, 5, "SHELF", "t-sm"); }
  }
  // the painting: 3'6" square landscape in a light-oak float frame, centred on the stretch beside the doorway, brass picture light above
  const PC = 4.083, PZ = 5.0, PS = 1.75;
  function painting(B, V, o) {
    B.shadow(V, PC - PS + 0.05, PZ - PS - 0.12, PC + PS + 0.1, PZ + PS - 0.05, 0.4);
    B.rect(V, PC - PS, PZ - PS, PC + PS, PZ + PS, "sh-fill"); B.paint(V, PC - PS, PZ - PS, PC + PS, PZ + PS, "oak");
    B.rect(V, PC - PS + 0.08, PZ - PS + 0.08, PC + PS - 0.08, PZ + PS - 0.08, "sh-soft"); B.paint(V, PC - PS + 0.08, PZ - PS + 0.08, PC + PS - 0.08, PZ + PS - 0.08, "art"); B.tex(V, PC - PS + 0.08, PZ - PS + 0.08, PC + PS - 0.08, PZ + PS - 0.08, "lm1", 0.8);
    if (B.mode !== "render") B.line(V, PC - PS + 0.08, PZ - 0.55, PC + PS - 0.08, PZ - 0.62, "sh-thin");
    B.paint(V, PC - PS - 0.2, PZ + 0.2, PC + PS + 0.2, PZ + PS + 0.5, "warm", 0.6);
    B.rect(V, PC - 0.14, PZ + PS + 0.25, PC + 0.14, PZ + PS + 0.6, "sh-metal"); B.rect(V, PC - 1.25, PZ + PS + 0.5, PC + 1.25, PZ + PS + 0.58, "sh-metal", null, 0.03);
    if (o && o.labels) B.text(V, PC, PZ - PS - 0.35, "PAINTING 3'6\" × 3'6\" · PICTURE LIGHT", "t-sm");
  }
  // dressing-side wall: u from the TV wall (0) to the bed wall (13)
  function wallDressing(B, V, o) {
    o = o || {};
    B.rect(V, 0, 0, 13, 10.5, "sh-none", "lime");
    [0.667, 0.45, 0.22].forEach((s, i) => B.rect(V, 8.833 - s, 0, 11.333 + s, 7 + s, "sh-line", i === 0 ? "flr" : null));
    B.paint(V, 8.833, 0, 11.333, 7, "deep"); B.shadow(V, 8.833, 6.4, 11.333, 7, 0.5);
    B.rect(V, 12, 0, 13, BVH, "sh-line", "ven");
    for (let u = 12.1; u < 13; u += 0.167) B.line(V, u, 0, u, BVH, "sh-thin");
    B.line(V, 0, 10.3, 13, 10.3, "sh-cove");
    painting(B, V, o);
    B.ambient(V, 0, 0, 13, 10.5);
    if (o.labels) { B.text(V, 10.08, 7.75, "STEPPED MARBLE FRAME", "t-sm"); B.text(V, 12.25, 8.4, "VENEER CURVE", "t-sm"); }
  }

  // ───────── bed: section + plan zone ─────────
  function bedSection(B, V) {
    CUTW(B, V, -0.75, 0, 0, 10.85); CUTW(B, V, -0.75, 10.5, 8.8, 10.85); B.line(V, -0.75, 0, 8.8, 0, "sh-thick");
    B.rect(V, 0, 10.05, 1.8, 10.5, "sh-soft"); B.line(V, 0.1, 10.15, 1.7, 10.15, "sh-led");
    B.rect(V, 0.083, 0, 0.183, BVH, "sh-line", "ven"); B.circle(V, 0.04, BVH - 0.12, 0.035, "sh-light"); B.line(V, 0.01, BVH + 0.1, 0.01, 9.6, "sh-cove"); B.text(V, 0.3, BVH + 0.45, "1\" GAP · COB HALO", "t-sm", "start");
    B.rect(V, 0.2, 1.15, 1.0, 3.25, "sh-line", "bou", 0.05);
    B.rect(V, 1.0, 0.7, 7.5, 0.85, "sh-line", "cut"); B.rect(V, 1.3, 0, 7.4, 0.15, "sh-line", "cut");
    B.rect(V, 1.02, 0.85, 7.48, 1.6, "sh-fill", null, 0.1); B.rect(V, 7.5, 0.15, 7.708, 1.15, "sh-line", "bou", 0.1); B.rect(V, 1.3, 1.6, 3.3, 2.3, "sh-fill", null, 0.25);
    B.rect(V, 0.2, 0, 1.563, 1.667, "sh-hid"); B.rect(V, 0.2, 0.2, 1.563, 0.367, "sh-line", "marb");
    B.text(V, 4.25, 1.2, "MATTRESS 6' × 6'6\"", "t-sm");
    B.dimH(V, 0, 1.0, -0.55); B.dimH(V, 1.0, 7.708, -0.55); B.dimH(V, 0, 7.708, -1.15, "{7.708} FROM WALL"); B.dimH(V, 7.5, 7.708, 1.9, "ROLL 2½\"");
    B.dimV(V, 0, 1.15, 8.55); B.dimV(V, 0, 1.6, 9.15); B.dimV(V, 0, 3.25, -1.25); B.dimV(V, 0, BVH, -1.9);
  }
  function bedPlan(B, V) {
    CUTW(B, V, -0.75, -0.75, 16.75, 0); CUTW(B, V, -0.75, 3, 0, 9.5); CUTW(B, V, 16, 0, 16.75, 1.667); CUTW(B, V, 16, 4.167, 16.75, 9.5);
    B.poly(V, arc(0, 0, 3, H, 0, 12), "sh-hid"); B.line(V, 0, 0, 3, 0, "sh-thick");
    B.rect(V, 1.5, 0, 15, 0.1, "sh-line", "ven");
    B.poly(V, [[15, 0], [16, 0], [16, 1], ...arc(15, 1, 1, 0, -H, 10).slice(1)], "sh-line", true, "ven");
    B.rect(V, 4.792, 0.2, 11.208, 1.0, "sh-fill", "bou", 0.05);
    [3.292, 11.208].forEach((a) => B.rect(V, a, 0.1, a + 1.5, 1.433, "sh-hid"));
    B.rect(V, 4.792, 1.0, 11.208, 7.708, "sh-fill", "bou", 0.208); B.rect(V, 5, 1.0, 11, 7.5, "sh-line", null, 0.1);
    B.rect(V, 5.7, 1.2, 7.8, 2.2, "sh-soft", null, 0.2); B.rect(V, 8.2, 1.2, 10.3, 2.2, "sh-soft", null, 0.2);
    B.text(V, 8, 5, "BED", "t-room"); B.text(V, 13.9, 2.05, "CURVE R1'0\" → MARBLE BORDER", "t-sm", "end");
    B.line(V, 8, -0.4, 8, 9.3, "sh-hid"); B.text(V, 8.2, 9.0, "A", "t-title", "start");
    B.dimH(V, 0, 3.292, 0.55); B.dimH(V, 12.708, 16, 0.55); B.dimH(V, 3.292, 4.792, 2.65); B.dimV(V, 0, 1.0, 13.9); B.dimV(V, 1.0, 7.708, 13.9); B.dimV(V, 0, 7.708, 15.0); B.dimH(V, 4.792, 11.208, 8.6); B.dimH(V, 5, 11, 7.9, "MATTRESS {6}");
  }

  // ───────── desk, Revision 21 (owner's set, under review) ─────────
  const D0 = 3.417, D1 = 10.417, PW = 1.5, BX = 2.667, ZT = 2.375, ZP = 0.262;
  const DRW = [[1.859, 2.335], [1.193, 1.849], [0.281, 1.183]];
  const sRib = (t) => Math.sin(Math.PI * t) * (1 - 0.35 * Math.cos(2 * Math.PI * t));
  function ribs(B, V, u0, z0, z1, amp, dir) { for (let k = 0; k < 5; k++) { const p = []; for (let i = 0; i <= 24; i++) { const t = i / 24; p.push([u0 + dir * (k * 0.036 + amp * sRib(t)), z0 + (z1 - z0) * t]); } B.poly(V, p, "sh-thin"); } }
  function deskFront(B, V, dims) {
    if (dims !== false) B.line(V, 2.6, 0, 11.2, 0, "sh-thick");
    B.rect(V, D0 + PW, ZP, D1 - PW, ZT, "sh-soft"); B.line(V, D0 + PW, ZT - 0.03, D1 - PW, ZT - 0.03, "sh-led");
    [D0, D1 - PW].forEach((a) => { B.rect(V, a + 0.08, 0, a + PW - 0.08, ZP, "sh-line", "cut"); B.rect(V, a, ZP, a + PW, ZT, "sh-line", "ven", 0.24); [1.183, 1.849].forEach((z) => B.line(V, a + 0.26, z + 0.006, a + PW - 0.26, z + 0.006, "sh-dark")); });
    B.rect(V, D0 + 0.083, ZT, D1 - 0.083, 2.5, "sh-line", "ven", 0.03);
    if (dims === false) return;
    B.key(V, 4.17, 1.52, "L2"); B.key(V, 3.62, 0.55, "V1"); B.key(V, 6.92, 2.44, "W1"); B.key(V, 6.92, 1.3, "L2");
    B.dimH(V, D0, D1, -0.55, "BODY {7}"); B.dimH(V, D0, D0 + PW, -1.15); B.dimH(V, D0 + PW, D1 - PW, -1.15, "KNEE {4} CLEAR"); B.dimH(V, D1 - PW, D1, -1.15); B.dimH(V, D0 + 0.083, D1 - 0.083, -1.75, "TOP {6.833}"); B.dimV(V, 0, 2.5, 2.9);
  }
  function deskRear(B, V) {
    B.line(V, -0.3, 0, 7.3, 0, "sh-thick");
    B.rect(V, 0, ZP, 7, ZT, "sh-line", "ven", 0.13); B.rect(V, 0.08, 0, 1.42, ZP, "sh-soft"); B.rect(V, 5.58, 0, 6.92, ZP, "sh-soft");
    B.rect(V, 1.5, ZP + 0.04, 5.5, ZT - 0.08, "sh-line", "ven");
    [[1.63, 0.45], [5.37, 0.45], [1.63, 2.15], [5.37, 2.15]].forEach(([u, z]) => { B.circle(V, u, z, 0.035, "sh-metal"); B.circle(V, u, z + 0.12, 0.03, "sh-light"); });
    B.text(V, 3.5, 1.3, "REMOVABLE BACK PANEL", "t-sm"); B.text(V, 3.5, 1.05, "magnets + 4 screws", "t-sm");
    B.rect(V, 0.083, ZT, 6.917, 2.5, "sh-line", "ven", 0.03);
    B.dimH(V, 0, 7, -0.55); B.dimH(V, 0, 1.5, -1.1); B.dimH(V, 1.5, 5.5, -1.1); B.dimH(V, 5.5, 7, -1.1);
  }
  function deskEnd(B, V) {
    B.line(V, -0.3, 0, 3.2, 0, "sh-thick"); CUTW(B, V, -0.4, 0, 0, 3.0);
    B.rect(V, 0.08, 0, 2.587, ZP, "sh-soft"); B.rect(V, 0, ZP, BX, ZT, "sh-line", "ven", 0.24);
    const LR = 0.24, LE = BX - LR; // leather: wall edge to where the front curve starts, foot to top
    B.poly(V, [[LE, ZP], [LR, ZP], ...arc(LR, ZP + LR, LR, -H, -Math.PI, 8), [0, ZT - LR], ...arc(LR, ZT - LR, LR, Math.PI, H, 8), [LE, ZT]], "sh-line", true, "tau");
    B.text(V, LE / 2, 1.42, "TAUPE LEATHER, FOOT TO TOP", "t-sm"); B.text(V, LE / 2, 1.18, "stops at the front curve", "t-sm"); B.text(V, LE + LR / 2, 2.6, "VENEER CURVE", "t-sm");
    B.rect(V, 0.083, ZT, BX - 0.083, 2.5, "sh-line", "ven", 0.03);
    B.dimH(V, 0, BX, -0.55); B.dimH(V, 0, BX - 0.24, -1.05, "LEATHER {2.427}"); B.dimV(V, 0, 2.5, 3.1);
  }
  function deskPlan(B, V) {
    CUTW(B, V, -0.4, -0.75, 13.4, 0); B.rect(V, 0, -0.75, 3, 0, "sh-fill");
    B.poly(V, arc(0, 0, 3, 0, H, 12), "sh-hid"); B.line(V, 0, 0, 0, 3, "sh-thick");
    B.rect(V, D0, 0, D1, BX, "sh-fill", null, 0.2); B.rect(V, D0 + 0.083, 0.083, D1 - 0.083, BX - 0.083, "sh-line", "ven", 0.115);
    B.line(V, D0 + PW, 0.1, D0 + PW, BX - 0.1, "sh-hid"); B.line(V, D1 - PW, 0.1, D1 - PW, BX - 0.1, "sh-hid");
    B.rect(V, 6.667, 0.167, 7.167, 0.375, "sh-dark", null, 0.03); B.rect(V, 6.69, 0.18, 7.144, 0.362, "sh-thin", null, 0.02); B.rect(V, D1, 0, 13, BX, "sh-line", "ven");
    B.rect(V, D0 - 0.03, 0, D0, BX - 0.24, "sh-line", "tau"); B.rect(V, D1 - 0.001, 0, D1 + 0.029, BX - 0.24, "sh-line", "tau"); B.text(V, 6.917, 0.6, "CABLE SLOT 6\" × 2½\"", "t-sm");
    B.circle(V, 6.917, 3.7, 0.85, "sh-hid"); B.text(V, 6.917, 3.6, "CHAIR", "t-sm");
    B.rect(V, 5, 5, 11, 5.6, "sh-hid"); B.text(V, 9.6, 5.25, "BED SIDE", "t-sm");
    B.dimH(V, D0, D1, -1.3); B.dimV(V, 0, BX, 2.6); B.dimV(V, BX, 5, 6.3, "{2.333} TO BED");
  }

  // desk details (08 Oct): cable slot in the top with a magnetic lid; removable back panel (magnets + 4 screws) with a cable opening; taupe leather sides
  function deskSlotPlan(B, V) { // plan of the back of the top around the slot; desk front at the top, wall at the bottom
    CUTW(B, V, 4.6, -0.4, 9.2, 0); B.rect(V, 4.6, 0, 9.2, 1.4, "sh-line", "ven");
    B.rect(V, 6.667, 0.167, 7.167, 0.375, "sh-dark", null, 0.03); B.rect(V, 6.69, 0.18, 7.144, 0.362, "sh-line", "ven", 0.02); B.rect(V, 6.877, 0.33, 6.957, 0.362, "sh-thin");
    B.text(V, 6.917, 0.85, "MAGNETIC LID, FLUSH, FINGER NOTCH", "t-sm"); B.text(V, 5.3, -0.25, "WALL", "t-sm");
    B.dimH(V, 6.667, 7.167, 0.6, "6\""); B.dimV(V, 0.167, 0.375, 7.5, "2½\""); B.dimV(V, 0, 0.167, 8.0, "2\"");
  }
  function deskSlotSection(B, V) { // section through the top and the slot, large scale
    B.rect(V, 0, 0, 0.167, 0.125, "sh-line", "cut"); B.rect(V, 0.375, 0, 1.2, 0.125, "sh-line", "cut");
    B.rect(V, 0.177, 0.085, 0.365, 0.125, "sh-line", "ven"); B.rect(V, 0.2, 0.06, 0.26, 0.085, "sh-metal"); B.rect(V, 0.28, 0.06, 0.34, 0.085, "sh-metal");
    B.rect(V, 0.167, 0.04, 0.195, 0.06, "sh-dark"); B.rect(V, 0.347, 0.04, 0.375, 0.06, "sh-dark");
    B.text(V, 0.27, 0.2, "LID ½\" VENEERED", "t-sm"); B.text(V, 0.6, -0.06, "MAGNETS ON STEEL LEDGES", "t-sm", "start"); B.text(V, 0.27, -0.08, "CABLES ↓", "t-sm");
    B.dimH(V, 0.167, 0.375, 0.3, "2½\""); B.dimV(V, 0, 0.125, 1.3, "1½\" TOP");
  }
  function deskBackPanel(B, V) { // the removable back panel seen from the wall side
    B.line(V, -0.3, 0, 4.3, 0, "sh-thick"); B.rect(V, 0, 0.3, 4.0, 2.3, "sh-line", "ven");
    [[0.13, 0.45], [3.87, 0.45], [0.13, 2.15], [3.87, 2.15]].forEach(([u, z]) => B.circle(V, u, z, 0.035, "sh-metal"));
    [[0.13, 1.3], [3.87, 1.3], [2.0, 2.15]].forEach(([u, z]) => B.rect(V, u - 0.06, z - 0.04, u + 0.06, z + 0.04, "sh-dark"));
    B.text(V, 2.0, 1.4, "REMOVABLE: LIFT OFF THE MAGNETS, 4 SCREWS FOR SAFETY", "t-sm"); B.text(V, 2.0, 0.85, "CABLES COME DOWN THROUGH THE TOP SLOT", "t-sm");
    B.dimH(V, 0, 4.0, -0.4); B.dimV(V, 0.3, 2.3, 4.3, "{2}");
  }

  // dressing: perfume & hair-dryer column on the right wall after entering (the bed-wall side, y = 0), x 16.75 → 19.083.
  // Floor to ceiling, one seamless Dark Diva skin, push-to-open; the open end curves R1'3" toward the extension opening.
  const PF0 = 16.75, PF1 = 19.083, PFD = 1.25, PCH = 10.5, PFZ = { plinth: 0.25, dryer: [2.9, 3.5], shelves: [3.5, 6.5], glass: [4.25, 5.0, 5.75] };
  function perfumePlan(B, V, o) {
    B.poly(V, [[PF0, 0], [PF1, 0], ...arc(PF1 - PFD, 0, PFD, 0, H, 12), [PF0, PFD]], "sh-line", true, "ven");
    if (o && o.labels) { B.poly(V, [[PF0 + 0.05, PFD - 0.1], [PF1 - PFD, PFD - 0.1], ...arc(PF1 - PFD, 0, PFD - 0.1, H, 0.15, 10)], "sh-hid"); B.text(V, PF0 + 0.95, 0.5, "PERFUME", "t-sm"); }
  }
  // front elevation, seen from the dressing: u from the curved end (0) to the doorway wall (2.333)
  function perfumeFront(B, V, o) {
    o = o || {};
    const W = PF1 - PF0, s = PFZ.shelves;
    B.shadow(V, 0.05, 0, W + 0.05, PCH, 0.35, true);
    B.rect(V, 0.1, 0, W, PFZ.plinth, "sh-dark");
    B.rect(V, 0, PFZ.plinth, W, PCH - 0.05, "sh-line", "ven");
    B.rect(V, 0.12, s[0], W - 0.12, s[1], "sh-soft"); B.paint(V, 0.12, s[0], W - 0.12, s[1], "warm", 0.8);
    PFZ.glass.forEach((z) => B.rect(V, 0.12, z - 0.02, W - 0.12, z + 0.02, "sh-thin"));
    B.line(V, 0.2, s[1] - 0.05, W - 0.2, s[1] - 0.05, "sh-led");
    [0.04, 0.17, 0.37, 0.63, 0.93].forEach((u) => { B.line(V, u, PFZ.plinth, u, s[0], "sh-thin"); B.line(V, u, s[1], u, PCH - 0.05, "sh-thin"); });
    B.line(V, 0.02, PFZ.dryer[0], W, PFZ.dryer[0], "sh-thin"); B.line(V, 0.02, PFZ.dryer[1], W, PFZ.dryer[1], "sh-thin");
    B.line(V, 1.25, PFZ.plinth, 1.25, PFZ.dryer[0], "sh-thin"); B.line(V, 0.02, 8.0, W, 8.0, "sh-thin"); B.line(V, 1.25, s[1], 1.25, PCH - 0.05, "sh-thin");
    if (o.labels) {
      B.text(V, W / 2, 4.6, "PERFUMES", "t-sm"); B.text(V, W / 2, 3.12, "HAIR DRYER", "t-sm"); B.text(V, W / 2, 1.5, "CLOSED", "t-sm"); B.text(V, W / 2, 7.2, "CLOSED", "t-sm"); B.text(V, W / 2, 9.2, "SPARE", "t-sm");
    }
    if (o.dims) {
      B.dimH(V, 0, W, -0.45, "{2.333}"); B.dimH(V, 0, 1.25, PCH + 0.35, "CURVE R{1.25}");
      B.dimV(V, 0, PFZ.dryer[0], -0.4); B.dimV(V, PFZ.dryer[0], PFZ.dryer[1], -0.4, "{0.6}"); B.dimV(V, s[0], s[1], -0.4, "LIT {3}"); B.dimV(V, 0, PCH, -1.0, "TO CEILING {10.5}");
    }
  }
  function perfumeSection(B, V) {
    const s = PFZ.shelves;
    CUTW(B, V, -0.3, 0, 0, PCH + 0.3); B.line(V, -0.3, 0, 2.6, 0, "sh-thick"); CUTW(B, V, -0.3, PCH, 2.2, PCH + 0.3);
    B.rect(V, 0, 0, PFD - 0.1, PFZ.plinth, "sh-dark");
    B.rect(V, 0, PFZ.plinth, 0.06, PCH, "sh-line", "cut"); B.rect(V, PFD - 0.06, PFZ.plinth, PFD, s[0], "sh-line", "cut"); B.rect(V, PFD - 0.06, s[1], PFD, PCH, "sh-line", "cut");
    [PFZ.dryer[0], s[0], s[1], 8.0].forEach((z) => B.rect(V, 0.06, z - 0.03, PFD - 0.06, z + 0.03, "sh-line", "cut"));
    PFZ.glass.forEach((z) => B.rect(V, 0.1, z - 0.02, PFD - 0.15, z + 0.02, "sh-line"));
    B.line(V, 0.12, s[1] - 0.06, PFD - 0.2, s[1] - 0.06, "sh-led");
    B.rect(V, 0.1, PFZ.dryer[0] + 0.05, PFD + 0.9, PFZ.dryer[1] - 0.05, "sh-hid"); B.rect(V, 0.08, 3.1, 0.18, 3.3, "sh-metal");
    B.text(V, 1.7, s[1] - 0.15, "3000K STRIP, HIDDEN", "t-sm", "start"); B.text(V, 1.7, 5.0, "GLASS SHELVES FOR PERFUMES", "t-sm", "start");
    B.text(V, 1.7, 3.35, "PULL-OUT: HAIR DRYER, SOCKET INSIDE", "t-sm", "start"); B.text(V, 1.7, 1.5, "PUSH-TO-OPEN DOORS", "t-sm", "start");
    B.dimH(V, 0, PFD, -0.45, "{1.25}");
  }
  // ── wardrobes (03 Oct), after the owner's corridor reference: Dark Diva veneer frames, warm off-white linen-texture
  // laminate panels split low, long round Dark Diva bar handles; recessed plinth, full height under a lit cove ──
  const WZ = { plinth: 0.25, top: 9.75, split: 3.5, ceil: 10.5, bar: [2.75, 7.5] };
  function shutter(B, V, u1, u2, hand) {
    const f = 0.167, z1 = WZ.plinth, z2 = WZ.top;
    B.rect(V, u1 + 0.005, z1, u2 - 0.005, z2, "sh-line", "ven");
    B.rect(V, u1 + f, WZ.split + f / 2, u2 - f, z2 - f, "sh-line", "lin"); B.rect(V, u1 + f, z1 + f, u2 - f, WZ.split - f / 2, "sh-line", "lin");
    if (hand) { const x = hand === "r" ? u2 - 0.13 : u1 + 0.05; B.shadow(V, x - 0.02, WZ.bar[0] - 0.05, x + 0.12, WZ.bar[1] - 0.05, 0.4); B.rect(V, x, WZ.bar[0], x + 0.08, WZ.bar[1], "sh-line", "ven", 0.04); }
  }
  const wardTop = (B, V, u1, u2) => { B.rect(V, u1, 0, u2, WZ.plinth, "sh-dark"); B.rect(V, u1, WZ.top, u2, WZ.ceil, "sh-soft"); B.line(V, u1 + 0.1, WZ.top + 0.12, u2 - 0.1, WZ.top + 0.12, "sh-cove"); };
  const cutCol = (B, V, u1, u2) => { B.rect(V, u1, 0, u2, WZ.top, "sh-line", "cut"); B.rect(V, u1, WZ.top, u2, WZ.ceil, "sh-soft"); };
  // the dressing's wardrobe on the far wall, seen from the dressing: u from the bath-wall end (0) to the extension end (5.583)
  function wardDress(B, V, o) {
    o = o || {};
    B.rect(V, -0.6, 0, 6.2, WZ.ceil, "sh-none", "lime");
    B.shadow(V, 0, 0, 5.583, WZ.top, 0.3, true);
    wardTop(B, V, 0, 5.583);
    const c9 = 900 / 304.8, c8 = 5.583 - c9; // 900 mm (bath end) + 800 mm, double doors each (09 Oct)
    shutter(B, V, 0, c9 / 2, "r"); shutter(B, V, c9 / 2, c9, "l"); shutter(B, V, c9, c9 + c8 / 2, "r"); shutter(B, V, c9 + c8 / 2, 5.583, "l");
    B.line(V, -0.6, 0, 6.2, 0, "sh-thick");
    B.ambient(V, -0.6, 0, 6.2, WZ.ceil);
    if (o.dims) { B.dimH(V, 0, 5.583, -0.5); B.dimH(V, 0, c9, -1.0, "900"); B.dimH(V, c9, 5.583, -1.0, "800"); B.dimV(V, 0, WZ.split, 6.6, "{3.5}"); B.dimV(V, 0, WZ.top, 7.2, "{9.75}"); B.dimV(V, WZ.bar[0], WZ.bar[1], 5.95, "BAR {4.75}"); }
  }
  // extension, section looking at the far wall: u from the right-hand wall (0) to the left-hand wall (9); u = 24.25 - x
  function wardExtFar(B, V, o) {
    o = o || {};
    B.rect(V, 0, 0, 9, WZ.ceil, "sh-none", "lime");
    cutCol(B, V, 0, 2); cutCol(B, V, 7, 9);
    wardTop(B, V, 2, 7);
    shutter(B, V, 2, 3.5, "l"); shutter(B, V, 3.5, 5.5, "r"); shutter(B, V, 5.5, 7, "r");
    B.line(V, -0.3, 0, 9.3, 0, "sh-thick"); B.ambient(V, 0, 0, 9, WZ.ceil);
    if (o.labels) { B.key(V, 2.75, 1.6, "3"); B.key(V, 4.5, 1.6, "1"); B.key(V, 6.25, 1.6, "2"); B.text(V, 1, 5, "4 (CUT)", "t-sm"); B.text(V, 8, 5, "5 (CUT)", "t-sm"); }
    if (o.dims) { B.dimH(V, 0, 9, -0.5); B.dimH(V, 2, 3.5, -1.0, "{1.5}"); B.dimH(V, 3.5, 5.5, -1.0, "{2}"); B.dimH(V, 5.5, 7, -1.0, "{1.5}"); }
  }
  // extension side walls, from the aisle: left wall u = y + 5.833 (far wall at 0); right wall u = -0.75 - y (opening at 0)
  function wardExtSide(B, V, o) {
    o = o || {};
    const left = o.side !== "right";
    B.rect(V, 0, 0, 5.083, WZ.ceil, "sh-none", "lime");
    if (left) { cutCol(B, V, 0, 2); wardTop(B, V, 2, 5.083); shutter(B, V, 2, 3.083, "r"); shutter(B, V, 3.083, 5.083, "l"); }
    else { cutCol(B, V, 3.083, 5.083); wardTop(B, V, 0, 3.083); shutter(B, V, 0, 2, "r"); shutter(B, V, 2, 3.083, "l"); }
    B.line(V, -0.3, 0, 5.383, 0, "sh-thick"); B.ambient(V, 0, 0, 5.083, WZ.ceil);
    if (o.labels) { if (left) { B.key(V, 2.54, 1.6, "2"); B.key(V, 4.08, 1.6, "5"); } else { B.key(V, 1, 1.6, "4"); B.key(V, 2.54, 1.6, "3"); } }
    if (o.dims) { if (left) { B.dimH(V, 2, 3.083, -0.5); B.dimH(V, 3.083, 5.083, -0.5); } else { B.dimH(V, 0, 2, -0.5); B.dimH(V, 2, 3.083, -0.5); } }
  }
  // detail: horizontal section through a shutter edge and its bar handle
  function wardDetail(B, V) {
    B.rect(V, 0, 0, 0.6, 0.072, "sh-line", "cut"); B.rect(V, 0.167, 0.072, 0.6, 0.086, "sh-line", "lin");
    B.rect(V, 0, 0.072, 0.167, 0.086, "sh-line", "ven");
    B.rect(V, 0.07, 0.086, 0.09, 0.2, "sh-line", "cut"); B.circle(V, 0.08, 0.252, 0.052, "sh-line", "ven");
    B.text(V, 0.45, 0.3, "LINEN-TEXTURE LAMINATE", "t-sm"); B.text(V, 0.3, -0.06, "SHUTTER, VENEERED BOTH FACES", "t-sm"); B.text(V, 0.08, 0.37, "BAR Ø1¼\"", "t-sm");
    B.dimH(V, 0, 0.167, -0.16, "FRAME 2\""); B.dimV(V, 0, 0.086, 0.7, "≈1\"");
  }
  // extension cupboards, after the owner's sketch (03 Oct): a U of 2 ft deep cupboards.
  // 5 and 4 are 2 ft wide on the side walls by the opening, doors into the aisle; 1 is 2 ft wide in the middle of the far wall;
  // 2 and 3 fill the corners as L-shaped cupboards.
  function extCupboards(B, V, o) {
    const L = 15.25, R = 24.25, BK = -5.833, TP = -0.75, C1 = [18.75, 20.75];
    B.rect(V, L, TP - 2, L + 2, TP, "sh-ward"); B.rect(V, R - 2, TP - 2, R, TP, "sh-ward"); B.rect(V, C1[0], BK, C1[1], BK + 2, "sh-ward");
    B.poly(V, [[L, BK], [C1[0], BK], [C1[0], BK + 2], [L + 2, BK + 2], [L + 2, TP - 2], [L, TP - 2]], "sh-ward", true);
    B.poly(V, [[C1[1], BK], [R, BK], [R, TP - 2], [R - 2, TP - 2], [R - 2, BK + 2], [C1[1], BK + 2]], "sh-ward", true);
    if (o.labels) {
      B.poly(V, arc(L + 2, TP, 2, -H, 0, 10), "sh-hid"); B.line(V, L + 2, TP, L + 4, TP - 0.02, "sh-hid");
      B.poly(V, arc(R - 2, TP, 2, 1.5 * Math.PI, Math.PI, 10), "sh-hid");
      B.poly(V, arc(C1[1], BK + 2, 2, Math.PI, H, 10), "sh-hid");
      // corners 2 and 3: a door on each open face, hinged away from the corner
      B.poly(V, arc(L + 2, BK + 2, 1.083, H, 0, 8), "sh-hid"); B.poly(V, arc(C1[0], BK + 2, 1.5, Math.PI, H, 8), "sh-hid");
      B.poly(V, arc(R - 2, BK + 2, 1.083, H, Math.PI, 8), "sh-hid"); B.poly(V, arc(C1[1], BK + 2, 1.5, 0, H, 8), "sh-hid");
    }
    const k = (x, y, s) => o.labels ? B.key(V, x, y, s) : B.text(V, x, y - 0.1, s, "t-sm");
    k(L + 1, TP - 1, "5"); k(R - 1, TP - 1, "4"); k((C1[0] + C1[1]) / 2, BK + 1, "1"); k(L + 1, BK + 1, "2"); k(R - 1, BK + 1, "3");
  }
  // ───────── dressing plan ─────────
  function dressingPlan(B, V) {
    const W = (a, b, c, d) => CUTW(B, V, a, b, c, d);
    W(16, 0, 16.75, 1.667); W(16, 4.167, 16.75, 5.583); W(16.75, 5.583, 19.25, 6.333); W(21.75, 5.583, 24.25, 6.333);
    W(15.25, -0.75, 19.167, 0); W(21.667, -0.75, 25, 0); W(24.25, -6.583, 25, 6.333); W(14.5, -6.583, 15.25, -0.75); W(14.5, -6.583, 24.25, -5.833);
    B.rect(V, 16.75, 0, 24.25, 5.583, "sh-none", "flr"); B.rect(V, 15.25, -5.833, 24.25, -0.75, "sh-none", "flr");
    // the way into the dressing is an open doorway: no door
    B.rect(V, 22.25, 0, 24.25, 5.583, "sh-ward"); B.line(V, 22.25, 2.79, 24.25, 2.79, "sh-thin");
    extCupboards(B, V, { labels: true }); perfumePlan(B, V, { labels: true });
    B.poly(V, [[17, 5.15], [17.45, 5.45], [18.85, 5.45], [19.3, 5.15]], "sh-line"); B.text(V, 18.15, 4.85, "TRIFOLD MIRROR", "t-sm");
    B.text(V, 20.4, 3.0, "DRESSING", "t-room"); B.text(V, 19.75, -2.1, "EXTENSION", "t-room"); B.text(V, 20.8, 6.95, "BATH →", "t-sm"); B.text(V, 15.9, 2.75, "FROM BEDROOM", "t-sm", "middle", -90);
    B.text(V, 23.25, 2.79, "WARDROBE", "t-sm", "middle", -90); 
    B.dimH(V, 16.75, 24.25, 7.5); B.dimV(V, 0, 5.583, 25.8); B.dimV(V, -5.833, -0.75, 25.8); B.dimH(V, 15.25, 24.25, -7.3); B.dimH(V, 17.25, 22.25, -3.3, "AISLE {5}"); B.dimV(V, -3.833, -0.75, 19.0, "{3.083}"); B.dimH(V, 18.75, 20.75, -6.25, "{2}"); B.dimV(V, -2.75, -0.75, 14.2, "{2}"); B.dimH(V, 15.25, 17.25, -0.45, "{2}");
  }

  // ───────── dressing doorway: stepped dark marble border (room side), plain lining (dressing side) ─────────
  // u across the wall with the opening at 0..2.5; the border is 8" wide on the wall face, in three steps.
  const STEPS = [[0.667, 0.0625], [0.45, 0.125], [0.22, 0.1875]]; // [offset from the opening, projection from the wall]
  function doorRoom(B, V, o) {
    o = o || {};
    B.rect(V, -1.6, 0, 4.1, 9.2, "sh-none", "lime");
    STEPS.forEach(([s], i) => B.rect(V, -s, 0.42, 2.5 + s, 7 + s, "sh-line", i === 0 ? "flr" : null)); B.rect(V, -0.687, 0, 0, 0.42, "sh-line", "flr"); B.rect(V, 2.5, 0, 3.187, 0.42, "sh-line", "flr");
    B.rect(V, 0, 0, 2.5, 7, "sh-dark");
    B.line(V, -2.2, 0, 4.7, 0, "sh-thick");
    if (o.dims === false) return;
    B.dimH(V, 0, 2.5, 3.5, "OPENING {2.5}"); B.dimH(V, -0.667, 0, 7.95, "{0.667}"); B.dimH(V, -0.667, 3.167, 8.55);
    B.dimV(V, 0, 7, 3.75); B.dimV(V, 7, 7.667, 3.75); B.key(V, -0.33, 4, "M3");
  }
  function doorDressing(B, V) {
    B.rect(V, -1.6, 0, 4.1, 9.2, "sh-none", "lime");
    B.rect(V, -0.25, 0, 2.75, 7.25, "sh-line", "flr"); B.rect(V, 0, 0, 2.5, 7, "sh-dark");
    B.line(V, -2.2, 0, 4.7, 0, "sh-thick");
    B.dimH(V, -0.25, 0, 7.8, "{0.25}"); B.dimH(V, 0, 2.5, 3.5, "OPENING {2.5}"); B.key(V, -0.12, 4, "M3");
  }
  function doorJamb(B, V) { // horizontal section through the left jamb; room at the bottom (y<0), dressing at the top
    CUTW(B, V, -1.5, 0, 0, 0.75);
    const p = [[0, 0], [0, -0.0625 - 0.06]];
    B.poly(V, [[-0.667, 0], [-0.667, -0.0625], [-0.45, -0.0625], [-0.45, -0.125], [-0.22, -0.125], [-0.22, -0.1875], [0.0625, -0.1875], [0.0625, 0.81], [-0.25, 0.81], [-0.25, 0.75], [0, 0.75], [0, 0]], "sh-line", true, "flr");
    void p;
    B.text(V, -0.9, -0.5, "BEDROOM", "t-room", "start"); B.text(V, -0.9, 1.2, "DRESSING", "t-room", "start"); B.text(V, 0.5, 0.35, "OPENING →", "t-sm", "start");
    B.dimH(V, -0.667, 0, -0.42, "{0.667}"); B.dimV(V, -0.1875, 0, -0.95, "{0.1875}"); B.dimV(V, 0, 0.75, 0.45, "WALL {0.75}");
  }
  function doorPlanCorner(B, V) { // where the bed-wall veneer curve meets the border
    CUTW(B, V, 13, -0.75, 16.75, 0); CUTW(B, V, 16, 1.667, 16.75, 3); CUTW(B, V, 16, 0, 16.75, 1.667);
    B.rect(V, 13, 0, 15, 0.1, "sh-line", "ven"); B.poly(V, [[15, 0], [16, 0], [16, 1], ...arc(15, 1, 1, 0, -H, 10).slice(1)], "sh-line", true, "ven");
    B.poly(V, [[16, 1.0], [15.9375, 1.0], [15.9375, 1.217], [15.875, 1.217], [15.875, 1.447], [15.8125, 1.447], [15.8125, 1.667], [16, 1.667]], "sh-line", true, "flr");
    B.text(V, 14.2, 1.6, "VENEER R1'0\"", "t-sm"); B.text(V, 14.6, 2.5, "MARBLE BORDER 8\"", "t-sm");
    B.dimV(V, 0, 1, 17.1, "{1}"); B.dimV(V, 1, 1.667, 17.1, "{0.667}"); B.dimV(V, 0, 1.667, 17.8, "{1.667} TO OPENING");
  }

  // ───────── bathroom: beige marble walls, three framed niches (approximate, from site) ─────────
  const NICHE = (B, V, x1, z1, x2, z2, open) => {
    const f = 0.167;
    if (open === "left") B.poly(V, [[x1, z1 - f], [x2 + f, z1 - f], [x2 + f, z2 + f], [x1, z2 + f]], "sh-line", true, "bge");
    else if (open === "right") B.poly(V, [[x2, z1 - f], [x1 - f, z1 - f], [x1 - f, z2 + f], [x2, z2 + f]], "sh-line", true, "bge");
    else B.rect(V, x1 - f, z1 - f, x2 + f, z2 + f, "sh-line", "bge", 0.06);
    B.rect(V, x1, z1, x2, z2, "sh-soft"); B.line(V, x1 + 0.08, z2 - 0.06, x2 - 0.08, z2 - 0.06, "sh-led");
  };
  function marbleCourses(B, V, L, Ht) { for (let z = 2; z < Ht; z += 2) B.line(V, 0, z, L, z, "sh-thin"); let r = 0; for (let z = 0; z < Ht; z += 2, r++) for (let x = (r % 2 ? 2 : 4); x < L; x += 4) B.line(V, x, z, x, Math.min(Ht, z + 2), "sh-thin"); }
  function bathLeft(B, V, o) {
    o = o || {};
    const L = 6.667, Ht = 8;
    B.rect(V, 0, 0, L, Ht, "sh-line", "bge"); marbleCourses(B, V, L, Ht);
    NICHE(B, V, 0.5, 3.5, 1.67, 5.0); NICHE(B, V, 2.17, 3.5, 3.33, 6.25); NICHE(B, V, 5.67, 3.5, L, 4.58, "right");
    B.line(V, -0.3, 0, L + 0.3, 0, "sh-thick");
    if (o.dims === false) return;
    B.text(V, 1.08, 4.25, "N1", "t-lbl"); B.text(V, 2.75, 4.85, "N2", "t-lbl"); B.text(V, 6.15, 4.0, "N3 →", "t-lbl");
    B.dimV(V, 0, 3.5, -0.5, "≈{3.5}"); B.dimV(V, 3.5, 5.0, -0.5); B.dimV(V, 3.5, 6.25, 3.85); B.dimH(V, 0.5, 1.67, 6.7); B.dimH(V, 2.17, 3.33, 6.7); B.dimH(V, 0, L, -0.55, "≈{6.667}");
    B.key(V, 4.6, 7.2, "M4");
  }
  function bathRight(B, V, o) {
    o = o || {};
    const L = 7.5, Ht = 8;
    B.rect(V, 0, 0, L, Ht, "sh-line", "bge"); marbleCourses(B, V, L, Ht);
    NICHE(B, V, 0, 3.5, 3.0, 4.58, "left");
    B.rect(V, 4.5, 5.0, 6.5, 7.0, "sh-fill"); B.line(V, 5.5, 5.0, 5.5, 7.0, "sh-hid");
    B.line(V, -0.3, 0, L + 0.3, 0, "sh-thick");
    if (o.dims === false) return;
    B.text(V, 1.5, 4.0, "← N3 CONTINUES", "t-lbl"); B.text(V, 5.5, 7.25, "WINDOW · SIZE TO CONFIRM", "t-sm");
    B.dimV(V, 0, 5.0, 6.9, "SILL {5}"); B.dimV(V, 3.5, 4.58, 3.4); B.dimH(V, 0, 3.0, 5.05, "≈{3}"); B.dimH(V, 0, L, -0.55, "≈{7.5}");
  }
  function nicheSection(B, V) { // vertical section through a niche
    CUTW(B, V, -0.5, 2.9, 0, 3.4); CUTW(B, V, -0.5, 4.58, 0, 5.2); CUTW(B, V, -0.5, 3.4, -0.333, 4.58);
    B.rect(V, 0, 3.333, 0.0625, 3.5, "sh-line", "bge"); B.rect(V, 0, 4.58, 0.0625, 4.75, "sh-line", "bge");
    B.poly(V, [[-0.333, 3.4], [0.0625, 3.42], [0.0625, 3.5], [-0.333, 3.5]], "sh-line", true, "bge");
    B.line(V, -0.3, 4.52, -0.05, 4.52, "sh-led");
    B.text(V, -0.17, 4.0, "NICHE", "t-sm", "middle", -90);
    B.dimH(V, -0.333, 0, 5.35, "DEPTH ≈{0.333}"); B.dimV(V, 3.5, 4.58, 0.45); B.text(V, 0.15, 3.1, "BULLNOSE FRAME 2\"", "t-sm", "start"); B.text(V, 0.15, 3.65, "SILL FALLS 1/4\" TO FRONT", "t-sm", "start");
  }

  // ───────── bathroom · final layout (03 Oct) ─────────
  // Plan frame: x from the left wall (0) to the right wall (7.5); y from the door wall (0) to the window wall (6.667).
  // Entering: the WC on the left, fixed glass, then the walk-in shower running to just short of the window;
  // the vanity on the right, tucked to the door. Door 2'6" at 2'6" from the left wall, opening in toward the WC.
  const BW = 7.5, BD = 6.667, BH = 8, GLASS = 3.583, GL = 2.5, GH = 6.5, SHW = 4.333, WCY = 1.5;
  // the vanity, from the owner's drawing (Rev A, 01.10.2026): 914 × 533, marble top 40 with a "B" edge at 838, 305 clear below
  const VTF = "dgm"; // Rev C (03 Oct): dark marble top and waterfall side, double bullnose edge
  const VW = 3.0, VD = 1.749, VZ = 1.0, VTOP = 2.749, VT = 0.131, VP = 0.066, VD1 = 0.584, VCAR = 1.621, VFR = 0.062;
  const N3P = [[0, 5.67 - 0.167], [-0.333, 5.67 - 0.167], [-0.333, BD + 0.333], [3.0, BD + 0.333], [3.0, BD]]; // the L niche, in plan

  function bathPlan(B, V, o) {
    o = o || {};
    if (!o.bare) {
      CUTW(B, V, -0.75, -0.75, 2.5, 0); CUTW(B, V, 5.0, -0.75, BW + 0.75, 0); CUTW(B, V, -0.75, 0, 0, BD + 0.75); CUTW(B, V, BW, 0, BW + 0.75, BD + 0.75);
      CUTW(B, V, 0, BD, 4.5, BD + 0.75); CUTW(B, V, 6.5, BD, BW, BD + 0.75);
      B.rect(V, 4.5, BD, 6.5, BD + 0.75, "sh-fill"); B.line(V, 4.5, BD + 0.375, 6.5, BD + 0.375, "sh-line");
    }
    B.rect(V, 0, 0, BW, BD, "sh-none", "bge");
    if (!o.bare) {
      // door opens in, toward the WC; the leaf parks 9" clear of the pan
      B.poly(V, arc(2.5, 0, 2.5, 0, H, 12), "sh-hid"); B.line(V, 2.5, 0, 2.5, 2.5, "sh-thick");
      // niches (above the cut, dashed): N1 and N2 over the WC; N3 an L round the shower corner
      [[0.5, 1.67], [2.17, 3.33]].forEach(([a, b]) => B.rect(V, -0.333, a, 0, b, "sh-hid"));
      B.poly(V, N3P, "sh-hid");
    }
    // WC, wall-hung
    B.rect(V, 0, WCY - 0.59, 0.42, WCY + 0.59, "sh-fill", null, 0.05);
    B.poly(V, [[0.42, WCY - 0.59], ...arc(1.18, WCY, 0.59, -H, H, 12), [0.42, WCY + 0.59]], "sh-fill", true);
    B.ellipse(V, 1.2, WCY, 0.42, 0.36, "sh-thin");
    // fixed glass, then the walk-in shower to just short of the window
    B.rect(V, 0, GLASS - 0.02, GL, GLASS + 0.02, "sh-dark");
    B.rect(V, 0.08, GLASS + 0.1, SHW, BD - 0.08, "sh-hid");
    B.rect(V, 0.3, BD - 0.32, SHW - 0.3, BD - 0.22, "sh-metal");
    B.circle(V, 0.35, 4.6, 0.18, "sh-line");
    // vanity, floating, tucked into the corner by the door
    B.rect(V, BW - VD, 0, BW, VW, "sh-line", VTF); B.rect(V, BW - VD + 0.3, 0.68, BW - VD + 1.38, 2.32, "sh-fill", null, 0.08);
    if (o.bare) return;
    B.text(V, -0.55, 1.08, "N1", "t-sm"); B.text(V, -0.55, 2.75, "N2", "t-sm"); B.text(V, -0.62, 6.0, "N3", "t-sm"); B.text(V, 1.5, BD + 0.55, "N3 · L NICHE CONTINUES 3'0\"", "t-sm");
    B.text(V, 2.25, 1.5, "WC · WALL-HUNG", "t-sm", "start");
    B.text(V, 1.25, GLASS - 0.3, "FIXED GLASS", "t-sm");
    B.text(V, 2.2, 5.3, "SHOWER · WALK-IN", "t-room"); B.text(V, 2.2, 4.9, "linear drain along the window wall", "t-sm");
    B.text(V, BW - 0.87, 1.5, "VANITY 3'0\" · FINAL", "t-sm", "middle", -90);
    B.text(V, 5.5, BD - 0.45, "WINDOW · SILL 5'0\"", "t-sm"); B.text(V, 3.75, -1.15, "FROM THE DRESSING", "t-sm");
    if (o.dims === false) return;
    B.dimH(V, 0, BW, BD + 1.3); B.dimH(V, 0, 2.5, -1.6); B.dimH(V, 2.5, 5.0, -1.6, "DOOR {2.5}"); B.dimH(V, 0, GL, GLASS + 0.55, "GLASS {2.5}");
    B.dimH(V, 0, SHW, BD - 0.75, "SHOWER {4.333}"); B.dimH(V, SHW, 4.5, BD - 1.2, "{0.167}"); B.dimH(V, BW - VD, BW, 3.45, "{1.75}");
    B.dimV(V, 0, BD, BW + 1.3); B.dimV(V, 0, GLASS, -1.3, "GLASS AT {3.583}"); B.dimV(V, GLASS, BD, -1.3, "SHOWER {3.083}"); B.dimV(V, 0, VW, BW - 2.15, "{3}"); B.dimV(V, 0, WCY, 3.4, "WC ¢ {1.5}");
  }

  function nicheL(B, V) {
    CUTW(B, V, -0.75, 4.6, 0, BD + 0.75); CUTW(B, V, 0, BD, 3.9, BD + 0.75);
    B.poly(V, N3P, "sh-line", true, "bge"); B.poly(V, [[0, 5.67], [-0.25, 5.67], [-0.25, BD + 0.25], [2.833, BD + 0.25], [2.833, BD], [0, BD]], "sh-soft", true);
    B.rect(V, 0, 4.6, 3.9, BD, "sh-none", "bge");
    B.text(V, 1.6, 5.7, "SHOWER", "t-sm");
    B.dimV(V, 5.67, BD, 0.5, "{1}"); B.dimH(V, 0, 3.0, BD + 1.0, "{3}"); B.dimH(V, -0.333, 0, 4.4, "≈4\"");
  }

  // ── the vanity · Rev C (03 Oct) ──
  // After the owner's reference: dark marble top running down the open side as a waterfall, fluted wood drawers,
  // a vessel sink standing on top of the marble (not carved in), a wall-mounted tap. Sizes as Rev A; double bullnose edge.
  const VS = 0.131, SINK = [0.68, 2.32], SY = [0.3, 1.38], SH = 0.42; // waterfall thickness; vessel span, depth, height
  const vessel = (B, V, a, b) => { B.shadow(V, a + 0.03, VTOP - 0.02, b + 0.06, VTOP + SH - 0.04, 0.35); B.rect(V, a, VTOP, b, VTOP + SH, "sh-fill", null, 0.06); B.line(V, a + 0.04, VTOP + SH - 0.04, b - 0.04, VTOP + SH - 0.04, "sh-thin"); };
  // front elevation; u0 is the open (left) end, the wall is at u0 + 3'0"
  function vanFront(B, V, u0, o) {
    o = o || {};
    const t = VTOP - VT, g = t - 0.06, d1 = g - 0.7;
    B.shadow(V, u0 + 0.05, VZ - 0.25, u0 + VW, VTOP - 0.05, 0.45); B.shadow(V, u0 + 0.4, 0, u0 + VW - 0.2, 0.3, 0.25, true);
    B.rect(V, u0 + VS, d1 + 0.01, u0 + VW, g, "sh-line", "flute"); B.rect(V, u0 + VS, VZ, u0 + VW, d1 - 0.01, "sh-line", "flute");
    B.rect(V, u0 + VS, g, u0 + VW, t, "sh-dark");
    B.rect(V, u0, VZ, u0 + VS, t, "sh-line", VTF);
    B.rect(V, u0, t, u0 + VW, VTOP, "sh-line", VTF, VT / 2);
    vessel(B, V, u0 + SINK[0], u0 + SINK[1]);
    B.rect(V, u0 + 1.46, VTOP, u0 + 1.54, VTOP + SH + 0.42, "sh-chrome", null, 0.02); B.rect(V, u0 + 1.54, VTOP + SH + 0.2, u0 + 1.72, VTOP + SH + 0.24, "sh-chrome");

    if (o.labels) { B.text(V, u0 + VW / 2, d1 + 0.3, "DRAWER 1 · FLUTED", "t-sm"); B.text(V, u0 + VW / 2, VZ + 0.3, "DRAWER 2 (BIG) · SECRET DRAWER INSIDE", "t-sm"); B.text(V, u0 + 1.5, VTOP + 0.18, "VESSEL SINK", "t-sm"); }
    if (!o.dims) return;
    B.dimH(V, u0, u0 + VW, VTOP + 1.1, "{3} OVERALL"); B.dimH(V, u0 + SINK[0], u0 + SINK[1], VZ - 0.35, "SINK 1'7¾\"");
    B.dimV(V, 0, VZ, u0 - 0.35, "{1} CLEAR"); B.dimV(V, VZ, t, u0 - 0.35, "1'7⅜\""); B.dimV(V, t, VTOP, u0 - 0.35, "1½\""); B.dimV(V, 0, VTOP, u0 - 0.85, "{2.749} TO TOP");
    B.dimV(V, VTOP, VTOP + SH, u0 + VW + 0.3, "5\""); B.dimV(V, 0, VTOP + SH, u0 + VW + 0.75, "RIM {3.167}");
  }
  // side elevation: the open side, all marble (waterfall); the wall at u0, the front at u0 + 1'9"
  function vanSide(B, V, u0, o) {
    o = o || {};
    const t = VTOP - VT;
    B.shadow(V, u0, VZ - 0.25, u0 + VD, VTOP - 0.05, 0.4);
    B.rect(V, u0, VZ, u0 + VD, t, "sh-line", VTF);
    B.rect(V, u0, t, u0 + VD, VTOP, "sh-line", VTF, VT / 2); B.line(V, u0 + 0.02, t, u0 + VD - 0.06, t, "sh-thin");
    vessel(B, V, u0 + SY[0], u0 + SY[1]);
    B.rect(V, u0 + 0.11, VTOP, u0 + 0.19, VTOP + SH + 0.42, "sh-chrome", null, 0.02); B.rect(V, u0 + 0.15, VTOP + SH + 0.38, u0 + 0.84, VTOP + SH + 0.42, "sh-chrome"); B.rect(V, u0 + 0.8, VTOP + SH + 0.28, u0 + 0.84, VTOP + SH + 0.42, "sh-chrome");
    if (o.labels) B.text(V, u0 + VD / 2, VZ + 0.8, "MARBLE WATERFALL SIDE", "t-sm");
    if (!o.dims) return;
    B.dimH(V, u0, u0 + VD, VZ - 0.35, "{1.749}"); B.dimV(V, VTOP, VTOP + SH + 0.42, u0 + 1.95, "FAUCET");
  }
  function vanSection(B, V) {
    const t = VTOP - VT, g = t - 0.06, d1 = g - 0.7;
    CUTW(B, V, -0.3, 0, 0, 3.6); B.line(V, -0.3, 0, 2.4, 0, "sh-thick");
    B.poly(V, [[0, VTOP], [VD - VT / 2, VTOP], ...arc(VD - VT / 2, t + VT / 2, VT / 2, H, -H, 12), [0, t]], "sh-line", true, "cut");
    B.poly(V, [[SY[0], VTOP], [SY[1], VTOP], [SY[1], VTOP + SH], [SY[1] - 0.05, VTOP + SH], [SY[1] - 0.05, VTOP + 0.06], [SY[0] + 0.05, VTOP + 0.06], [SY[0] + 0.05, VTOP + SH], [SY[0], VTOP + SH]], "sh-line", true, "cut");
    B.rect(V, 0.11, VTOP, 0.19, VTOP + SH + 0.42, "sh-chrome"); B.rect(V, 0.15, VTOP + SH + 0.38, 0.84, VTOP + SH + 0.42, "sh-chrome"); B.rect(V, 0.8, VTOP + SH + 0.28, 0.84, VTOP + SH + 0.42, "sh-chrome");
    B.poly(V, [[0.84, VTOP + 0.06], [0.84, g - 0.2], [0.5, g - 0.38], [0, g - 0.38]], "sh-hid");
    B.rect(V, 0.02, t - 0.35, 0.09, t - 0.06, "sh-metal");
    B.rect(V, 0, VZ, VCAR, VZ + 0.06, "sh-line", "cut");
    B.rect(V, VCAR, d1 + 0.01, VCAR + VFR, g, "sh-line", "flute"); B.rect(V, VCAR, VZ, VCAR + VFR, d1 - 0.01, "sh-line", "flute");
    B.poly(V, [[0.15, d1 + 0.06], [VCAR - 0.06, d1 + 0.06], [VCAR - 0.06, g - 0.05], [1.05, g - 0.05], [1.05, g - 0.45], [0.15, g - 0.45]], "sh-line", true);
    B.rect(V, 0.15, VZ + 0.1, VCAR - 0.06, VZ + 0.55, "sh-line");
    B.rect(V, 0.3, d1 - 0.36, VCAR - 0.2, d1 - 0.1, "sh-line"); B.rect(V, VCAR - 0.2, d1 - 0.38, VCAR - 0.15, d1 - 0.06, "sh-line");
    B.text(V, 2.0, VTOP + 0.2, "KOHLER SWEDA LIGHT VESSEL, WHITE, ON THE MARBLE", "t-sm", "start");
    B.text(V, 2.0, VTOP + 0.75, "KOHLER MODERN LIFE FAUCET, CHROME", "t-sm", "start");
    B.text(V, 2.0, VTOP - 0.08, "DARK MARBLE TOP · DOUBLE BULLNOSE", "t-sm", "start");
    B.text(V, 2.0, t - 0.25, "DRAWER 1 · NOTCHED ROUND THE TRAP", "t-sm", "start");
    B.text(V, 2.0, d1 - 0.22, "SECRET DRAWER · 75 BOX, FRONT 22 BEHIND D2", "t-sm", "start");
    B.text(V, 2.0, VZ + 0.3, "DRAWER 2 (BIG) · FLUTED DARK DIVA FRONTS", "t-sm", "start");
    B.dimH(V, 0, VD, -0.55, "{1.749}"); B.dimV(V, 0, VZ, 1.95); B.dimV(V, VZ, t, 1.95, "1'7⅜\""); B.dimV(V, VTOP, VTOP + SH, 1.75, "5\"");
  }
  function vanPlan(B, V) {
    CUTW(B, V, -0.3, VD, VW + 0.3, VD + 0.3); CUTW(B, V, VW, -0.3, VW + 0.3, VD);
    B.rect(V, 0, 0, VW, VD, "sh-line", VTF); B.rect(V, VS, VP, VW, VD, "sh-hid");
    B.rect(V, SINK[0], SY[0], SINK[1], SY[1], "sh-fill", null, 0.08); B.rect(V, SINK[0] + 0.05, SY[0] + 0.05, SINK[1] - 0.05, SY[1] - 0.05, "sh-thin", null, 0.06); B.circle(V, 1.5, 0.84, 0.05, "sh-line");
    B.circle(V, 1.5, VD - 0.15, 0.06, "sh-chrome"); B.rect(V, 1.48, 0.84, 1.52, VD - 0.15, "sh-chrome");
    B.text(V, VW / 2, SY[0] - 0.18, "KOHLER SWEDA LIGHT · WHITE", "t-sm"); B.text(V, 0.07, 0.9, "WATERFALL", "t-sm", "middle", -90);
    B.dimH(V, 0, VW, -0.5, "{3}"); B.dimV(V, 0, VD, -0.4, "{1.749}"); B.dimH(V, SINK[0], SINK[1], -0.95, "SINK 1'7¾\""); B.text(V, VW / 2, VD + 0.5, "RIGHT WALL OF THE BATHROOM", "t-sm");
  }  function vanEdge(B, V) { // double bullnose: the 40 built-up edge rounded in one full half-circle
    const s = 0.0656;
    B.poly(V, [[0, 2 * s], [0.2, 2 * s], ...arc(0.2, s, s, H, -H, 16), [0.08, 0], [0.08, s], [0, s]], "sh-line", true, "cut");
    B.line(V, 0.08, s, 0.2, s, "sh-hid");
    B.text(V, 0.1, 2 * s + 0.03, "20 SLAB", "t-sm"); B.text(V, 0.06, 0.02, "20 STRIP", "t-sm", "end");
    B.dimV(V, 0, 2 * s, 0.33, "1½\""); B.text(V, 0.3, s, "R20", "t-sm", "start"); B.text(V, 0.14, s + 0.012, "joint", "t-sm");
  }
  // ── the four bathroom walls, from inside ──
  // left wall: u from the door wall (0) to the window wall (6.667)
  function bathWallLeft(B, V, o) {
    o = o || {};
    bathLeft(B, V, { dims: false });
    B.shadow(V, WCY - 0.6, 0.85, WCY + 0.65, 1.4, 0.4);
    B.rect(V, WCY - 0.33, 2.7, WCY + 0.33, 3.12, "sh-metal", null, 0.03);
    B.rect(V, WCY - 0.59, 1.0, WCY + 0.59, 1.33, "sh-fill", null, 0.14); B.line(V, WCY - 0.57, 1.28, WCY + 0.57, 1.28, "sh-thin");
    B.rect(V, GLASS - 0.025, 0, GLASS + 0.025, GH, "sh-dark");
    B.circle(V, 4.6, 3.1, 0.13, "sh-metal"); B.rect(V, 4.57, 3.1, 4.63, 3.45, "sh-metal");
    B.rect(V, 4.57, 3.1, 4.63, 6.95, "sh-metal"); B.rect(V, 4.2, 6.9, 5.0, 6.98, "sh-metal");
    B.ambient(V, 0, 0, BD, BH);
    if (o.labels) { B.text(V, WCY, 0.6, "WC", "t-sm"); B.text(V, GLASS + 0.12, 2.0, "GLASS EDGE", "t-sm", "start", -90); B.text(V, 5.3, 2.4, "SHOWER", "t-sm"); B.text(V, 6.2, 5.2, "N3 → L", "t-sm"); }
    if (o.dims) { B.dimH(V, 0, BD, -0.55, "{6.667}"); B.dimH(V, 0, GLASS, -1.1, "GLASS AT {3.583}"); B.dimV(V, 0, GH, GLASS - 0.4, "GLASS {6.5}"); B.dimV(V, 0, 3.5, -0.5, "≈{3.5}"); B.dimV(V, 0, 1.33, WCY + 0.9, "SEAT 1'4\""); }
  }
  // window wall: u from the left wall (0) to the right wall (7.5)
  function bathWallWindow(B, V, o) {
    o = o || {};
    bathRight(B, V, { dims: false });
    B.paint(V, 4.5, 5.0, 6.5, 7.0, "sky");
    B.rect(V, 0.3, 0, SHW - 0.3, 0.05, "sh-metal");
    if (o.glass) { B.rect(V, 0, 0, GL, GH, "sh-line"); B.paint(V, 0, 0, GL, GH, "glass"); }
    B.ambient(V, 0, 0, BW, BH);
    if (o.labels) { B.text(V, 1.5, 4.0, "N3 · THE L NICHE CONTINUES", "t-sm"); B.text(V, 5.5, 7.3, "WINDOW · SILL 5'0\"", "t-sm"); B.text(V, 2.0, 0.25, "LINEAR DRAIN", "t-sm"); if (o.glass) B.text(V, 1.25, 6.2, "GLASS (IN FRONT)", "t-sm"); }
    if (o.dims) { B.dimH(V, 0, BW, -0.55, "{7.5}"); B.dimH(V, 0, SHW, -1.1, "SHOWER {4.333}"); B.dimV(V, 0, 5.0, 7.0, "SILL {5}"); B.dimV(V, 3.5, 4.58, 3.4); }
  }
  // right wall: u from the window wall (0) to the door wall (6.667); the vanity is tucked to the door end
  function bathWallRight(B, V, o) {
    o = o || {};
    B.rect(V, 0, 0, BD, BH, "sh-line", "bge"); marbleCourses(B, V, BD, BH);
    vanFront(B, V, BD - VW, {});
    B.line(V, -0.3, 0, BD + 0.3, 0, "sh-thick");
    B.ambient(V, 0, 0, BD, BH);
    if (o.labels) B.text(V, BD - VW / 2, VTOP + 0.35, "VANITY · FINAL", "t-sm");
    if (o.dims) { B.dimH(V, 0, BD - VW, -0.55); B.dimH(V, BD - VW, BD, -0.55, "VANITY {3}"); B.dimV(V, 0, VTOP, BD - VW - 0.5, "{2.749}"); }
  }
  // door wall: u from the right wall (0) to the left wall (7.5); the door opens in toward the WC
  function bathWallDoor(B, V, o) {
    o = o || {};
    B.rect(V, 0, 0, BW, BH, "sh-line", "bge"); marbleCourses(B, V, BW, BH);
    B.rect(V, 2.5, 0, 5.0, 7.0, "sh-line"); B.paint(V, 2.5, 0, 5.0, 7.0, "deep");
    B.rect(V, 2.3, 0, 2.5, 7.2, "sh-line"); B.rect(V, 5.0, 0, 5.2, 7.2, "sh-line"); B.rect(V, 2.3, 7.0, 5.2, 7.2, "sh-line");
    if (!o.bare) {
      B.rect(V, 4.98, 0.03, 5.13, 6.95, "sh-fill");
      vanSide(B, V, 0, {});
      B.rect(V, BW - 0.42, 0.95, BW, 1.38, "sh-fill", null, 0.04); B.rect(V, BW - 1.77, 1.0, BW - 0.42, 1.33, "sh-fill", null, 0.14);
    }
    B.line(V, -0.3, 0, BW + 0.3, 0, "sh-thick");
    B.ambient(V, 0, 0, BW, BH);
    if (o.labels) { B.text(V, 3.75, 3.5, "TO THE DRESSING", "t-sm"); B.text(V, 0.87, 3.2, "VANITY SIDE", "t-sm"); B.text(V, 6.6, 1.7, "WC", "t-sm"); B.text(V, 5.35, 4.5, "LEAF OPEN", "t-sm", "middle", -90); }
    if (o.dims) { B.dimH(V, 0, 2.5, -0.55); B.dimH(V, 2.5, 5.0, -0.55, "DOOR {2.5}"); B.dimH(V, 5.0, BW, -0.55); B.dimV(V, 0, 7.0, 3.75, "{7}"); }
  }
  // card pictures: the bed alone and the nightstand, front on
  function bedFront(B, V) {
    const o = 4.5, X = (x) => x - o;
    B.stadium(V, X(4.792), 1.15, X(11.208), 2.75, "sh-line", "bou"); B.line(V, X(5.05), 2.3, X(10.95), 2.3, "sh-thin");
    B.rect(V, X(5.5), 0, X(10.5), 0.15, "sh-line", "cut"); B.rect(V, X(5), 1.0, X(11), 1.6, "sh-fill", null, 0.08);
    B.rect(V, X(5.7), 1.6, X(7.8), 2.3, "sh-fill", null, 0.25); B.rect(V, X(8.2), 1.6, X(10.3), 2.3, "sh-fill", null, 0.25);
    B.rect(V, X(4.792), 0.15, X(11.208), 1.15, "sh-line", "bou", 0.208); B.line(V, 0, 0, 7, 0, "sh-thick");
  }
  function nsFront(B, V) {
    nightstand(B, V, 0.25); B.line(V, 0, 0, 2, 0, "sh-thick");
  }


  // ───────── sheets ─────────
  const W = 1400, Hh = 990;
  const sheets = {
    plan: { code: "RFP-01", title: "Suite plan", w: W, h: Hh, layers: [["sizes", "Room sizes"], ["furn", "Furniture"], ["clear", "Clearances"], ["lights", "Lights"]],
      build(B) {
        B.title(40, 44, "PLAN · BEDROOM, DRESSING, BATH", "bed wall at the bottom · dressing to the right · 1 grid = 1 ft");
        const V = B.view("Suite plan", 130, 690, 31);
        plan(B, V, { dims: true, lights: true, floor: true });
        B.block(1110, 90, 260, { keys: [["V1", "Dark Diva Crown veneer"], ["F1", "White bouclé"], ["W", "Wardrobes 2'0\" deep"]],
          notes: ["Sizes are the owner's hand measurements; the bath is scaled from RCP-1.", "Only the bed and bed wall are designed. Desk, shelf, TV unit and nightstands are drawn as envelopes.", "Lights are placed from RCP-1 (27-8-26).", "Desk front to bed side is only 2'4\": flagged."], rows: ROW("RFP-01", "SUITE PLAN", "SIZES FIXED") });
      } },
    walls: { code: "RFP-02", title: "Room elevations", w: W, h: Hh, mode: "render",
      build(B) {
        const k = 29, lab = B.mode !== "render";
        B.title(40, 44, "THE FOUR WALLS, FROM INSIDE", lab ? "the same views stand up in the 3D room" : "rendered from the drawings · true to scale");
        const frame = (V, L) => { CUTW(B, V, -0.35, 0, 0, 10.5); CUTW(B, V, L, 0, L + 0.35, 10.5); CUTW(B, V, -0.35, 10.5, L + 0.35, 10.8); B.line(V, -0.35, 0, L + 0.35, 0, "sh-thick"); };
        let V = B.view("Bed wall", 80, 420, k); B.text(V, 0, 11.6, "A · BED WALL (CONFIRMED)", "t-room", "start"); wallBed(B, V, {}); frame(V, 16); B.dimH(V, 0, 16, -0.6);
        V = B.view("TV wall", 614, 420, k); B.text(V, 0, 11.6, "B · TV WALL", "t-room", "start"); wallTV(B, V, { labels: lab }); frame(V, 15.75); B.dimH(V, 0, 15.75, -0.6);
        V = B.view("Desk wall", 80, 880, k); B.text(V, 0, 11.6, "C · DESK WALL", "t-room", "start"); wallDesk(B, V, { labels: lab }); frame(V, 13); B.dimH(V, 0, 13, -0.6);
        V = B.view("Dressing-side wall", 614, 880, k); B.text(V, 0, 11.6, "D · DRESSING-SIDE WALL", "t-room", "start"); wallDressing(B, V, { labels: lab }); frame(V, 13); B.dimH(V, 0, 13, -0.6);
        B.block(1150, 560, 220, { rows: ROW("RFP-02", "ROOM ELEVATIONS", "SHELL FIXED") });
      } },
    bedwall: { code: "RFP-10", title: "Bed & bed wall", w: W, h: Hh,
      build(B) {
        B.title(50, 44, "FRONT ELEVATION", "from the foot of the bed · dressing side left");
        let V = B.view("Bed wall elevation", 90, 470, 36);
        CUTW(B, V, -0.4, 0, 0, 10.5); CUTW(B, V, 16, 0, 16.4, 10.5); CUTW(B, V, -0.4, 10.5, 16.4, 10.85); B.line(V, -0.4, 0, 16.4, 0, "sh-thick");
        wallBed(B, V, { labels: true });
        B.dimH(V, 0, 16, 11.75); B.dimH(V, 0, 1, 11.15, "R{1}"); B.dimH(V, 1, 14.5, 11.15, "VENEER {13.5}"); B.dimH(V, 14.5, 16, 11.15);
        B.dimH(V, 0, 3.292, -0.55); B.dimH(V, 3.292, 4.792, -0.55); B.dimH(V, 4.792, 11.208, -0.55, "BED {6.417}"); B.dimH(V, 11.208, 12.708, -0.55); B.dimH(V, 12.708, 16, -0.55);
        B.dimV(V, 0, 10.5, -1.0); B.dimV(V, 0, BVH, 17.0, "VENEER {7.667}"); B.dimV(V, 0, 3.25, 13.1); B.dimV(V, 0, 1.667, 3.15); B.dimV(V, 1.667, 3.67, 11.15);
        B.title(790, 44, "SECTION A-A", "through the bed centreline");
        V = B.view("Section A-A", 830, 470, 36); bedSection(B, V);
        B.title(50, 590, "PLAN", "bed zone · dressing side right");
        V = B.view("Bed zone plan", 90, 940, 36); bedPlan(B, V);
        B.title(760, 590, "NIGHTSTAND", "Viola slab underneath · veneer above");
        V = B.view("Nightstand", 800, 890, 140); nightstand(B, V, 0); B.line(V, -0.2, 0, 1.7, 0, "sh-thick"); B.dimH(V, 0, 1.5, -0.35); B.dimV(V, 0, 1.667, 1.85); B.dimV(V, 0.2, 0.367, -0.25, "2\""); B.dimV(V, 0, 0.2, -0.25);
        B.text(V, 0.75, 0.28, "CALACATTA VIOLA SLAB", "t-sm"); B.text(V, 0.75, 1.75, "DARK DIVA", "t-sm");
        B.block(1150, 470, 220, { keys: [["V1", "Dark Diva Crown"], ["V2", "Same, 2\" flutes"], ["L1", "White limewash"], ["F1", "White bouclé"], ["P1", "Pendant (open)"], ["LED", "COB halo, 1\" gap behind the panel"], ["M1", "Calacatta Viola slab"]],
          notes: ["Veneer panel to 7'8\", level with the top of the doorway's marble frame (10 Oct), floating 1\" off the wall with COB hidden behind its edges (halo); flutes run round the R1'0\" curve to the doorway. Headboard: plain flat bouclé, 3'3\" high (09 Oct).", "Nightstands (10 Oct): a 2\" Calacatta Viola slab underneath on a recessed black plinth; the drawer box and its top in Dark Diva, two handle-less drawers.", "Mattress 6'0\" × 6'6\"; padded roll only 2½\" on the sides and foot, so the bed is 6'5\" × 6'8½\" outside."], rows: ROW("RFP-10", "BED + BED WALL", "FINAL") });
      } },
    desk: { code: "RFP-20", title: "Desk · Revision 21", w: W, h: Hh,
      build(B) {
        B.title(50, 44, "FRONT ELEVATION · SEATED SIDE", "rounded pedestals · handle-less drawers");
        let V = B.view("Desk front", 20, 400, 52); deskFront(B, V);
        B.title(660, 44, "REAR ELEVATION · WALL SIDE", "removable back panel between the pedestals");
        V = B.view("Desk rear", 690, 400, 52); deskRear(B, V);
        B.title(50, 560, "END ELEVATION", "door end · leather side");
        V = B.view("Desk end", 90, 860, 52); deskEnd(B, V);
        B.title(380, 560, "PLAN", "desk wall at the bottom");
        V = B.view("Desk plan", 300, 900, 40); deskPlan(B, V);
        B.block(1150, 520, 220, { notes: ["From the owner's Joinery Revision 21, updated to the decisions so far (10 Oct): rounded pedestals (R3\"), handle-less drawers, taupe leather on the outer sides, cable slot in the top, removable back panel.", "Lower body projects 1\" beyond an inset solid top on every side.", "Desk front to bed side 2'4\": tight; to decide."], rows: ROW("RFP-20", "DESK REV 21", "DECIDING") });
      } },
    dressing: { code: "RFP-30", title: "Dressing layout", w: W, h: Hh,
      build(B) {
        B.title(50, 44, "PLAN · DRESSING + EXTENSION", "from the owner's sketches · layout only");
        const V = B.view("Dressing plan", 80 - 14.5 * 46, 480, 46); dressingPlan(B, V);
        B.block(1100, 420, 260, { keys: [["W", "Cupboards 2'0\" deep"], ["1", "Extension cupboards 1-5 (owner's sketch)"]], notes: ["Sizes from the owner's sketches. The way in from the bedroom is an open doorway: no door.", "Extension: 5 and 4 are 2'0\" wide, doors into the aisle; 1 is 2'0\" wide on the far wall; 2 and 3 are L-shaped corner cupboards with a door on each open face.", "Aisle between 5 and 4 is 5'0\" wide, 3'1\" deep to cupboard 1."], rows: ROW("RFP-30", "DRESSING", "TO BRIEF") });
      } },
  };
  sheets.deskwall = { code: "RFP-21", title: "Study wall · cozy gaming setup", w: W, h: Hh,
    build(B) {
      B.title(50, 44, "ELEVATION · DESK WALL", "cozy gaming setup on white limewash · seen from the bed");
      let V = B.view("Desk wall elevation", 120, 470, 52);
      wallDesk(B, V, { labels: true });
      B.dimH(V, 3.7, 6.7, 5.0, "{3}"); B.dimH(V, 6.3, 9.4, 8.0, "{3.083}");
      B.dimV(V, 0, 5.35, 13.6, "{5.35}"); B.dimV(V, 0, 6.3, 14.2, "{6.3}"); B.dimV(V, 0, 2.5, 13.0, "DESK {2.5}");
      B.block(1150, 420, 220, { keys: [["V", "Dark Diva floating shelves"], ["L", "Warm lamps, 3000K"]], notes: ["After the owner's cozy-setup reference (04 Oct); replaces the fabric panel.", "Lower shelf: mushroom lamp, digital clock, moon lamp. Upper shelf: two prints, a figure.", "Trailing plants at both ends; round backlit clock by the shelf.", "Curved ultrawide on a Dark Diva riser with a light bar; white PC, warm fan glow. No RGB."], rows: ROW("RFP-21", "STUDY WALL", "SELECTED") });
    } };
  sheets.bathplan = { code: "RFP-41", title: "Bathroom · plan & walls", w: W, h: Hh,
    build(B) {
      B.title(40, 44, "PLAN · FINAL LAYOUT", "door wall at the bottom · window at the top");
      bathPlan(B, B.view("Bathroom plan", 110, 560, 50));
      const k = 30, row = 440;
      B.title(560, 44, "THE FOUR WALLS, FROM INSIDE", "same views stand up in the 3D bathroom");
      let V = B.view("Left wall", 580, 400, k); B.text(V, 0, 8.5, "A · LEFT · WC + SHOWER", "t-room", "start"); bathWallLeft(B, V, { labels: true }); B.dimH(V, 0, BD, -0.6);
      V = B.view("Window wall", 840, 400, k); B.text(V, 0, 8.5, "B · WINDOW · L NICHE", "t-room", "start"); bathWallWindow(B, V, { labels: true, glass: true }); B.dimH(V, 0, BW, -0.6);
      V = B.view("Right wall", 580, 400 + row, k); B.text(V, 0, 8.5, "C · RIGHT · VANITY", "t-room", "start"); bathWallRight(B, V, { labels: true }); B.dimH(V, 0, BD, -0.6);
      V = B.view("Door wall", 840, 400 + row, k); B.text(V, 0, 8.5, "D · DOOR WALL", "t-room", "start"); bathWallDoor(B, V, { labels: true }); B.dimH(V, 0, BW, -0.6);
      B.block(1150, 300, 220, { keys: [["WC", "Wall-hung WC"], ["G", "Fixed glass 2'6\""], ["V", "Vanity 3'0\" (RFP-42)"]], notes: ["Entering: WC on the left, the glass, then the walk-in shower to just short of the window; vanity on the right, tucked to the door.", "Door opens in, toward the WC.", "N3 is one L niche round the shower corner.", "Ceiling drawn at 8'0\": confirm."], rows: ROW("RFP-41", "BATHROOM LAYOUT", "FINAL") });
    } };
  sheets.vanity = { code: "RFP-42", title: "Bathroom vanity · 3 ft floating · Rev C", w: W, h: Hh,
    build(B) {
      B.title(50, 44, "FRONT ELEVATION · REV C", "fluted Dark Diva drawers · Kohler vessel sink · chrome faucet");
      vanFront(B, B.view("Vanity front", 120, 475, 95), 0, { labels: true, dims: true });
      B.title(600, 44, "SIDE ELEVATION", "the marble waterfall side, seen from the shower");
      vanSide(B, B.view("Vanity side", 620, 475, 95), 0, { labels: true, dims: true });
      B.title(50, 548, "SECTION A-A", "vessel sink, notched top drawer, secret drawer");
      vanSection(B, B.view("Vanity section", 120, 925, 95));
      B.title(900, 44, "DETAIL · DOUBLE BULLNOSE", "the 40 edge fully rounded · large scale");
      vanEdge(B, B.view("Edge B", 930, 330, 1300));
      B.title(720, 600, "PLAN", "back wall at the top");
      vanPlan(B, B.view("Vanity plan", 760, 880, 95));
      B.block(1150, 470, 220, { keys: [["T", "Dark marble, double bullnose"], ["F", "Fluted Dark Diva veneer fronts"]], notes: ["Rev C (03 Oct) on Rev A sizes: dark marble top and waterfall side, double bullnose, fluted Dark Diva drawers, Kohler Sweda Light white vessel, Kohler Modern Life chrome faucet. SELECTED.", "Floating, wall-hung on a steel rail; 1'0\" clear below.", "Secret drawer rides inside the big drawer, 22 mm behind its face.", "Top drawer is notched round the waste and trap."], rows: ROW("RFP-42", "VANITY", "FINAL") });
    } };
  sheets.shower = { code: "RFP-43", title: "Shower · glass & L niche", w: W, h: Hh,
    build(B) {
      B.title(40, 44, "PLAN", "fixed glass 3'7\" from the door wall · walk-in");
      bathPlan(B, B.view("Shower plan", 110, 560, 50));
      B.title(600, 44, "LEFT WALL", "glass edge, mixer, rain head, N3");
      bathWallLeft(B, B.view("Shower left wall", 640, 440, 44), { labels: true, dims: true });
      B.title(600, 512, "WINDOW WALL", "the L niche continues · glass in front");
      bathWallWindow(B, B.view("Shower window wall", 640, 900, 44), { labels: true, dims: true, glass: true });
      B.block(1150, 470, 220, { keys: [["G", "Fixed glass, 10 mm, 2'6\" × 6'6\""], ["D", "Linear drain"]], notes: ["Glass moved toward the WC to 3'7\", just clear of the tall niche N2's frame; shower now 3'1\" deep.", "Shower runs 4'4\" wide, stopping 2\" short of the window.", "Mixer and rain-head positions are indicative."], rows: ROW("RFP-43", "SHOWER", "FINAL") });
    } };  sheets.perfume = { code: "RFP-32", title: "Dressing · perfume & hair-dryer column", w: W, h: Hh,
    build(B) {
      B.title(50, 44, "PLAN", "right wall after entering · curves toward the extension");
      const Vp = B.view("Perfume plan", 80 - 16.0 * 110, 330, 110);
      CUTW(B, Vp, 16.0, -0.75, 19.167, 0); CUTW(B, Vp, 16.0, 0, 16.75, 1.6); B.rect(Vp, 16.75, 0, 19.9, 1.9, "sh-none", "flr");
      perfumePlan(B, Vp, { labels: true });
      B.text(Vp, 19.5, -0.35, "TO EXTENSION →", "t-sm"); B.text(Vp, 16.35, 1.75, "DOORWAY ↓", "t-sm");
      B.dimH(Vp, PF0, PF1, -1.15, "{2.333}"); B.dimV(Vp, 0, PFD, 19.55, "{1.25}"); B.dimH(Vp, PF1 - PFD, PF1, 1.65, "R{1.25}");
      B.title(520, 44, "FRONT ELEVATION", "seamless Dark Diva skin · lit perfume shelves");
      perfumeFront(B, B.view("Perfume front", 600, 900, 70), { labels: true, dims: true });
      B.title(820, 44, "SECTION", "glass shelves · hair-dryer pull-out");
      perfumeSection(B, B.view("Perfume section", 840, 900, 70));
      B.block(1160, 520, 210, { keys: [["V", "Dark Diva Crown veneer"], ["G", "Clear glass shelves"]], notes: ["Floor to ceiling: the dressing ceiling is 10'6\".", "Push-to-open, no handles; the curve is one continuous skin.", "Socket inside the pull-out for the hair dryer and tools."], rows: ROW("RFP-32", "PERFUME COLUMN", "SELECTED") });
    } };  sheets.wardrobe = { code: "RFP-33", title: "Wardrobes · Dark Diva & linen", w: W, h: Hh,
    build(B) {
      B.title(40, 44, "DRESSING · FAR-WALL WARDROBE", "seen from the dressing");
      wardDress(B, B.view("Dressing wardrobe", 70, 420, 32), { dims: true });
      B.title(370, 44, "EXTENSION · FAR WALL", "section through cupboards 4 and 5");
      wardExtFar(B, B.view("Extension far wall", 400, 420, 32), { labels: true, dims: true });
      B.title(40, 520, "EXTENSION · LEFT WALL", "cupboards 2 and 5");
      wardExtSide(B, B.view("Extension left wall", 70, 900, 32), { labels: true, dims: true });
      B.title(370, 520, "EXTENSION · RIGHT WALL", "cupboards 4 and 3");
      wardExtSide(B, B.view("Extension right wall", 400, 900, 32), { labels: true, dims: true, side: "right" });
      B.title(760, 520, "DETAIL · SHUTTER EDGE + BAR", "horizontal section · large scale");
      wardDetail(B, B.view("Shutter detail", 790, 760, 520));
      B.block(1150, 120, 220, { keys: [["V", "Dark Diva frames + bars"], ["L", "Linen-texture laminate"]], notes: ["After the owner's corridor reference.", "Panels: linen-texture laminate (wipeable) rather than real fabric.", "Shutters full height to 9'9\" over a 3\" recessed plinth, under a lit cove; ceiling 10'6\".", "Round bar handles 4'9\" long; corner cupboards 2 and 3 have a door on each open face."], rows: ROW("RFP-33", "WARDROBES", "SELECTED") });
    } };  sheets.deskcable = { code: "RFP-22", title: "Desk · leather sides & cable management", w: W, h: Hh,
    build(B) {
      B.title(50, 44, "PLAN · BACK OF THE TOP", "cable slot behind the monitor riser");
      deskSlotPlan(B, B.view("Slot plan", 60 - 4.6 * 110, 330, 110));
      B.title(600, 44, "SECTION · THROUGH THE SLOT", "magnetic lid · large scale");
      deskSlotSection(B, B.view("Slot section", 640, 330, 380));
      B.title(50, 520, "BACK PANEL · FROM THE WALL SIDE", "removable for cable work");
      deskBackPanel(B, B.view("Back panel", 90, 900, 110));
      B.title(640, 520, "END ELEVATION · DOOR END", "leather on the side, stopping at the front curve");
      deskEnd(B, B.view("Desk end, leather", 700, 900, 110));
      B.block(1150, 470, 220, { keys: [["L", "Taupe leather, outer sides"], ["M", "Magnets + 4 screws"]], notes: ["Top: 6\" × 2½\" cable slot, centred, 2\" from the back edge, under a flush magnetic Dark Diva lid with a finger notch.", "Back panel between the pedestals lifts off its magnets (4 screws hold it for good) for cable work; no hole in it: cables drop through the top slot (09 Oct).", "Taupe/greige leather on both outer sides only, from the foot to the top, stopping at the front edge where the curve begins; the curved corner and the handle-less drawer fronts stay Dark Diva (10 Oct)."], rows: ROW("RFP-22", "DESK DETAILS", "SELECTED") });
    } };
  sheets.doorway = { code: "RFP-31", title: "Dressing doorway · marble border", w: W, h: Hh,
    build(B) {
      B.title(50, 44, "ELEVATION · BEDROOM SIDE", "stepped dark gray marble border");
      doorRoom(B, B.view("Doorway, bedroom side", 140, 470, 46));
      B.title(470, 44, "ELEVATION · DRESSING SIDE", "plain lining");
      doorDressing(B, B.view("Doorway, dressing side", 560, 470, 46));
      B.title(50, 560, "SECTION · LEFT JAMB", "the three steps · scale large");
      doorJamb(B, B.view("Jamb section", 330, 760, 190));
      B.title(560, 560, "PLAN · MEETING THE BED WALL", "veneer curve stops at the border");
      doorPlanCorner(B, B.view("Corner plan", 560 - 13 * 120, 900, 120));
      B.block(1150, 470, 220, { keys: [["M3", "Dark gray marble, white veins"]], notes: ["Fitted on site; drawn clean from site photos. Border width (8\") is estimated: verify.", "Steps project about 3/4\" each from the wall.", "Opening starts 1'8\" from the bed wall; the bed-wall veneer curve (R1'0\") stops against the border; the rest of the wall is white."], rows: ROW("RFP-31", "DRESSING DOORWAY", "FITTED") });
    } };
  sheets.bath = { code: "RFP-40", title: "Bathroom · marble & niches", w: W, h: Hh,
    build(B) {
      B.title(50, 44, "LEFT WALL", "two niches + the corner niche");
      bathLeft(B, B.view("Bath left wall", 90, 450, 44));
      B.title(500, 44, "WINDOW WALL", "the L niche continues · window");
      bathRight(B, B.view("Bath right wall", 520, 450, 44));
      B.title(50, 560, "SECTION · THROUGH A NICHE", "framed with a bullnose marble border");
      nicheSection(B, B.view("Niche section", 200, 1210, 115));
      B.title(560, 575, "PLAN · THE L NICHE", "N3 turns the shower corner as one niche");
      nicheL(B, B.view("L niche plan", 640, 1010, 55));
      B.block(1150, 470, 220, { keys: [["M4", "Beige marble, polished"]], notes: ["Fitted on site; drawn clean from site photos, sizes approximate except the 3'6\" niche height and 5'0\" window sill.", "N3 is an L: one niche across the left and window walls, inside the shower.", "Wires are out in every niche for lighting."], rows: ROW("RFP-40", "BATHROOM NICHES", "FITTED · VERIFY") });
    } };
  sheets.tv = { code: "RFP-50", title: "TV wall · Calacatta Viola, 7 ft floating console", w: W, h: Hh,
    build(B) {
      B.title(50, 44, "ELEVATION · TV WALL", "plain Calacatta Viola panel · floating curved Dark Diva console");
      wallTV(B, B.view("TV wall", 60, 500, 38), { labels: true, dims: true });
      B.title(50, 590, "PLAN", "panel curves forward into the shelf");
      tvPlan(B, B.view("TV wall plan", 90, 1065, 30));
      B.title(720, 590, "SECTION", "through the TV and console");
      tvSection(B, B.view("TV section", 780, 950, 42));
      B.block(1150, 470, 220, { keys: [["M1", "Calacatta Viola"], ["V1", "Dark Diva console"], ["F", "Fridge behind the middle front"]], notes: ["Panel 4 ft tall, shelf to window, 1\" off the wall with COB hidden behind its edges (halo); no strips, no niche (09 Oct).", "55 in Sony Bravia 8 on the bed centreline, centre at 4 ft.", "Console 7 ft × 1 ft 6 in, floating 5½ in off the floor, all Dark Diva veneer like before: ends curving back to the wall on R9 in, a thin top, handle-less push-to-open fronts (10 Oct).", "The wider middle front (2 ft 1 in) is a compact drawer fridge, veneered like the rest: no glass, no handle, lit inside.", "Full-height curtains at the window on a recessed ceiling track."], rows: ROW("RFP-50", "TV WALL", "SELECTED") });
    } };
  const index = [
    { id: "plan", item: "Suite", status: "final" }, { id: "walls", item: "Room", status: "open" }, { id: "bedwall", item: "Bed & bed wall", status: "final" },
    { id: "desk", item: "Desk", status: "open" }, { id: "deskcable", item: "Desk details", status: "final" }, { id: "deskwall", item: "Study wall", status: "final" }, { id: "bathplan", item: "Bathroom layout", status: "final" }, { id: "vanity", item: "Vanity", status: "final" }, { id: "shower", item: "Shower", status: "final" }, { id: "dressing", item: "Dressing", status: "open" }, { id: "perfume", item: "Perfume column", status: "final" }, { id: "wardrobe", item: "Wardrobes", status: "final" },
    { id: "tv", item: "TV unit", status: "open" }, { id: "doorway", item: "Dressing doorway", status: "final" }, { id: "bath", item: "Bathroom niches", status: "final" },
  ];
  return { sheets, index, views: { plan, wallBed, wallTV, wallDesk, wallDressing, bathPlan, bathWallLeft, bathWallWindow, bathWallRight, bathWallDoor }, bath: { BW, BD, BH, GLASS, GL, GH }, thumbs: { wardrobe: [(B, V) => wardDress(B, { ...V, X: (v) => V.X(v + 0.6) }, {}), 6.8, 10.5], perfume: [(B, V) => perfumeFront(B, { ...V, X: (v) => V.X(v + 0.4) }, {}), 3.133, 10.6], ext: [(B, V) => extCupboards(B, { ...V, X: (v) => V.X(v - 15.25), Y: (h) => V.Y(h + 5.833) }, { labels: true }), 9, 5.083], desk: [(B, V) => { deskFront(B, { ...V, X: (v) => V.X(v - 3.1) }, false); B.line(V, 0, 0, 7.6, 0, "sh-thick"); }, 7.6, 4.4], dressing: [(B, V) => dressingPlan(B, { ...V, X: (v) => V.X(v - 14.2), Y: (h) => V.Y(h + 7.0) }), 11.4, 14.6], painting: [(B, V) => wallDressing(B, { ...V, X: (v) => V.X(v - 1.333) }, {}), 5.5, 8.2], vanity: [(B, V) => { vanFront(B, { ...V, X: (v) => V.X(v + 0.25) }, 0, {}); B.line(V, 0, 0, 3.5, 0, "sh-thick"); }, 3.5, 3.1], bathplan: [(B, V) => bathPlan(B, V, { bare: true }), 7.5, 6.667], shower: [(B, V) => bathWallLeft(B, { ...V, X: (v) => V.X(v - 3.4) }, {}), 3.267, 8], doorway: [(B) => doorRoom(B, B.view("t", 1.6 * 40, 9.2 * 40, 40), { dims: false }), 5.7, 9.2], bath: [(B, V) => bathLeft(B, V, { dims: false }), 6.667, 8], tvA: [(B, V) => wallTV(B, V, { niche: "A" }), 15.75, 10.5], bedwall: [(B, V) => wallBed(B, V, {}), 16, 10.5], deskwall: [(B, V) => wallDesk(B, V, {}), 13, 10.5], bed: [bedFront, 7, 3.0], ns: [nsFront, 2, 2.0] } };
})();
