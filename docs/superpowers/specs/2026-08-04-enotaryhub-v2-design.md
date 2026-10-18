# eNotaryHub v2 — Design Spec

Date: 2026-08-04
Status: Approved
Supersedes: the design language documented in `enotaryhub/design.md` (v1)

## 1. Purpose

Rebuild the eNotaryHub marketing site with an original, award-caliber visual
identity. v1 is competent but reads as a well-executed template. v2 must read as
designed — specific to this product, this legal instrument, and this country.

Product context: eNotaryHub is a pre-launch electronic notarization platform for
the Philippines, operating under A.M. No. 24-10-14-SC, the Supreme Court's 2025
Rules on Electronic Notarization (published 9 March 2025).

## 2. Thesis

**Capiz shell windows. Light passes, identity is protected.**

In *bahay na bato* architecture, capiz panels sit in a wooden mullion grid. They
are translucent — light passes through — but never transparent; the interior
stays private.

Electronic notarization has the same dual obligation. The act must be visible and
auditable (live two-way appearance, geolocation checks, an Electronic Notarial
Book) while remaining confidential and data-protected. The rules demand both at
once.

Every system in this spec derives from that idea. The metaphor lives in **light
and structure only**. No shell illustrations, no flag graphics, no sunburst
stock art. If an element cannot be justified by "light passes, identity is
protected," it does not ship.

## 3. Slogan and voice

**Slogan: "Notarized Right, Notarized Now."**

Used as the home hero display line, the brand lockup line, and in page metadata
and OG cards. Set in Fraunces at display scale, broken across two lines so the
antithesis lands on the line break:

```
Notarized Right,
Notarized Now.
```

The two halves are typographically differentiated — `Right` carries the ink
weight, `Now` takes the sun accent — so the slogan itself expresses the site's
central pairing of rigour and speed.

**Voice note (flagged):** "Now" asserts immediacy while the product is
pre-launch and explicitly not accepting notarization requests. The slogan is
used as directed; the tension is managed by keeping the launch-status line
adjacent to the hero and preserving every v1 availability disclaimer verbatim
(§8). Worth revisiting at launch, not a blocker.

Supporting voice rules carried from v1: plainspoken, precise, warm. CTA labels
name the action. Success states stay quiet.

## 4. Visual system

### 4.1 Palette

Six tokens. Restraint is load-bearing.

| Token | Role | Value |
|---|---|---|
| `--pearl` | capiz base / page ground | `oklch(96.5% 0.008 85)` |
| `--pearl-deep` | recessed panel | `oklch(92% 0.014 82)` |
| `--mullion` | frame rules, hairlines | `oklch(80% 0.02 75)` |
| `--narra` | ink — Philippine hardwood, warm, not navy | `oklch(22% 0.03 55)` |
| `--sun` | state and verification **only**, never wallpaper | `oklch(76% 0.14 78)` |
| `--night` | the single dark section (live A/V session) | `oklch(18% 0.02 60)` |

Deliberately not v1's ivory / navy / gold. The shift from cool navy to warm
narra is the single biggest tonal difference between v1 and v2.

### 4.2 Typography

A characterful serif display paired with a neutral sans body — the editorial
pairing that reads as authored rather than assembled.

- **Fraunces** (variable; `opsz`, `SOFT`, `WONK` axes) — display. Warm and
  high-contrast, like a printed civic instrument. The `WONK` axis provides the
  ownable detail.
- **Inter** (variable) — body. Unimpeachable legibility for legal text; complete
  diacritics for the Filipino build.
- **JetBrains Mono** — clause numbers, section marks, status labels, coordinates.

### 4.3 The eight-axis geometry

The Philippine flag's sun has eight rays. v2 treats this as a **grid system, not
a motif**. Eight-axis geometry governs:

- capiz facet tessellation in the hero
- an 8° skew applied to section rules
- the eight-segment progress indicator
- the construction of the placeholder logo mark

### 4.4 Layout — the marginalia rail

The signature structural move. An asymmetric persistent narrow column, like a
legal document's margin, carrying clause numbers (`§ 1.0`), status labels, the
locale toggle, and the script watermark.

Paired with always-visible mullion hairlines, the page reads as *looking through
a window frame*.

## 5. The hero

Built on the supplied photograph, `public/enotaryhub-hero-2027.webp`, rather
than on an invented field. The photograph already *is* the thesis: layered
translucent vellum sheets with light passing through them, a gold embossed rayed
seal, and roughly 40% dark navy negative space on the left that serves as the
type area.

Three consequences follow:

- **The hero is dark.** The site runs night → day → night: the photograph, then
  the pearl process sections, the live-appearance section on night, and the
  night footer. This is why `--color-night` is a cool navy and `--color-vellum`
  exists at all — both are sampled from the image.
- **The shader composites over the photograph.** A low-intensity caustic in
  `mix-blend-mode: screen`, pointer-tracked, augmenting the light already in the
  frame instead of replacing it. `ogl` is dynamically imported *after* the gate
  passes, so fallback devices never download it.
- **The photograph is the fallback.** Not an SVG stand-in.

**Fallback chain, in order:**

1. `prefers-reduced-motion: reduce` → photograph only
2. Fewer than 4 logical cores, or `deviceMemory` under 4 GB → photograph only
3. No WebGL context available → photograph only
4. Otherwise → shader

The gate lives inside the caustic layer's own effect, so no state is set after
mount to decide whether it runs. The canvas is `aria-hidden` and decorative; the
slogan beside it carries all the meaning. The render loop stops when the hero
leaves the viewport.

Any replacement image must preserve the dark, uncluttered left third, or the
slogan becomes unreadable. See `public/README.md`.

