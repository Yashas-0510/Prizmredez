# PRIZM STUDIO — Scroll-Film Build Brief v3

Single source of truth. If chat context is lost, resume from this file.

> **STATUS 2026-07-29 (2): FACET KILLED.** User: "It's just plain black rock."
> kf0/kf1/kf2 generated (6 cr, shelved in facet/keyframes), kf3 job abandoned
> (2 cr). NEW TASTE SIGNALS from user's 4 reference images: (1) dark chamber =
> TOO PLAIN; (2) RICH geode cavern w/ amethyst+gold+teal crystals + floating
> iridescent wireframe PRISM + god rays + mirror water = LIKED; (3) pastel
> dream world (pink clouds, glass bubbles, blue sky, water reflections) =
> "beautiful aesthetic"; (4) bright ivory stage w/ glass triangular prism +
> iridescent shard/pigment explosion + glass droplets = LIKED. RULE: film must
> be RICH and the PRISM must be the visible hero. 3 new concepts in pitch —
> AWAITING PICK. Master 720p approved (112.5 cr), mobile later.
> Prior state: seedance_2_0 preflight OK, vector-check tooling works, balance
> ~1711 cr. Site rooms 01-07 on localhost:3000 remain the content below film.

## Reference-site analysis (what to steal)

- **terminal-industries.com**: full-viewport `<canvas>` (2× DPR) hero playing a
  scroll-scrubbed cinematic frame sequence — ONE object (truck), ONE journey,
  beats of copy fade per chapter; ~15740px doc; then content (white sections,
  calculators) + signature dark "digital twin" panels (wireframes + mono
  micro-labels like "ASSIGN TO SPOT 11"). Grid-pattern transition frames.
- **sondaven.com/ua**: Webflow + barba + GSAP (parallax attrs, split-char
  reveals), 32017px doc, preloader w/ percent counter + video, custom easings
  cubic-bezier(.76,0,.24,1), monumental serif, full-bleed color-block sections,
  pixel-art ornaments parallaxing, hover scale 1.15 images, masked marquees.
- LESSON (both): one continuous shot first, chrome stays legible over every
  frame, content below keeps the same confidence (scale contrast, arrival motion).

## Sparring verdict (sub-agent, no stake)

- A (THE PASSAGE, forward): best of 3 but joints 1→2 (void→desert) and 2→3
  (through monolith face) = teleport risk; "river of threads" = rainbow-soup risk.
- B (FIRST CUT, descent): resubmits the KILLED geode cavern. Dead.
- C (ALIGNMENT, lateral): object-permanence demands the engine can't meet;
  wireframe grid = SaaS-explainer, not shrine; payoff buried before end.
- WILDCARD "FACET" (orbit) — strongest: one room, one stone, all 5 clips;
  per-clip travel = small arc (safest); transformation happens ON the sovereign
  object; spectrum only on rims/core; film ENDS on the payoff (spectrum fan).

## CONCEPT (pending user pick) — "FACET"

Vector: ONE SLOW CONTINUOUS ORBIT around a single object. One ink-dark circular
chamber, a rough black stone on a basalt plinth, one hairline of white light.
The light travels and cuts: facets shear off one per chapter, each new plane
catching a restrained spectral rim; core turns from black to compressed white;
orbit completes to the front — the finished prism exhales ONE restrained
spectrum fan across the dark floor. Settle. = the brand story told as physics:
raw brief in → craft → spectrum out. Story = shrine language made film.

Beats: 01 THE STONE / 02 FIRST CUT / 03 FACETS / 04 THE CORE / 05 EXHALE.
Final keyframe kf5 should rhyme with approved hero still sn-kf2.png
(public/art/) — use it as image ref so the film lands on the approved world.

## Film shape + costs (CONFIRMED with CLI, balance 1719.5 cr)

- 5 clips x 5s = 25s, 16:9, 24fps ≈ 600 frames. `--generate-audio false` ALWAYS.
- Keyframes: 6 x gpt_image_2 1k medium ≈ 12 cr (chain via --image refs).
- Draft chain: 5 x 480p/fast = 7.5/clip = **37.5 cr**.
- Master chain: 5 x 1080p/std = 45/clip = **225 cr**.
- Repair buffer ~100 cr. Total est ~375 cr. Mobile 9:16 master = later (+225).
- Engine: Higgsfield `seedance_2_0` (native start_image + end_image CONFIRMED
  via `higgsfield model get`). Path A chaining. Draft validates the start-pin
  preflight: extract clip1 last frame → pin as clip2 start → compare.

## DO-NOTs (hard rules, cumulative)

- KEYFRAMES: gpt_image_2 ONLY, NEVER nano_banana (user directive).
- COST RULE: gpt_image_2 default 1k/quality medium (~2 cr); high/2k (~7 cr)
  ONLY for a user-approved final hero still. Confirm spend before generating.
- Chain law: clip N start = clip N-1 REAL EXTRACTED LAST FRAME (ffmpeg), never
  the keyframe; end = next keyframe. SEQUENTIAL only, never parallel.
- One clip = one camera direction, one location, one lighting state.
- No people/text/logos in footage. No dissolves over bad junctions (fix join).
- No narrating the mechanic in copy (copy-gate.js must exit 0).
- Spectrum on rims/veins/cores only; dozens of elements, never hundreds.
- Never `<video>` scrubbing — canvas + extracted JPEG frames only.
- Audio OFF. Respect prefers-reduced-motion. KILL LIST for page: pills, badges,
  icon chips, glass dock, gradient serif italics, pulsing dots, cyan glows,
  framer-motion-in-film (sections may use GSAP/Lenis), lucide.

