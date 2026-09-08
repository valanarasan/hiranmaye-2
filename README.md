# Hiranmaye Digital

Marketing site for HIRANMAYE DIGITAL — a white-themed, minimal five-page site
with a WebGL "Liquid Gold" hero.

**Brand:** navy `#101f36` carries the dark weight, gold `#cf9a28` is the single
accent, and the page stays white. Playfair Display (the wordmark's own Didone)
for headlines, Inter for everything else.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run format     # prettier
```

Node 20+ recommended (built and verified on Node 22).

## The hero

`src/components/three/` holds the WebGL scene: a raymarched signed-distance
field. Several spheres orbit on different frequencies and are joined with a
smooth minimum, so the surface reads as one liquid body that never repeats.
The pointer subtracts a soft sphere — a dent that relaxes out over about a
second — and scroll slowly turns the form.

Shading is a procedural studio. There is no HDR file to download: the
environment is generated in the shader (dark ground, bright room, one crisp
horizon, a strip softbox above and a fill card below) and tinted by the brand
gold. A hard-ish horizon in the reflection is what makes a surface read as
polished metal rather than plastic. Rays that miss a bounding sphere are
discarded immediately, so empty pixels cost almost nothing, and the distance to
the surface measured in pixels gives a free antialiased silhouette.

Three independent gates decide whether it runs, each owned by its own hook:

| Gate | Hook | Question |
| --- | --- | --- |
| Capability | `useWebGLSupport` | WebGL present, ≥4 GB RAM, ≥4 cores? |
| Consent | `useReducedMotion` | Has the user asked for less motion? |
| Timing | `useDeferredMount` | Is the browser idle yet? |

If any gate says no, `SceneFallback` renders instead — a still of the same gold
body built from gradients, at zero JavaScript cost. `three` is behind a `React.lazy` boundary and
is the only dynamic import in the app, so it never touches the initial bundle.
`FrameGovernor` samples real frame rate and steps device pixel ratio down if the
scene drops below 48 fps, and the render loop stops entirely once the hero
scrolls out of view.

Scene size, viscosity, placement and colours live in `src/content/scene.ts` —
tune the hero there rather than in the GLSL. The body is sized as a fraction of
viewport height, so it holds the same share of the screen on a laptop and on a
5K display.

## Architecture

```
src/
├── app/            router, providers, error boundary
├── components/
│   ├── primitives/ Button, Text, Container, Section, Stack, Reveal, Chip,
│   │               Accordion, Field, Marquee, SectionHeader
│   ├── layout/     Header, Footer, RootLayout, SmoothScroll, transitions
│   └── three/      WebGL scene, shaders, fallback, gate
├── content/        ALL copy, typed — the only place text lives
├── features/       one folder per page: home, about, services, insights, contact
├── hooks/          every piece of behaviour, extracted
├── lib/            cx, clamp/lerp/damp
├── pages/          route entry points, lazily loaded
├── styles/         tokens, reset, typography
└── types/          content and UI contracts
```

**SOLID, as it lands here**

- **SRP** — a component either computes or renders, never both. Animation,
  measurement and media-query logic all live in `hooks/`. One `.module.css`
  per component; no global styles beyond tokens and reset.
- **OCP** — components extend through props and composition. Adding a twelfth
  service is one object in `content/services.ts` and zero component edits.
- **LSP** — `BaseProps` (`className`, `style`, `id`, `children`) is honoured by
  every primitive, and `className` always merges rather than overrides, so any
  primitive is drop-in swappable.
- **ISP** — narrow interfaces. `ServiceIndex` receives the services and the
  active id; it never computes the active id. `Field` takes a label, an
  optional error and a render prop, and never learns the control's type.
- **DIP** — sections depend on the interfaces in `types/content.ts`, never on
  the concrete objects. Swapping `content/` for a CMS fetcher touches one
  module. The 3D scene reads its shape from an injected `SceneConfig`.

**Patterns** — container/presenter, compound components (`Accordion.Item`),
render props (`Field`), custom hooks for all behaviour, atomic layering
(primitives → sections → features → pages), feature-sliced folders, barrel
exports, `@/` path alias.

## Styling

CSS Modules with PostCSS nesting. All colour, type, spacing, radius and motion
values are CSS custom properties in `src/styles/tokens.css` — nothing below that
file hard-codes a value. Type scale is fluid (`clamp`), so there are very few
breakpoints. Dividers are hairlines rather than shadows, and the gold accent
(`--accent`) appears roughly once per viewport by design.

## Content

Everything the site says lives in `src/content/`, typed against
`src/types/content.ts`. Editing copy never means opening a component.

## Notes

- The lotus mark is drawn as five stroked paths in `LotusMark.tsx`, so it stays
  crisp at any size and inherits `currentColor`. The tagline is set in Playfair
  italic rather than the logo's calligraphic script — say the word if you want
  the script face instead.
- Routing is client-side (`react-router-dom`). Deploying to a static host needs
  an SPA rewrite (all paths → `index.html`) — on Vercel/Netlify this is one
  line in `vercel.json` / `_redirects`.
- `useSeo` sets per-route title and meta tags at runtime. For crawler-visible
  metadata, prerender the five routes at build time or move to an SSR framework.
- The contact form and newsletter validate and show success states but post
  nowhere yet. `useContactForm` takes an injected `onSubmit`, so wiring a real
  endpoint is a one-line change at the call site in `ContactForm.tsx`.
- Contact details in `src/content/site.ts` and `src/content/contact.ts` are
  placeholders.