## 6. Motion

The scroll-triggered fade-up is the template tell. It is banned.

- **Mullion wipe** — sections reveal via a vertical panel sweep along the 8°
  axis, like a shutter opening. Once per section, short.
- **Process lantern** — the four home-page steps (Prepare, Verify, Appear,
  Receive) are four capiz panels. Scroll passes light through each in turn. The
  metaphor resolves literally; this is the emotional centre of the page.
- Hover **gathers light**. No translate-on-hover anywhere on the site.
- `prefers-reduced-motion` collapses every one of these to an opacity change.

## 7. Scope

English marketing site, five routes:

| Route | Purpose |
|---|---|
| `/` | Home |
| `/how-it-works` | The six-step request path |
| `/business` | Organization workflows |
| `/notaries` | Electronic Notary Public workspace |
| `/contact` | Inquiry form |

Filipino copy is ported into `content/fil.ts` and the locale plumbing is built,
but only `en` is routed and shipped. Enabling Filipino later is a routing change,
not a rewrite.

**Out of scope:** product application surfaces, authentication, real form
submission backends, notarization request intake.

## 8. Architecture

```
app/
  layout.tsx              root shell, fonts, metadata
  page.tsx                home
  how-it-works/page.tsx
  business/page.tsx
  notaries/page.tsx
  contact/page.tsx
  tokens.css              design tokens, single source of truth
  globals.css
components/
  capiz/CapizField.tsx    WebGL hero (client)
  capiz/CapizFallback.tsx static SVG field
  capiz/shaders.ts        GLSL source
  capiz/useCapizSupport.ts capability gate
  chrome/MullionGrid.tsx
  chrome/MarginaliaRail.tsx
  chrome/SiteNav.tsx
  chrome/SiteFooter.tsx
  chrome/LogoMark.tsx     neutral placeholder, single swap point
  chrome/CommandNav.tsx   Cmd/Ctrl-K navigation, carried from v1
  motion/MullionReveal.tsx
  motion/ProcessLantern.tsx
  sections/*.tsx
  ui/Button.tsx  Field.tsx  Disclosure.tsx
content/
  en.ts  fil.ts  index.ts  types.ts
public/
  README.md               image slot specification
```

Each unit has one purpose and a declared interface. Components stay small enough
to hold in context; a file growing past ~300 lines is a signal to split it.

**No UI kit.** shadcn or any component library would reintroduce the template
look this rebuild exists to escape. Every component is hand-built.

### 8.1 Stack

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4 (CSS-first
`@theme`), `motion` for orchestration, `ogl` for the hero shader, `next/font` for
all typefaces.

### 8.2 Forms

Contact and launch-list forms use server actions with real field validation,
posting to a stub handler that logs and returns success. The UI states plainly
that notarization requests are not being accepted. Nothing pretends to be a
working intake.

## 9. Content guardrails

Carried from v1 unchanged, because they are correct:

- No fabricated product screenshots, testimonials, client logos, or metrics.
- Persistent "Information only · Not legal advice."
- Compliance line in the footer covering availability, document eligibility, and
  the Electronic Notary Public's assessment.
- Every substantive claim traceable to A.M. No. 24-10-14-SC.
- Diagrams are honest CSS/SVG representations of *planned* interfaces, labelled
  as such.

## 10. Accessibility

WCAG 2.2 AA.

- Contrast verified for narra-on-pearl and every use of sun.
- Decorative canvas is `aria-hidden`.
- Skip link; focus rings appear instantly with no transition.
- Command navigation traps focus in a native dialog and closes on Escape.
- Forms keep stable helper and error space so layout does not shift on error.
- Full reduced-motion path.

## 11. Testing

- Route smoke tests — every route renders its heading and required disclaimer.
- Content dictionary completeness — `fil` covers every key present in `en`.
- Accessibility — axe pass on each route with zero violations.
- Token contrast assertion for the core text pairings.

Coverage percentage is not a meaningful target for a marketing site; these four
checks are.

## 12. Risks and open questions

**R1 — Script correctness (open).** The marginalia watermark renders `ᜉᜆᜓᜈᜌ᜔`
(*patunay*, "proof/attestation") in Baybayin, composed from abugida rules by a
non-native reader. **This must be verified by a native reader before launch.**
Mitigation if unverified: drop the glyph. The marginalia rail is structural and
does not depend on the script.

**R2 — WebGL against the real market.** The Philippines is overwhelmingly mobile,
weighted toward mid and low-end Android. The shader hero is both the signature
moment and the likeliest source of real-user harm. Mitigation: hard capability
gating with aggressive fallback. Escalation if field data warrants: SVG field as
the mobile default, shader on desktop only.

**R3 — Kitsch.** "Capiz" can tip into decoration. The governing rule from §2 is
the control: light and structure only, and every element must be justifiable by
the thesis.

**R4 — Source document not machine-readable.** The copy of A.M. No. 24-10-14-SC
in `enotaryhub/docs/` is a scanned image with no text layer. Claims in v2 are
inherited from v1's vetted copy rather than re-derived from the PDF. Any new
legal claim requires human verification against the source.

**R5 — Slogan versus launch status.** See §3. "Now" implies availability the
product does not yet have. Managed, not resolved.

## 13. Logo and imagery

The logo is a **neutral placeholder** by explicit decision — a geometric mark on
the eight-axis construction, correct dimensions, one clean swap point in
`components/chrome/LogoMark.tsx`.

`public/README.md` specifies every image slot: dimensions, aspect ratio, purpose,
and alt text, so imagery can be produced by a designer or an image model without
reverse-engineering the layout.