## Pipeline (scripts in C:\Users\a\.agents\skills\scroll-film-studio\scripts\)

1. storyboard.json → vector-check.py MUST PASS (free, pre-spend)
2. 6 keyframes chained via --image refs (gpt_image_2, 1k medium)
3. Draft chain 5x480p/fast sequential; per seam: extract last frame
   (`ffmpeg -sseof -0.05 -i clipN.mp4 -update 1 -q:v 1 clipN-last.png`),
   pin as next start; junction SSIM >= 0.88 (clouds/embers under-read OK —
   judge side-by-side); continuity-gate.sh on full draft MUST PASS
4. Master chain 5x1080p/std with approved prompts, same gates
5. assemble.sh: concat dropping dup junction frames, `-fps_mode vfr` master;
   TRIM HEAD until first frame is already inside movement; sample final-frame
   edge color = seam hex; extract frames at NATIVE fps
   (`fps=24,scale=1440:-2 -q:v 6`) → set FRAME_COUNT to trimmed count
6. Build page (below) → verify.js jank (p95/max, max<50ms) + shots every beat
   and every junction; copy-gate.js exit 0; desktop 1440x900 + mobile 390x844

## Page architecture (Next.js app at D:\Prizmredesign, dev localhost:3000)

- Film = new room 01, REPLACING static HeroSection: tall scroll driver
  (~170vh/chapter ≈ 850vh) + sticky 100vh stage + canvas scrub engine
  (ImageBitmap sliding window ±2s ahead/1.3s behind, lerped frame index 0.14,
  DPR cap 1.0 w/ 1440px frames, fit-not-cover MAX_CROP 0.22, nearestFrame
  fallback, concurrency-10 pump, progress loader, ?jump + __ready dev contract).
- Beats over film: PRIZM wordmark hero beat (visible at scroll 0), chapter
  readout + thin progress bar in chrome, one restrained beat per chapter
  (brand copy, never camera narration), finale beat anchored left.
- Chrome: adaptive header (top-strip luminance sample ~180ms → .on-light),
  soft scrim, white (not cream) over footage, text-shadow.
- Seam: bottom-fade overlay ramps last 8% + next section bg starts at sampled
  final-frame hex; grain/vignette fade with same ramp; ambient dust-mote
  particle layer over frame 0 fading out across first 7% scroll.
- Lenis smooth scroll SITEWIDE (wire into GSAP ticker if GSAP used).
- Rooms 02-07 KEEP shrine language (RoomShell, monuments, .meta) + REGAIN
  MOTION (user misses old animations): GSAP ScrollTrigger — pinned scenes
  FIRST, ambient triggers AFTER (creation order law); staggered rise-fade
  arrivals, clip-path reveals, image parallax, hover scale 1.15, counters.
- Mobile v1: fit/letterbox portrait via MAX_CROP; dedicated 9:16 film later.

## Asset paths (corrected, verified)

- Web screenshots: public/posters/ (web-01..04.jpg, web-gm.jpg, web-oval.png,
  web-pushup.png). portfolio/ has aura/kinetix/lumen/nexus/soreviora.png (last
  4 UNVERIFIED). UGC: public/UGC/*.mp4. Social: public/social/*.png.
- Approved jewel stills: public/art/ (sn-kf0/1/2.png, in-kf0.png).
- Old geode keyframes (killed concept, MAY be world refs only):
  prizm-film/assets/keyframes/geode-kf0..5.png.
- Real project names: Oval Box (web-01 loader + web-oval aerial), Tattoo Sutra
  (web-02), Barbell Cartel (web-03), GM Artisans catering (web-gm), Push Up
  gym (web-pushup), Atelier Seraphine (portfolio/aura.png).

## Env / tooling

- Dev server: localhost:3000 (log prizm-film/devserver.log; restart = kill
  port 3000, remove .next, Start-Process npm run dev from D:\Prizmredesign).
- Screenshot: `node prizm-film/scripts/shot.js <url> <out.png> 1440 900 [frac]`
  ("no canvas" warning harmless on current site — WILL matter post-film).
- ffmpeg: available (ffmpeg -version worked). Windows PowerShell: ASCII-only,
  `cmd1; if ($?) { cmd2}`, no `&&`. Python needs $env:PYTHONIOENCODING="utf-8".
- Higgsfield: authed (yashastimbers5@gmail.com, max plan). `higgsfield account
  status` = balance. Cost probe: `higgsfield generate cost <model> --prompt x ...`

## State / next actions

- [x] Reference analysis (sondaven + terminal) — digest above
- [x] seedance_2_0 preflight: params confirmed, costs confirmed
- [x] Concepts drafted + adversarial sparring (FACET won)
- [ ] USER PICK + spend approval (pitch sent with cost quote)
- [ ] storyboard.json + vector-check PASS
- [ ] 6 keyframes (gpt_image_2 1k medium, chained; kf5 refs sn-kf2.png)
- [ ] Draft chain 480p → junction + continuity gates → show user
- [ ] Master chain 1080p → gates → assemble → head-trim → extract frames
- [ ] Build FilmRoom component + beats + chrome + seam into room 02
- [ ] Motion layer for rooms 02-07 (GSAP pinned first, ambient after)
- [ ] verify.js jank + beat/junction shots + copy-gate + mobile check
