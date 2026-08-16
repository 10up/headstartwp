# html-react-parser 3 → 6 — parity audit findings

**Verdict: one behavioural difference across the whole audit, and it is benign.**

`html-react-parser` `3.0.16 → 6.1.7` was the highest residual risk in the React 19 upgrade: three
majors on the code path that turns WordPress block HTML into React elements — HeadstartWP's core
value proposition — with nothing in the repo auditing it. Its failure mode is a subtle markup
difference, not an error, so a green `tsc` and a green test suite both pass straight through it.

This directory is the audit that closes that gap.

## Running it

```sh
npm install --legacy-peer-deps     # in this directory, once — installs the v3 baseline
node parity/run.mjs                # server build (htmlparser2)
node parity/run-client.mjs         # browser build (jsdom)
node parity/run.mjs --verbose      # full detail for any divergence
```

Both exit non-zero on divergence, so either can gate a future bump.

## Why the baseline is installed here and not as a devDependency

`html-react-parser@3` peers `react <=18`; the repo runs React 19, so adding it to the monorepo graph
makes `npm install` unresolvable. An npm alias does not help — the *resolved* package name is still
`html-react-parser`, so a nested `overrides` entry keyed on the alias never matches. Installing it
into `parity/node_modules` as a non-workspace package keeps the old copy out of the dependency graph
and out of the published package entirely.

## What was compared

60 cases per build (120 total), each compared two independent ways:

1. **Rendered markup** via `renderToStaticMarkup` — what users actually see. Blind to prop
   differences React normalises away.
2. **Normalised element tree** — type, props and children. Catches prop-level divergence that
   renders identically today, and it is what the `replace` callbacks in `BaseBlocksRenderer`
   branch on.

Fixtures (`fixtures.mjs`) are real Gutenberg output shape, not minimal HTML:

- **22 block fixtures** — one per block component in `src/react/blocks`: paragraph, heading, image,
  button(s), columns, cover, group, list, quote, pullquote, code, preformatted, verse, table,
  separator, spacer, audio, file, media-text, embed, gallery.
- **16 edge-case fixtures** — the silent-failure surface: `style-to-js` 1 → 2 (vendor prefixes,
  `!important`, CSS custom properties, `url()` containing a semicolon), attribute mapping
  (`class`/`for`, boolean, `data-*`, `aria-*`, hyphenated, unknown), entity decoding, whitespace-only
  text nodes, void elements, malformed/crossed tags, comments and WP block delimiters, SVG attribute
  casing, raw-text `<script>`/`<style>`, implied `<tbody>`, mixed root nodes, empty input.

Three scenarios per fixture: bare `parse()`, the **`replace` + nested `domToReact` path** that
mirrors `BaseBlocksRenderer` (where the v5 signature change lives), and a node-shape check that
`type`/`name`/`attribs`/`children` still satisfy the duck-typed `isElement()` in `src/dom/index.ts`
(which deliberately avoids `instanceof` — issue #504 — and would otherwise break outright with two
domhandler copies installed).

## Results

| Build | Cases | Markup divergences | Tree divergences | Node-shape failures |
|---|---|---|---|---|
| Server (htmlparser2) | 60 | 0 | 0 | 0 |
| Browser (jsdom) | 60 | 0 | 0 | — |

Both runs include a **self-test** that feeds the comparison known-divergent input and asserts it
notices. A harness that cannot detect anything also reports "clean"; the self-test is what makes
"PARITY CLEAN" mean something. 6/6 detectors pass server-side, 5/5 browser-side.

## The one difference: `children: null` → `undefined` on void elements

v3 emitted `children: null` in the props of elements with no children; v6 leaves it `undefined`.

```
v3: <hr class="x" />  →  props { className: 'x', children: null }
v6: <hr class="x" />  →  props { className: 'x' }
```

**Benign.** React treats `null` and `undefined` children identically — both render nothing — which is
why all 120 rendered-markup comparisons are byte-identical. The comparison engine normalises the two
as equivalent (`run.mjs`, `normalise()`); left unnormalised it produced 34 false positives that
buried everything else.

It was independently confirmed from the other direction: the pre-existing `parseSeo` inline snapshot
in `src/react/utils/__tests__/parseSeo.ts` failed on exactly this and nothing else, and was updated
in the same commit. Two different methods finding the same single difference — and the suite finding
nothing the audit missed — is the strongest evidence available that the bump is clean.

**Consumer-visible caveat worth carrying into the v2 release notes:** because `@headstartwp/core`
does `export * from 'html-react-parser'`, any consumer branching on `element.props.children === null`
will now take the other path. Checks should be truthiness-based, not `=== null`.

## Code changes the bump required

Both in `BaseBlocksRenderer.tsx`, both caught by `tsc` (contrary to the brief's expectation that this
bump would be invisible to the type checker — the *signature* changes are visible; only *behaviour*
was not, which is what this audit covers):

1. `Element['children']` is now `ChildNode[]`, which includes `CDATA`; `domToReact` takes `DOMNode[]`,
   which does not. Added `getChildNodes()` to `src/dom/index.ts` — it filters rather than casts,
   because the filter is actually true (`CDATA` only arises in XML mode and `html-dom-parser` parses
   HTML). Exported, because any consumer recursing with `domToReact(element.children, …)` hits the
   identical mismatch.
2. The `replace` callback signature gained an `index` parameter; the nested callback now forwards it.

One test-infrastructure change: `domhandler@6` and friends ship ESM-only builds, and jest does not
transform `node_modules` by default, so requiring them from a CJS test throws *"Cannot use import
statement outside a module"*. Root `jest.config.js` gained a `transformIgnorePatterns` carve-out for
that subtree. This broke all 25 `@headstartwp/next` suites until fixed — worth knowing, because
consumers with their own jest setups will hit it too and it belongs in the v2 upgrade notes.

## Known limits of this audit

- **jsdom is not a browser.** The client run approximates a real engine — the same approximation the
  existing jest suite makes. Genuine engine differences (entity handling, implied elements) could
  still differ in Safari or Firefox.
- **The corpus is representative, not exhaustive.** It covers the blocks HeadstartWP ships renderers
  for plus the known-fragile parser surface. Third-party or ACF blocks with unusual markup are not
  represented; add fixtures rather than assuming coverage.
- **`wpKsesPost` runs before the parser in the real path.** The audit feeds raw markup to isolate
  parser behaviour. Sanitisation is covered by its own suite.
