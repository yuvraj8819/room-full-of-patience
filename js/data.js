// ─────────────────────────────────────────────────────────────────────────────
//  A ROOM FULL OF PATIENCE — the particulars of one long-awaited bedroom.
//  Every word on the site lives in this file. The pages only render it.
//
//  status:  "brief" = not briefed yet   "open" = deciding   "final" = decided
//  versions: one "selected", the rest "considered" (kept, with the date and why)
//  Dimensions are written in feet-inches; the drawings carry real sizes and
//  can be switched to millimetres.
// ─────────────────────────────────────────────────────────────────────────────

window.ROOM = {
  name: "A Room Full of Patience",
  tagline: "Seven years of it, and counting.",
  waitingSince: "2019-10-02",
  project: "J.V. Mansion · Bedroom suite",
  intro:
    "Seven years without a room of my own. Now there is one, and it is taking its sweet time. This is the book of it: every size, every material, every decision made and every one still being argued with, so anyone picking it up knows exactly what I want.",

  // ── the suite, as measured ──────────────────────────────────────────────────
  facts: [
    { k: "Bedroom", v: "15 ft 9 in at the window wall, 16 ft 0 in at the bed wall, 13 ft 0 in deep. The dressing-side wall runs about 3 in out of square." },
    { k: "Ceiling", v: "10 ft 6 in. Still to confirm whether that is the slab or the finished false ceiling under the cove." },
    { k: "Entry", v: "3 ft 0 in door at the bed-wall end of the left wall, hinged on the corner so it opens flat against the bed wall." },
    { k: "Window", v: "2 ft 0 in wide × 6 ft 7 in tall on the TV wall, set 5 in from the dressing-side wall." },
    { k: "To the dressing", v: "2 ft 6 in doorway in the dressing-side wall, starting 1 ft 8 in from the bed wall. Framed in a dark gray stepped marble border on the bedroom side, a plain marble lining on the dressing side." },
    { k: "Dressing", v: "7 ft 6 in × 5 ft 7 in, with a 9 ft 0 in × 5 ft 1 in extension beyond the bed-wall line (a wall was broken through: 47 in kept, 2 ft 6 in opening)." },
    { k: "Bathroom", v: "Off the dressing; its door is 2 ft 6 in from the dressing's left wall. About 7 ft 6 in × 6 ft 8 in scaled from the lighting plan. Window sill 5 ft 0 in above the floor. Beige marble walls with niches." },
    { k: "Study", v: "Desk along the left wall, starting 5 in past the entry door, 7 ft 0 in long; a tall 2 ft 7 in shelf fills the corner up to the TV wall." },
  ],

  // ── the fixed materials, and the ones still being chosen ───────────────────
  master: [
    { id: "floor", name: "Floor", value: "Taupe-gray marble, fine white veins", status: "final", finish: "Polished", swatch: "floor",
      options: ["Polished", "Honed"], rule: "Laid through the bedroom, dressing and extension. The one surface every other tone is judged against: warm gray, not brown, not cold.",
      refs: [{ src: "assets/refs/floor-marble-taupe-gray.jpg", caption: "The floor marble, as laid" }] },
    { id: "walls", name: "Walls & ceiling", value: "White", status: "final", finish: "Limewash or paint (deciding)", swatch: "white",
      options: ["White limewash", "White matt paint", "Veneer feature only"], rule: "Every wall and the ceiling are white. The only other wall finishes allowed are veneer or limewash. Pick a warm white with a hint of cream so the floor never looks dirty beside it.",
      refs: [] },
    { id: "veneer", name: "Veneer", value: "Dark Diva Crown · OHBF-607/66", status: "final", finish: "Polish level deciding", swatch: "veneer",
      options: ["Matt PU", "Satin PU", "Semi-gloss PU"], rule: "Warm reddish chocolate, crown cut. The one wood in the room: bed wall, shelf, desk body and any joinery that goes wood.",
      refs: [{ src: "assets/refs/veneer-dark-diva-crown-OHBF-607-66.jpg", caption: "Dark Diva Crown OHBF-607/66: the wet patch shows the polished colour" }] },
    { id: "fabric", name: "Bed fabric", value: "White bouclé", status: "final", finish: "Performance bouclé, warm white", swatch: "boucle",
      options: ["Bouclé", "Textured linen"], rule: "The bed and its back are wrapped in white bouclé. Warm white, never bright white, so it sits with the marble.",
      refs: [{ src: "assets/refs/bed-ref-curved-boucle.jpg", caption: "The bed reference" }] },
    { id: "doorstone", name: "Doorway border", value: "The floor marble (taupe-gray, white veins): one stone for the floor, doorway and skirting", status: "final", finish: "Polished", swatch: "doorstone",
      options: ["Stepped border, room side", "Plain lining, dressing side"], rule: "Already fitted. The heavy stepped border faces the bedroom; the dressing side gets a plain lining. Its dark gray sits between the taupe floor and the Dark Diva wood.", refs: [] },
    { id: "bathstone", name: "Bathroom marble", value: "Beige marble, light veining", status: "final", finish: "Polished", swatch: "bathstone",
      options: ["Polished"], rule: "Already fitted on the bathroom walls, with built-in niches framed in the same marble.", refs: [] },
    { id: "stone", name: "Statement stone", value: "Calacatta Viola · creamy white with plum-burgundy veins, as the owner's reference", status: "final", finish: "Polished", swatch: "viola",
      options: ["Viola marble", "Large porcelain slab, Viola look"], rule: "Considered for the TV wall. One patterned stone only, nowhere else competing with it.",
      refs: [{ src: "assets/refs/tv-ref-vertical-viola.jpg", caption: "Viola marble TV panel reference" }] },
    { id: "metal", name: "Metal", value: "Brushed bronze", status: "open", finish: "Brushed", swatch: "bronze",
      options: ["Brushed bronze", "Champagne", "None"], rule: "One metal for the whole room if any: handles, trims, pendant fittings.", refs: [] },
    { id: "leather", name: "Leather", value: "Ivory leather", status: "open", finish: "Furniture grade", swatch: "leather",
      options: ["Ivory leather", "Fabric wrap"], rule: "Considered for the desk drawer fronts and modesty face.", refs: [] },
  ],

  // ── colour ─────────────────────────────────────────────────────────────────
  colour: {
    intro: "The room runs on 60-30-10: sixty parts quiet background, thirty parts the materials you notice, ten parts accent. The background is already fixed, so every new choice has to earn its place in the thirty or the ten.",
    split: [
      { share: 60, name: "Background", v: "White walls and ceiling, the taupe-gray marble floor.", chips: ["white", "floor"] },
      { share: 30, name: "Materials", v: "Dark Diva Crown veneer and the white bouclé bed.", chips: ["veneer", "boucle"] },
      { share: 10, name: "Accent", v: "One statement stone, one metal, and a single warm accent in the soft furnishings.", chips: ["viola", "bronze", "cognac"] },
    ],
    palette: [
      { id: "white", name: "Warm white", hex: "#EFEAE2", role: "Walls, ceiling" },
      { id: "doorstone", name: "Dark gray marble", hex: "#5E5650", role: "Doorway border" },
      { id: "bathstone", name: "Beige marble", hex: "#D9C7AE", role: "Bathroom walls" },
      { id: "floor", name: "Taupe-gray marble", hex: "#8C8379", role: "Floor" },
      { id: "veneer", name: "Dark Diva Crown", hex: "#5B2F1D", role: "Wood" },
      { id: "boucle", name: "White bouclé", hex: "#EEE9E1", role: "Bed" },
      { id: "viola", name: "Viola red-brown", hex: "#7A3A2E", role: "Stone accent" },
      { id: "bronze", name: "Brushed bronze", hex: "#A9814F", role: "Metal" },
      { id: "cognac", name: "Cognac", hex: "#8A5134", role: "Cushions, throw" },
    ],
    paint: [
      { name: "Walls", value: "Warm white, matt", status: "open", note: "Exact shade from samples, tested beside a marble tile at night under 3000K." },
      { name: "Ceiling", value: "Same white, flat matt", status: "open", note: "Same colour as the walls so the cove reads as one soft glow." },
      { name: "Limewash", value: "White, textured", status: "open", note: "Only where nobody touches it; never tinted." },
    ],
  },

  // ── principles ─────────────────────────────────────────────────────────────
  principles: {
    intro: "The rules the room is designed by. Each one says where the room stands against it today.",
    groups: [
      { n: "01", name: "Light", line: "Warm, or everything else stops looking warm.", rules: [
        { t: "3000K everywhere", body: "Cove, focus lights, pendants and every hidden strip at 3000K, CRI 90+, all dimmable. With this many lights 3000K turns the limewash, the bouclé and the Viola yellow; 3000K stays warm but keeps the whites white. Cool light (4000K+) turns the veneer gray.", check: "Same brand and batch for every fitting, so the whites match." },
        { t: "Glow before glare", body: "Light the surfaces, not the eyes: cove, hidden LED along the veneer edge, pendants low and soft.", check: "Cove and veneer-edge LED are in; downlight count still to review." } ] },
      { n: "02", name: "Colour", line: "Sixty, thirty, ten, and no more.", rules: [
        { t: "One wood, one stone, one metal", body: "Dark Diva Crown is the only wood tone. One patterned stone. One metal finish.", check: "Wood fixed. Stone and metal still deciding." },
        { t: "White is warm", body: "Warm white with a hint of cream beside the taupe floor. Never blue-white.", check: "Shade not picked yet." } ] },
      { n: "03", name: "Alignment", line: "Everything hangs off the bed centreline.", rules: [
        { t: "One centreline", body: "Bed, headboard, TV and console share the bed centreline, 8 ft 0 in from the desk wall, which is also halfway between the shelf and the window.", check: "Bed confirmed on it. TV unit to follow." },
        { t: "Lines that carry across", body: "Shelf top at 9 ft 6 in, door heads at 7 ft 0 in, desk top at 2 ft 6 in: new pieces line up with these.", check: "Held in every drawing so far." } ] },
      { n: "04", name: "Movement", line: "A room you can walk through without turning sideways.", rules: [
        { t: "3 ft where you walk", body: "Main routes get 3 ft. 2 ft 6 in is the least anywhere.", check: "Nightstands to side walls 3 ft 3½ in. Bed foot to TV console 4 ft 0½ in. Desk front to bed side only 2 ft 4 in: flagged." } ] },
      { n: "05", name: "Sightlines", line: "What you see from the door sets the whole room.", rules: [
        { t: "Calm first", body: "From the entry, the eye lands on the bed wall and the desk end. Both need to be finished pieces, not backs or edges.", check: "Bed wall final. Desk end panel to be designed." } ] },
    ],
  },

  // ── lighting (from the designer's RCP-1, 27-8-26) ──────────────────────────
  lighting: {
    intro: "Taken from the interior designer's reflected ceiling plan (RCP-1, 27 Aug 2026). The plan places the lights; the temperatures and dimming are this book's rules.",
    zones: [
      { name: "Bedroom", status: "open", lights: [
        ["Cove", "Continuous LED in a rounded false-ceiling tray, about 11 ft 10 in × 8 ft 11 in, centred on the bed"],
        ["Downlights", "Pairs along the TV wall, inside the tray, and down both side walls"],
        ["Pendants", "Two slim pendants over the nightstands, bottom about 2 ft above the top"],
        ["Veneer halo", "3000K COB hidden behind the edges of the 7 ft 8 in veneer panel, 1 in off the wall"] ] },
      { name: "Study", status: "open", lights: [["Desk", "Wall downlight pair over the desk; LED under the top edge and behind the monitors"]] },
      { name: "Dressing", status: "open", lights: [["COB", "Four COB downlighters"], ["Wardrobes", "Sensor LED profiles inside (to brief)"]] },
      { name: "Bathroom", status: "brief", lights: [["All", "To brief"]] },
    ],
    rules: ["3000K throughout, CRI 90+ (R9 > 50). Never two temperatures in one view.", "Focus lights on dimmers, on 2-3 circuits (TV wall, side walls, cove); 36° beams.", "Every cove run dims together.", "Bedside switching for cove, downlights and pendants, two-way with the entry."],
  },

  // ── the four parts of the suite ────────────────────────────────────────────
  groups: [
    { id: "room", title: "The Room", kicker: "Bed wall · TV unit · nightstands", left: "Where the sleeping happens", right: "Seven years for a bed",
      intro: "The bedroom proper. One thing is decided beyond argument: the bed and the wall behind it. Everything facing it is still being thought about, at length, naturally.",
      items: [
        { id: "bed", name: "Bed", status: "final", line: "A low curved bed wrapped in white bouclé.",
          facts: [["6 ft × 6½ ft", "mattress"], ["2½ in", "slim side roll"], ["6 ft 5 in", "outside width"], ["7 ft 8½ in", "reach from the wall"]], mats: ["boucle"],
          img: null, thumb: "bed", drawings: ["bedwall"],
          parts: [
            { label: "What it is", value: "DECIDED: a low upholstered bed with a soft rounded frame, after the reference. The rolled side wings of the reference are not used." },
            { label: "Size", value: "DECIDED (03 Oct): mattress 6 ft 0 in × 6 ft 6 in. The bouclé roll around the sides and foot is only 2½ in thick, so the bed is 6 ft 5 in × 6 ft 8½ in outside, and reaches 7 ft 8½ in from the wall with the backrest." },
            { label: "Fabric", inherit: "fabric" },
            { label: "Clearances", value: "Nightstands flush beside it leave 3 ft 3½ in to each side wall; 4 ft 0½ in from the foot of the bed to the TV console." },
          ],
          versions: [
            { name: "Curved bouclé bed, flat backrest", state: "selected", date: "02 Oct 2026", note: "Owner confirmed. Rolled wings removed; nightstands sit flush to the wall." },
            { name: "Curved bed with rolled headboard ends", state: "considered", date: "02 Oct 2026", note: "Dropped: the rolled ends crowded the nightstands." },
          ],
          refs: [{ src: "assets/refs/render-bed.jpg", caption: "Render (09 Oct): flat bouclé headboard, floating veneer panel with its halo" }, { src: "assets/refs/bed-ref-curved-boucle.jpg", caption: "Reference: the bed form and bouclé" }],
          questions: [] },

        { id: "bed-back", name: "Bed back wall", status: "final", line: "Dark Diva Crown wall that curves round the corner to the marble doorway; the painting wall stays white.",
          facts: [["13 ft 6 + R1 ft", "veneer, flat + curve"], ["7 ft 8 in", "veneer height"], ["3 ft 3 in", "flat bouclé backrest"], ["1 in", "gap, COB halo"]], mats: ["veneer", "boucle", "white"],
          img: null, thumb: "bedwall", drawings: ["bedwall"],
          parts: [
            { label: "What it is", value: "DECIDED: Dark Diva Crown veneer across the bed wall to 7 ft 8 in, level with the top of the doorway's marble frame (owner, 10 Oct), white limewash above. On the dressing side the veneer curves round the corner on a 1 ft 0 in radius and stops against the dressing doorway's marble border (owner, 04 Oct); the rest of the painting wall is white. On the desk side it stops 1 ft 6 in short with a 2 ft 0 in rounded top corner." },
            { label: "Veneer", inherit: "veneer" },
            { label: "Flutes", value: "2 in flutes on the two outer zones: on the left they run on round the R1 ft curve to the doorway; on the right their tops follow the panel's rounded corner. Plain bookmatched leaves in the middle." },
            { label: "Headboard", value: "DECIDED (09 Oct): a plain, flat, rectangular white bouclé backrest as wide as the bed (6 ft 5 in), 6 in taller than before: top at 3 ft 3 in." },
            { label: "Nightstands", value: "Flush to the wall either side of the bed: Dark Diva drawer boxes on a Calacatta Viola slab. See Nightstands." },
            { label: "Light", value: "DECIDED (09 Oct): the veneer panel stands 1 in off the wall; a 3000K COB strip hidden behind its top edge and rounded corner throws a soft halo onto the white wall. No trough, no visible strip. Two opal pendants." },
          ],
          versions: [
            { name: "Full-height veneer, curve to the doorway border; painting wall white", state: "selected", date: "04 Oct 2026", note: "Owner: keep the R1 ft 0 in curve toward the marble; the rest of the painting wall white." },
            { name: "Full-height veneer to the corner, no curve", state: "considered", date: "04 Oct 2026", note: "Tried after the first render; the owner chose the curve again." },
            { name: "Veneer framed by limewash on both sides", state: "considered", date: "02 Oct 2026", note: "Replaced by the corner curve, after the reference." },
            { name: "Fabric panel floor to ceiling", state: "considered", date: "02 Oct 2026", note: "Explored, not taken." },
          ],
          refs: [{ src: "assets/refs/render-bed.jpg", caption: "Render (09 Oct): the panel 1 in off the wall, COB halo" }, { src: "assets/refs/render-bed-curve.jpg", caption: "Render (09 Oct): the flutes running round the curve to the doorway" }, { src: "assets/refs/render-entry.jpg", caption: "Render: from the entry, the painting wall all white" }, { src: "assets/refs/bed-wall-ref-veneer-curve.png", caption: "Reference: veneer wrapping the corner on a curve" }, { src: "assets/refs/bed-ref-flat-panel.jpg", caption: "Reference: flat upholstered back against wood" }],
          questions: [] },

        { id: "nightstands", name: "Nightstands", status: "final", line: "A Dark Diva drawer box standing on a Calacatta Viola slab, on a recessed black plinth.",
          facts: [["1 ft 6 in", "wide"], ["1 ft 4 in", "deep"], ["1 ft 8 in", "top height"], ["2", "drawers each"]], mats: ["viola", "veneer"],
          img: null, thumb: "ns", drawings: ["bedwall"],
          parts: [
            { label: "Position", value: "Flush to the veneer wall either side of the bed, 3 ft 3½ in from each side wall." },
            { label: "Design", value: "DECIDED (owner, 10 Oct): a 2 in Calacatta Viola slab underneath, the TV-wall stone, standing on a recessed black plinth. Above it the drawer box and its top are all Dark Diva veneer, with two soft-edged handle-less drawers. No marble on top." },
          ],
          versions: [
            { name: "Viola slab underneath, Dark Diva above", state: "selected", date: "10 Oct 2026", note: "Owner: the marble slab goes beneath the drawers, not on top." },
            { name: "A · Viola top + sides to the plinth", state: "considered", date: "10 Oct 2026", note: "Not taken." },
            { name: "B · Viola top slab only", state: "considered", date: "10 Oct 2026", note: "Not taken." },
            { name: "Two-drawer stand after the reference", state: "considered", date: "02 Oct 2026", note: "Developed into A and B." },
          ],
          refs: [{ src: "assets/refs/render-nightstand.jpg", caption: "Render (10 Oct): the Viola slab underneath, Dark Diva above" }, { src: "assets/refs/nightstand-ref.png", caption: "Owner's reference: two-drawer nightstand" }],
          questions: [] },

        { id: "tv-unit", name: "TV unit", status: "open", line: "A plain Calacatta Viola panel with a hidden halo, and a 7 ft floating curved Dark Diva console with a hidden fridge.",
          facts: [["55 in", "Sony Bravia 8"], ["10 ft 8 in", "band, shelf to window"], ["7 ft", "floating console"], ["8 ft 0 in", "bed centreline"]], mats: ["viola", "veneer"],
          img: null, thumb: "tvA", drawings: ["tv", "walls"],
          parts: [
            { label: "Panel", value: "SELECTED (09 Oct): a plain Calacatta Viola panel 4 ft 0 in tall (2 ft 2 in to 6 ft 2 in), shelf to window, two book-matched slabs, curving forward into the shelf on R1 ft 0 in. It stands 1 in off the wall with a 3000K COB hidden behind its edges: a halo, no strips." },
            { label: "TV", value: "55 in Sony Bravia 8 (about 48.4 × 27.9 in), on the bed centreline, centre 4 ft 0 in above the floor." },
            { label: "Console", value: "SELECTED (10 Oct): back to the floating curved console of the reference, now 7 ft 0 in long, 1 ft 6 in deep, top at 1 ft 8½ in, 5½ in off the floor, centred on the bed. All Dark Diva veneer, no marble: the ends curve back to the wall on R9 in, a thin top, three handle-less push-to-open fronts. 3 ft 9½ in clear to the foot of the bed." },
            { label: "Mini fridge", value: "SELECTED (10 Oct): the wider middle front (2 ft 1 in) pulls out as a compact drawer fridge, veneered like the others: no glass, no handle, lit inside." },
            { label: "Stone", inherit: "stone" },
            
            { label: "Curtains", value: "DECIDED (09 Oct): full-height curtains, ceiling to floor, on a recessed ceiling track: an ivory sheer drawn across the window, taupe linen drapes stacked either side." },
          ],
          versions: [
            { name: "Curved band, shelf to window", state: "selected", date: "03 Oct 2026", note: "Owner chose the band that curves into the shelf." },
            { name: "Floating curved Dark Diva console, 7 ft, hidden fridge", state: "selected", date: "10 Oct 2026", note: "Owner: remove the marble from the console, make it curved like before, same veneer, no brass handle." },
            { name: "Plain Calacatta Viola, halo; 7 ft console with Viola top and ends on a plinth", state: "considered", date: "09 Oct 2026", note: "Owner: no strip, no niche. The Viola console was replaced on 10 Oct." },
            { name: "Niche A · contrast strip with a lit niche", state: "considered", date: "03 Oct 2026", note: "Owner chose A. A 10 in strip of dark contrast marble, floor-console to 7 ft, with a 10 × 19 in lit niche at TV height, between the TV and the window. Balances the heavy shelf on the other side." },
            { name: "Niche B · twin lit niches", state: "considered", date: "03 Oct 2026", note: "Two 10 in lit niches cut into the band either side of the TV, lined in contrast marble, two glass shelves each. Symmetrical and calm." },
            { name: "Vertical Viola panel", state: "considered", date: "02 Oct 2026", note: "Dropped for the curved band." },
          ],
          refs: [{ src: "assets/refs/render-tv.jpg", caption: "Render (10 Oct): plain Viola with a halo, the floating curved console, curtains" }, { src: "assets/refs/render-tv-console.jpg", caption: "Render (10 Oct): the fridge drawer pulled out" }, 
            { src: "assets/refs/tv-ref-curved-band-shelf.png", caption: "Reference: stone band curving into the shelving" },
            { src: "assets/refs/tv-ref-contrast-strip-niche.webp", caption: "Reference: contrast marble strip with a lit niche (option A)" },
            { src: "assets/refs/tv-ref-floating-console.jpg", caption: "Reference: floating console" },
          ],
          questions: ["Which contrast marble for the strip?", "Roller blind instead of a curtain at the window?"] },
        { id: "painting", name: "Painting & picture light", status: "final", line: "A soft landscape, 3 ft 6 in square, on the dressing-side wall with a brass picture light.",
          facts: [["3 ft 6 in", "square"], ["5 ft 0 in", "centre height"], ["Light oak", "float frame"], ["2 ft 6 in", "brass picture light"]], mats: [],
          img: null, thumb: "painting", drawings: ["walls"],
          parts: [
            { label: "Where", value: "The room's right wall (dressing side), centred on the plain stretch between the TV wall and the marble doorway." },
            { label: "Painting", value: "Misty landscape in creams, greys and earth browns, 3 ft 6 in × 3 ft 6 in, in a thin light-oak float frame." },
            { label: "Light", value: "Brass picture light, 2 ft 6 in bar, 3000K, above the frame." },
          ],
          versions: [{ name: "3 ft 6 in square landscape with a brass picture light", state: "selected", date: "03 Oct 2026", note: "Owner's choice." }],
          refs: [{ src: "assets/refs/render-painting.jpg", caption: "Render (09 Oct): under the picture light, the doorway in the floor marble" }, { src: "assets/refs/painting-ref.png", caption: "Reference: the painting and its light" }], questions: [] },        { id: "pendants", name: "Pendants", status: "final", line: "Slim opal-glass tubes on fine black cables, one over each nightstand.",
          facts: [["2", "pendants"], ["~4 × 11 in", "opal glass tube"], ["2 ft", "above the nightstands"], ["3000K", "warm, dimmable"]], mats: [],
          img: null, thumb: null, drawings: ["bedwall"],
          parts: [
            { label: "What it is", value: "SELECTED (04 Oct), from the owner's reference: a slim cylinder of opal (frosted white) glass, about 4 in across and 11 in tall, glowing softly all round." },
            { label: "Hang", value: "On a fine black cable from a small black ceiling canopy, centred on each nightstand, the bottom about 2 ft above the top." },
            { label: "Light", value: "3000K, dimmable, on the bedside switching with the cove." },
          ],
          versions: [
            { name: "Opal-glass tube pendants", state: "selected", date: "04 Oct 2026", note: "Owner's reference." },
            { name: "Frosted globe pendants", state: "considered", date: "04 Oct 2026", note: "First render." },
          ],
          refs: [{ src: "assets/refs/pendant-ref-opal-tube.jpg", caption: "Owner's reference: opal tube pendants" }, { src: "assets/refs/render-ceiling.jpg", caption: "Render (Blender, 04 Oct): the cove tray" }],
          questions: ["Model and exact size (about 4 × 11 in drawn)."] },
      ] },

    { id: "study", title: "The Study", kicker: "Desk · shelf · study wall", left: "Where the work happens", right: "Allegedly",
      intro: "A desk along the left wall and a tall shelf in the corner. The sizes are settled; the designs are on revision twenty-one and counting.",
      items: [
        { id: "desk", name: "Desk", status: "open", line: "A sculpted desk with two drawer pedestals. Revision 21.",
          facts: [["7 ft × 2 ft 8 in", "body"], ["2 ft 6 in", "high"], ["4 ft 0 in", "kneehole"], ["5 in", "past the door"]], mats: ["veneer", "leather"],
          img: null, thumb: "desk", drawings: ["desk", "deskcable"], docs: [{ name: "Joinery Revision 21 (desk set)", src: "assets/docs/desk-joinery-revision-21.pdf" }],
          parts: [
            { label: "Envelope", value: "7 ft 0 in × 2 ft 8 in, 2 ft 6 in high, along the left wall from 5 in past the entry door to the tall shelf." },
            { label: "Current revision", value: "Revision 21 (owner's set): lower body projects 1 in beyond an inset solid-wood top; two 1 ft 6 in pedestals with three drawers each; 4 ft 0 in clear kneehole; smooth S-curved ribs and an upholstered modesty face on the wall side." },
            { label: "Setup", value: "Curved ultrawide on a riser (see Study wall). No clamp lip: wall or through-top mounts." },
            { label: "Leather", value: "DECIDED (10 Oct): taupe/greige leather on both outer sides only, from the foot to the top, stopping at the front edge where the curve begins; the curved corners and the handle-less drawer fronts stay Dark Diva. Pedestal corners rounder (3 in radius)." },
            { label: "Cable slot", value: "DECIDED (08 Oct): 6 in × 2½ in slot through the top, centred, 2 in from the back edge (behind the monitor riser), under a flush magnetic Dark Diva lid with a finger notch." },
            { label: "Back panel", value: "DECIDED (09 Oct): the back panel between the pedestals is removable for cable work (magnets + 4 screws). No hole in it: cables drop through the slot in the top." },
          ],
          versions: [{ name: "Revision 21", state: "considered", date: "02 Oct 2026", note: "Owner's latest set. Not confirmed." }],
          refs: [{ src: "assets/refs/render-desk-leather.jpg", caption: "Render (10 Oct): leather on the side, stopping at the front curve" }, { src: "assets/refs/render-desk-backpanel.jpg", caption: "Render (08 Oct): removable back panel, 8 × 3 in cable opening" }, { src: "assets/refs/render-desk-slot.jpg", caption: "Render (08 Oct): cable slot with its magnetic lid, behind the riser" }, { src: "assets/refs/desk-ref-executive-1.jpg", caption: "Reference: executive desk" }, { src: "assets/refs/desk-ref-executive-2.jpg", caption: "Reference: the sculpted end" }, { src: "assets/refs/desk-setup-ref.jpg", caption: "Reference: the monitor setup only" }],
          questions: ["Desk front is only 2 ft 4 in from the bed side: move the bed, or accept a compact chair?", "Which side faces the room: the drawers, or the sculpted side?"] },

        { id: "shelf", name: "Tall shelf", status: "open", line: "Corner shelf from the desk to the TV wall, opening towards the desk.",
          facts: [["2 ft 7 in", "wide"], ["2 ft 8 in", "deep"], ["9 ft 6 in", "high"], ["1 ft 0 in", "below ceiling"]], mats: ["veneer"],
          img: null, drawings: ["walls"],
          parts: [{ label: "Size", value: "DECIDED SIZE: 2 ft 7 in along the wall, 2 ft 8 in deep (same as the desk), 9 ft 6 in tall, leaving 1 ft to the ceiling. Opens towards the desk." }, { label: "Design", value: "", hint: "Internal layout and finish to decide." }],
          versions: [], refs: [], questions: ["Open shelves only, or open front with a cupboard behind?"] },

        { id: "study-wall", name: "Study wall", status: "final", line: "A cozy gaming wall on white limewash: floating Dark Diva shelves, plants, warm lamps, no RGB.",
          facts: [["2", "floating Dark Diva shelves"], ["34 in", "curved ultrawide + light bar"], ["3000K", "lamps, clock, PC glow"], ["No RGB", "warm only"]], mats: ["veneer", "walls"],
          img: null, thumb: "deskwall", drawings: ["deskwall", "walls"],
          parts: [
            { label: "What it is", value: "SELECTED (04 Oct), after the owner's cozy-setup reference: the fabric panel is gone; the wall stays white limewash with a styled gaming corner." },
            { label: "Shelves", value: "Two floating Dark Diva shelves, staggered: the lower one (3 ft) carries a mushroom lamp, a digital clock and a moon lamp; the upper one (3 ft 1 in) two framed line-art prints and a small figure. Trailing plants at both ends." },
            { label: "Screen", value: "A curved 34 in ultrawide on a Dark Diva riser, with a monitor light bar over it; keyboard on a felt desk mat with a wooden wrist rest." },
            { label: "PC", value: "White case on the desk by the shelf, glass side to the room, fans glowing warm (3000K)." },
            { label: "Details", value: "Round backlit wall clock, a candle and small flowers on the desk, the bouclé chair with a knit throw." },
            { label: "Light", value: "Mushroom and moon lamps, the clock halo, the PC glow and the light bar: all 3000K or warmer, never RGB." },
            { label: "Wall", inherit: "walls" },
          ],
          versions: [
            { name: "Cozy gaming wall: floating shelves, plants, lamps, ultrawide, white PC", state: "selected", date: "04 Oct 2026", note: "From the owner's reference; drawn and rendered." },
            { name: "Fabric panel, taupe, Dark Diva frame, hidden glow", state: "considered", date: "03 Oct 2026", note: "Replaced: the owner wanted the cozy setup instead." },
            { name: "Slatted veneer behind the setup", state: "considered", date: "02 Oct 2026", note: "Too busy next to the shelf and bed wall." },
          ],
          refs: [{ src: "assets/refs/render-desk.jpg", caption: "Render (Blender, 04 Oct): the cozy gaming wall" }, { src: "assets/refs/desk-cozy-ref.jpg", caption: "Owner's reference: cozy minimal setup" }],
          questions: ["Which prints and plants (real or faux)?", "PC: case model and fan colour (warm white)."] },
      ] },

    { id: "dressing", title: "The Dressing", kicker: "Wardrobes · mirror · storage", left: "Where the clothes live", right: "Eventually",
      intro: "A dressing room and the extension that a broken wall bought. The shapes are measured; everything inside them is still a brief.",
      items: [
        { id: "dressing-layout", name: "Layout", status: "final", line: "Dressing room plus extension, wardrobes 2 ft deep.",
          facts: [["7 ft 6 in × 5 ft 7 in", "dressing"], ["9 ft × 5 ft 1 in", "extension"], ["2 ft", "wardrobe depth"], ["3 ft 1 in", "extension aisle"]], mats: ["floor"],
          img: null, thumb: "dressing", drawings: ["dressing"],
          parts: [{ label: "Shape", value: "Dressing 7 ft 6 in × 5 ft 7 in entered from the bedroom through an open 2 ft 6 in doorway (no door); extension 9 ft 0 in × 5 ft 1 in through a 2 ft 6 in opening; bath door off the dressing." }, { label: "Floor", inherit: "floor" }],
          versions: [], refs: [{ src: "assets/refs/sketch-dressing-layout.jpg", caption: "Owner's sketch: dressing layout" }, { src: "assets/refs/sketch-dressing-dims.jpg", caption: "Owner's sketch: dressing sizes" }, { src: "assets/refs/dressing-ref-corridor.jpg", caption: "Reference: dressing corridor" }],
          questions: [] },
        { id: "doorway", name: "Doorway from the room", status: "final", line: "Stepped architrave in the floor marble, with plinth blocks; plain lining inside.",
          facts: [["2 ft 6 in", "opening"], ["1 ft 8 in", "from the bed wall"], ["Stepped", "room side"], ["Plain", "dressing side"]], mats: ["doorstone"],
          img: null, thumb: "doorway", drawings: ["doorway", "walls"],
          parts: [
            { label: "What it is", value: "DECIDED (09 Oct): redesigned in the floor marble, the same single stone as the floor and the 4 in skirting. Three bevelled steps (8 in overall) on the bedroom side standing on plinth blocks 5 in high; plain lining in the same stone inside." },
            { label: "Position", value: "Opening starts 1 ft 8 in from the bed wall, 2 ft 6 in wide. Border about 8 in wide on the wall face (estimated)." },
            { label: "Stone", inherit: "doorstone" },
            { label: "Meets the bed wall", value: "DECIDED (04 Oct): the bed-wall veneer curves round on R1 ft 0 in and stops against the 8 in border; the rest of the wall is white." },
            { label: "Door", value: "DECIDED (03 Oct): no door. It stays an open doorway." },
          ],
          versions: [{ name: "Stepped border room side, plain lining dressing side", state: "selected", date: "03 Oct 2026", note: "Fitted on site." }],
          refs: [{ src: "assets/refs/render-doorway.jpg", caption: "Render (09 Oct): the architrave in the floor marble, on plinth blocks" }],
          questions: ["Border width measured on site (8 in is estimated from a photo)."] },
        { id: "wardrobes", name: "Wardrobes & extension cupboards", status: "final", line: "A U of 2 ft cupboards in the extension, after the owner's sketch; a full-depth wardrobe in the dressing.",
          facts: [["2 ft × 2 ft", "cupboards 1, 4, 5"], ["2 ft", "deep"], ["2 L-shaped", "corner cupboards 2, 3"], ["5 ft", "aisle"]], mats: [],
          img: null, thumb: "wardrobe", drawings: ["wardrobe", "dressing"],
          parts: [
            { label: "Extension", value: "DECIDED (03 Oct, owner's sketch): five cupboards, 2 ft deep, in a U. 5 and 4 are 2 ft wide on the side walls by the opening, doors opening into the aisle; 1 is 2 ft wide in the middle of the far wall, door forward; 2 and 3 fill the corners as L-shaped cupboards, with a door on each open face." },
            { label: "Dressing", value: "DECIDED (09 Oct): on the front wall as you enter, two cupboards 2 ft deep: 900 mm and 800 mm (the wall is about 1700 mm), each with double doors." },
            { label: "Extension", value: "", hint: "Owner is sketching the new layout (single 300 mm, 900 mm runs, 300 + 300 corner, double cupboard)." },
            { label: "Shutters", value: "DECIDED (03 Oct), after the owner's corridor reference: Dark Diva Crown veneer frames (2 in) with warm off-white linen-texture laminate panels, split low at 3 ft 6 in; long round Dark Diva bar handles, 4 ft 9 in." },
            { label: "Why laminate", value: "Linen-texture laminate gives the soft woven look of the photo but wipes clean; real fabric would mark, gather dust and take in perfume and bathroom steam." },
            { label: "Height", value: "Full height to 9 ft 9 in over a 3 in recessed plinth, under a lit cove; the ceiling is 10 ft 6 in." },
            { label: "Veneer", inherit: "veneer" },
          ],
          versions: [{ name: "Dark Diva frames, linen-texture laminate panels, bar handles", state: "selected", date: "03 Oct 2026", note: "Laminate chosen over real fabric." }, { name: "U of five cupboards (owner's sketch)", state: "selected", date: "03 Oct 2026", note: "2 ft wide, 2 ft deep." }],
          refs: [{ src: "assets/refs/render-wardrobe.jpg", caption: "Render (Blender, 04 Oct): Dark Diva frames, linen laminate" }, { src: "assets/refs/dressing-ref-corridor.jpg", caption: "Reference: the wardrobe look (wood frames, light panels, bar handles)" }, { src: "assets/refs/sketch-extension-cupboards.jpg", caption: "Owner's sketch: extension cupboards 1-5" }],
          questions: ["Interiors: hanging, shelves and drawers per cupboard."] },
        { id: "mirror", name: "Mirror", status: "final", line: "A trifold mirror by the bath door. Final; design drawings to come from the owner.", facts: [["Trifold", "type"], ["By the bath door", "where"], ["", ""], ["", ""]], mats: [], img: null, drawings: ["dressing"], parts: [{ label: "Design", value: "FINAL (03 Oct): trifold mirror by the bath door, as in the layout.", hint: "Size, frame and lighting: owner to share the design." }], versions: [], refs: [], questions: [] },
        { id: "perfume", name: "Perfume & hair-dryer column", status: "final", line: "A curved, seamless floor-to-ceiling column on the right as you enter: lit perfume shelves, a hair-dryer pull-out.",
          facts: [["2 ft 4 in × 1 ft 3 in", "footprint"], ["Floor to ceiling", "height"], ["R1 ft 3 in", "curved open end"], ["3 ft", "lit perfume shelves"]], mats: ["veneer"],
          img: null, thumb: "perfume", drawings: ["perfume", "dressing"],
          parts: [
            { label: "Where", value: "The right wall as you enter the dressing, between the doorway and the opening to the extension." },
            { label: "Form", value: "SELECTED (03 Oct): one seamless Dark Diva skin, push-to-open with no handles; the open end curves on R1 ft 3 in toward the extension." },
            { label: "Inside", value: "Lit glass shelves for perfumes at eye level (3 ft 6 in to 6 ft 6 in, 3000K strip); a pull-out for the hair dryer and tools at 2 ft 11 in with a socket inside; closed storage below and above." },
            { label: "Veneer", inherit: "veneer" },
          ],
          versions: [{ name: "Curved tall column, Dark Diva veneer", state: "selected", date: "03 Oct 2026", note: "Owner's choice (A)." }],
          refs: [{ src: "assets/refs/render-perfume.jpg", caption: "Render (Blender, 04 Oct): lit glass shelves" }], questions: [] },        { id: "storage", name: "Storage", status: "brief", line: "Drawers, shoes, the rest.", facts: [["", ""], ["", ""], ["", ""], ["", ""]], mats: [], img: null, drawings: [], parts: [{ label: "Brief", value: "", hint: "What needs to be stored." }], versions: [], refs: [], questions: [] },
      ] },

    { id: "bathroom", title: "The Bathroom", kicker: "WC · shower · vanity", left: "Off the dressing", right: "Designed", r3d: "bath",
      intro: "Entered from the dressing: the WC on the left, a fixed glass, then a walk-in shower running to the window; the vanity on the right, tucked by the door.",
      items: [
        { id: "bath-size", name: "Layout", status: "final", line: "WC, glass and walk-in shower on the left; the vanity on the right by the door.",
          facts: [["7 ft 6 in × 6 ft 8 in", "about"], ["3 ft 7 in", "glass from the door wall"], ["4 ft 4 in × 3 ft 1 in", "shower"], ["Toward the WC", "door opens"]], mats: ["bathstone"],
          img: null, thumb: "bathplan", drawings: ["bathplan"],
          parts: [
            { label: "Layout", value: "FINAL (03 Oct): entering, the wall-hung WC is on the left; a fixed glass panel stands 3 ft 7 in from the door wall; the walk-in shower runs beyond it to the window wall. The vanity is on the right wall, tucked into the corner by the door." },
            { label: "Door", value: "2 ft 6 in, 2 ft 6 in from the left wall; opens in, toward the WC (clear of the vanity)." },
            { label: "Window", value: "Sill 5 ft 0 in above the floor, on the wall facing the door." },
            { label: "Size", value: "About 7 ft 6 in × 6 ft 8 in, scaled from RCP-1.", hint: "Tape-measure check still welcome." },
          ],
          versions: [
            { name: "WC left, glass at 3 ft 7 in, walk-in shower to the window, vanity right by the door", state: "selected", date: "03 Oct 2026", note: "Glass moved toward the WC and the shower widened to stop just short of the window." },
            { name: "Glass at 3 ft 8 in, shower 3 ft 4 in wide", state: "considered", date: "03 Oct 2026", note: "First proposal." },
          ],
          refs: [], questions: ["Ceiling height in the bathroom (drawn at 8 ft)."] },
        { id: "bath-marble", name: "Wall marble & niches", status: "final", line: "Beige marble walls; two framed niches over the WC and an L niche round the shower corner.",
          facts: [["Beige", "polished marble"], ["3", "niches"], ["~3 ft 6 in", "niche height"], ["L", "N3 round the shower corner"]], mats: ["bathstone"],
          img: null, thumb: "bath", drawings: ["bath"],
          parts: [
            { label: "What it is", value: "DECIDED (fitted): beige marble on the walls. On the left wall, a short niche (N1) and a tall niche (N2) side by side over the WC, each framed with a rounded marble border." },
            { label: "L niche", value: "N3 is one L-shaped niche inside the shower: about 1 ft on the left wall, turning the corner and continuing 3 ft 0 in along the window wall." },
            { label: "Niche height", value: "About 3 ft 6 in above the floor." },
            { label: "Stone", inherit: "bathstone" },
            { label: "Niche lighting", value: "", hint: "Wires are out in each niche: LED strip or downlight to choose." },
          ],
          versions: [{ name: "Framed niches as built, N3 as an L", state: "selected", date: "03 Oct 2026", note: "Fitted on site." }],
          refs: [], questions: ["Niche lighting: LED strip inside, or none?"] },
        { id: "shower", name: "Shower", status: "final", line: "Walk-in behind a fixed glass, running to just short of the window.",
          facts: [["4 ft 4 in × 3 ft 1 in", "shower area"], ["2 ft 6 in × 6 ft 6 in", "fixed glass"], ["3 ft 7 in", "glass from the door wall"], ["Linear", "drain at the window wall"]], mats: ["bathstone"],
          img: null, thumb: "shower", drawings: ["shower", "bath"],
          parts: [
            { label: "Glass", value: "FINAL (03 Oct): one fixed clear panel, 2 ft 6 in out from the left wall (a third of the room's width), 6 ft 6 in tall, 3 ft 7 in from the door wall, just clear of the tall niche's frame." },
            { label: "Area", value: "Walk-in, no tray: 3 ft 1 in deep from the glass to the window wall, 4 ft 4 in wide, stopping 2 in short of the window." },
            { label: "Niche", value: "The L niche N3 sits in the shower, turning the corner." },
            { label: "Fittings", value: "Wall mixer and rain head on the left wall; linear drain along the window wall.", hint: "Positions indicative; brand and finish to choose." },
          ],
          versions: [{ name: "Fixed glass at 3 ft 7 in, walk-in to the window", state: "selected", date: "03 Oct 2026", note: "Owner's call: glass toward the WC, longer shower." }],
          refs: [{ src: "assets/refs/render-shower.jpg", caption: "Render (Blender, 04 Oct): glass and the lit L niche" }], questions: ["Mixer and rain-head finish (to match the bronze?)."] },
        { id: "vanity", name: "Vanity", status: "final", line: "3 ft floating vanity: dark marble top and waterfall side, fluted Dark Diva drawers, a white Kohler vessel, a chrome Kohler faucet.",
          facts: [["3 ft 0 in × 1 ft 9 in", "top"], ["2 ft 9 in", "to the marble"], ["Kohler Sweda Light", "white vessel"], ["Kohler Modern Life", "chrome faucet"]], mats: ["doorstone", "veneer"],
          img: null, thumb: "vanity", drawings: ["vanity"], docs: [{ name: "Vanity Rev A · the original (3 sheets)", src: "assets/docs/vanity-3ft-rev-a.pdf" }],
          parts: [
            { label: "What it is", value: "FINAL · Rev C (03 Oct): the owner's reference look on the Rev A sizes. Floating, wall-hung in the corner of the right wall by the door." },
            { label: "Top & side", value: "Dark marble with white veins, 40 mm built-up edge, double bullnose, polished; it runs down the open side as a waterfall panel." },
            { label: "Sink", value: "DECIDED (03 Oct): Kohler Sweda Light vessel, white, standing on top of the marble (not carved in), centred. Drawn about 1 ft 7¾ in × 1 ft 1 in × 5 in.", hint: "Exact size from the Kohler spec sheet." },
            { label: "Faucet", value: "DECIDED (03 Oct): Kohler Modern Life, chrome. Drawn as a tall single-lever mixer on the marble behind the vessel.", hint: "If it is the wall-mounted version, the drawing moves it to the wall." },
            { label: "Drawers", value: "Fluted Dark Diva veneer fronts (not oak). Drawer 1 (7 in front, notched round the waste); drawer 2 (big) with the secret drawer riding inside, its front 22 mm behind the big drawer's face. 450 mm soft-close runners." },
            { label: "Fixing", value: "Steel hanging rail and two concealed brackets into the back wall; 1 ft 0 in clear below." },
          ],
          versions: [
            { name: "Rev C · dark marble, fluted Dark Diva drawers, Kohler Sweda Light + Modern Life", state: "selected", date: "03 Oct 2026", note: "Owner's reference look, same sizes, double bullnose." },
            { name: "Rev B · taupe-gray room marble, double bullnose", state: "considered", date: "03 Oct 2026", note: "Same sizes." },
            { name: "Rev A · beige-gold marble, \"B\" edge", state: "considered", date: "01 Oct 2026", note: "Owner's first issue (PDF attached)." },
          ],
          refs: [{ src: "assets/refs/render-vanity.jpg", caption: "Render (Blender, 04 Oct): dark marble, Kohler vessel, chrome faucet" }, { src: "assets/refs/vanity-ref-fluted.png", caption: "Reference: dark marble, fluted drawers, wall tap" }],
          questions: [] },      ] },
  ],

  // ── other questions, not tied to one piece ─────────────────────────────────
  questions: [
    "Is 10 ft 6 in the slab or the finished false-ceiling height?",
    "Which way does the window face?",
    "Bedroom window is 6 ft 7 in tall: at what height does it start from the floor?",
    
    "Paint: the exact white.",
  ],

  // ── what was decided, and when ─────────────────────────────────────────────
  log: [
    { date: "27 Aug 2026", item: "Lighting", text: "Designer's reflected ceiling plan RCP-1 issued." },
    { date: "02 Oct 2026", item: "Floor", text: "Taupe-gray marble fixed for the bedroom, dressing and extension." },
    { date: "02 Oct 2026", item: "Walls & ceiling", text: "All walls and the ceiling white; only veneer or limewash allowed as other wall finishes." },
    { date: "02 Oct 2026", item: "Veneer", text: "Dark Diva Crown OHBF-607/66 chosen." },
    { date: "02 Oct 2026", item: "Bed", text: "Curved white bouclé bed confirmed; rolled headboard ends removed, nightstands flush to the wall." },
    { date: "02 Oct 2026", item: "Bed back wall", text: "Confirmed: veneer to 8 ft, curving round the dressing-side corner on R1 ft 6 in to the doorway." },
    { date: "02 Oct 2026", item: "Shelf", text: "Size fixed: 2 ft 7 in × 2 ft 8 in × 9 ft 6 in, opening towards the desk." },
    { date: "02 Oct 2026", item: "Desk", text: "Joinery Revision 21 received from the owner; under review." },
    { date: "02 Oct 2026", item: "Site", text: "Everything else reset to 'deciding'. This book started." },
    { date: "03 Oct 2026", item: "Doorway", text: "Dressing doorway fitted: stepped dark gray marble border to the room, plain lining inside. Opening measured at 1 ft 8 in from the bed wall." },
    { date: "03 Oct 2026", item: "Bathroom", text: "Beige marble walls and framed niches fitted; door 2 ft 6 in from the dressing's left wall; window sill 5 ft 0 in." },
    { date: "03 Oct 2026", item: "Bed", text: "Mattress 6 ft × 6 ft 6 in; bouclé side roll slimmed to 2½ in. Bed 6 ft 5 in wide; nightstands moved out to stay flush." },
    { date: "03 Oct 2026", item: "TV unit", text: "Curved Viola band chosen: curves into the shelf, runs to the window. 55 in Sony Bravia 8 on the bed centreline; floating console. Niche A (contrast strip) chosen; console 6 ft 6 in, flat front with rounded ends after the reference." },
    { date: "03 Oct 2026", item: "Window", text: "Bedroom window measured: 6 ft 7 in tall." },
    { date: "03 Oct 2026", item: "Bed back wall", text: "Veneer curve reduced to R1 ft 0 in so it stops against the doorway's 8 in marble border." },
    { date: "03 Oct 2026", item: "Study wall", text: "Taupe fabric panel in a 1 in Dark Diva frame chosen for the desk wall, desk top to the door-head line, with a hidden 2700K glow." },
    { date: "03 Oct 2026", item: "Painting", text: "3 ft 6 in square landscape with a brass picture light chosen for the dressing-side wall." },
    { date: "03 Oct 2026", item: "Bathroom", text: "Layout final: WC left, fixed glass at 3 ft 7 in, walk-in shower to the window, L niche in the shower, door opening toward the WC." },
    { date: "03 Oct 2026", item: "Vanity", text: "3 ft floating vanity (owner's Rev A) final: marble top with a B edge, burl veneer, secret drawer." },
    { date: "03 Oct 2026", item: "Vanity", text: "Rev B selected: same sizes, top in the room's taupe-gray marble with a double bullnose edge." },
    { date: "03 Oct 2026", item: "Dressing", text: "No door into the dressing: an open doorway. Extension cupboards drawn from the owner's sketch: five 2 ft deep cupboards in a U." },
    { date: "03 Oct 2026", item: "Perfume column", text: "Curved floor-to-ceiling column in Dark Diva veneer on the right as you enter the dressing: lit perfume shelves, hair-dryer pull-out." },
    { date: "03 Oct 2026", item: "Vanity", text: "Rev C selected: dark marble top and waterfall side, double bullnose, fluted drawers, a vessel sink on top, wall tap." },
    { date: "03 Oct 2026", item: "Vanity", text: "Fluted fronts in Dark Diva veneer; Kohler Sweda Light white vessel; Kohler Modern Life faucet in chrome." },
    { date: "03 Oct 2026", item: "Dressing", text: "Ceiling confirmed at 10 ft 6 in. Corner cupboards 2 and 3 get a door on both open faces." },
    { date: "03 Oct 2026", item: "Wardrobes", text: "Shutters after the corridor reference: Dark Diva veneer frames and bar handles, linen-texture laminate panels (chosen over fabric)." },
    { date: "03 Oct 2026", item: "Lighting", text: "3000K chosen for every light in the suite, cove included; CRI 90+, dimmable, 2-3 circuits. 2700K would read yellow with this many lights." },
    { date: "04 Oct 2026", item: "Bed back wall", text: "Veneer now stops at the corner; the painting wall is all white, only the marble doorway border." },
    { date: "04 Oct 2026", item: "Study wall", text: "Fabric panel dropped for a cozy gaming wall (floating Dark Diva shelves, plants, warm lamps, ultrawide, white PC), after the owner's reference." },
    { date: "04 Oct 2026", item: "Renders", text: "Whole suite modelled in Blender from the drawings and rendered in Cycles at 3000K; stills added to each piece." },
    { date: "04 Oct 2026", item: "Bed back wall", text: "Curve brought back: the veneer turns the corner on R1 ft 0 in toward the marble doorway; the rest of the painting wall stays white. Tour re-rendered." },
    { date: "04 Oct 2026", item: "Pendants", text: "Opal-glass tube pendants on fine black cables chosen, from the owner's reference." },
    { date: "08 Oct 2026", item: "Bed back wall", text: "Veneer lowered to 6 ft 6 in; the visible strip replaced by a hidden cove washing the white wall." },
    { date: "08 Oct 2026", item: "Desk", text: "Taupe leather on both outer sides; cable slot with a magnetic lid in the top; removable back panel (magnets + 4 screws) with a cable opening." },
    { date: "08 Oct 2026", item: "TV unit", text: "Stone set to Calacatta Viola, taken from the owner's reference photo." },
    { date: "08 Oct 2026", item: "Painting wall", text: "Bright white, evenly washed from a ceiling slot; doorway marble redrawn from the fitted stone." },
    { date: "09 Oct 2026", item: "Bed back wall", text: "Panel now floats 1 in off the wall with a COB halo (trough removed); flutes run round the curve; headboard a plain flat bouclé rectangle, 3 ft 3 in." },
    { date: "09 Oct 2026", item: "TV unit", text: "Plain Calacatta Viola with a halo; strip and niche removed; 7 ft console on a black plinth with a Viola top and ends and a fridge drawer; full-height curtains at the window." },
    { date: "09 Oct 2026", item: "Marble", text: "One floor marble everywhere: floor, doorway (redesigned, plinth blocks) and a new 4 in skirting round the room." },
    { date: "09 Oct 2026", item: "Desk", text: "Leather tucked in flush; rounder pedestals; back panel removable without a hole (cables through the top slot)." },
    { date: "09 Oct 2026", item: "Wardrobes", text: "Dressing front wall: 900 + 800 mm cupboards, double doors each. Extension layout waiting for the owner's sketch." },
    { date: "10 Oct 2026", item: "Bed back wall", text: "Veneer raised to 7 ft 8 in, level with the top of the doorway's marble frame." },
    { date: "10 Oct 2026", item: "Nightstands", text: "Decided: a Calacatta Viola slab underneath on a black plinth, the drawer box and top in Dark Diva." },
    { date: "10 Oct 2026", item: "TV unit", text: "Console back to the floating curved Dark Diva design, 7 ft, no marble, no handles; the fridge hides behind the wider middle front." },
    { date: "10 Oct 2026", item: "Desk", text: "Leather on the outer sides only, foot to top, stopping at the front curve; drawings updated." },
  ],

  // the owner's own sketches, shown on the overview
  sketches: [
    { src: "assets/refs/sketch-room-dims.jpg", caption: "The room, measured by hand" },
    { src: "assets/refs/sketch-dressing-dims.jpg", caption: "The dressing and its extension" },
    { src: "assets/refs/sketch-dressing-layout.jpg", caption: "Dressing layout and wardrobes" },
    { src: "assets/refs/plan-earlier-cad.jpg", caption: "An earlier CAD of the room" },
  ],
  docs: [
    { name: "RCP-1 · Reflected ceiling & lighting plan", src: "assets/docs/rcp-lighting-plan.pdf", by: "Interior designer · 27 Aug 2026" },
    { name: "Joinery Revision 21 · Desk set", src: "assets/docs/desk-joinery-revision-21.pdf", by: "Owner · 02 Oct 2026" },
    { name: "Vanity · 3 ft floating corner, Rev A", src: "assets/docs/vanity-3ft-rev-a.pdf", by: "Owner · 01 Oct 2026" },
  ],

  // Blender: drop files into assets/media and name them here
  media: { film: "assets/media/room-tour.mp4", poster: "assets/refs/film-poster.jpg", renders: [], model: null,
    // the tour, in seconds: where each room starts in the film
    chapters: [["From the door", 0], ["The bed wall", 11], ["The painting", 22], ["The TV wall", 28], ["The study", 36], ["The ceiling", 42], ["The dressing", 50], ["The bathroom", 60]] },
};
