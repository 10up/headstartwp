# HeadstartWP → React 19 · Handoff Brief

Prepared for a fresh Cowork task run **On your computer** (desktop app → "Run this task" picker, top right).
The prior session ran in the cloud and could not install dependencies or commit — see *Why this brief exists* at the end.

---

## 1. Objective

Three deliverables, in order:

1. Upgrade the **digital-democracy** project to React 19, using PR #951 and the reviewed upgrade playbook as guidance.
2. Feed what breaks back into the HeadstartWP draft PR — https://github.com/10up/headstartwp/pull/951.
3. In that PR, bump HeadstartWP to **v2** (major) and handle the **pages router** (legacy in Next.js).

## 2. Decisions already made by Preston

| # | Decision | Choice |
|---|---|---|
| D1 | Sequencing | **digital-democracy first.** Link the local headstartwp branch in, let real breakage drive the library changes. |
| D2 | Pages router in v2 | **Deprecate only.** `@deprecated` JSDoc + runtime warnings on pages-router APIs. Code and example projects keep working; removal targeted at a later major. |
| D3 | Git | **Commit locally, do not push.** Commits on `feature/react-19-upgrade` (headstartwp) and `feat/react-19` (digital-democracy). Preston reviews and pushes. |
| D4 | Peer deps | **React 19 only** for the published packages. ⚠️ See *Open conflict* §6.1 — this needs one carve-out. |

## 3. Environment facts (verified)

**digital-democracy** — `/Users/preston10up/Local Sites/digital-democracy/app/digital-democracy`

- On branch `feat/react-19`, clean working tree, `node_modules` installed.
- pnpm 11.15.1 via corepack, Node >= 22, Turborepo, `packages/*` workspaces.
- Currently resolves `react@18.2.0`, `@headstartwp/core@1.6.1`, `@headstartwp/next@1.5.2`.
- `apps/web`: Next `^15.5.18`, react/react-dom pinned **exactly** `18.2.0`, `@types/react@^18.3.26`.
- `packages/ui`: same React 18.2.0 pins in devDeps; 88+ components. Notable React-coupled deps —
  `@headlessui/react@^2.2.9`, `@floating-ui/react@^0.27.16`, `react-player@^2.16.1`,
  `embla-carousel-react@^8.6.0`, `@10up/elasticpress-react@^2.1.2`, `@mantine/hooks@^7.17.8`,
  `swr@^2.3.6`, `use-places-autocomplete@^4.0.1`. Also `@vercel/og@^0.11.1` and
  `next-nprogress-bar@^2.4.7` in `apps/web`.
- Read `CLAUDE.md` at the project root first — it is authoritative on commands, code style (tabs,
  4-width, 100 cols, single quotes), the VIP npm-workspace deploy quirk, and `_docs/`.

**headstartwp** — `/Users/preston10up/code/headstartwp`

- On branch `feature/react-19-upgrade` (tracks origin), **`node_modules` not installed** — `npm install` needed first.
- npm@10.5.0 workspaces (not pnpm), Turborepo 2, Changesets.
- Packages: `core`, `next`, `block-primitives`, `epio-search`, `next-redis-cache-provider`.
- Versions are independent: core 1.6.1, next 1.5.2, block-primitives 0.1.0, epio-search 1.0.0,
  next-redis-cache-provider **already 2.0.0**.

**Housekeeping — do this first.** The cloud session left `_to_delete/` folders (stale git `index.lock`
files it could not remove). Delete both:

```sh
rm -rf "/Users/preston10up/code/headstartwp/_to_delete"
rm -rf "/Users/preston10up/Local Sites/digital-democracy/app/digital-democracy/_to_delete"
```

## 4. What PR #951 already contains

Author: wadebekker. Draft, awaiting review from chriseagle. 56 files, all 5 packages + 8 example/test projects.

**Root `package.json`** — `overrides` moved from `react/react-dom 18.3.1` to `19.2.7`, plus pins for
`typescript 5.9.3`, `next 15.5.20`, `@types/react|react-dom ^19`, `webpack 5.105.2`,
`webpack-dev-server 5.2.1`, and a nested override forcing React 19 into `@10up/block-components`.
Adds `postinstall: node scripts/fix-nested-types.js` (new script, works around a stale nested
`@wordpress/data` copy breaking types under Node 20).

**The important fix — dual React instances.** `packages/block-primitives/tsconfig.json` switches
`"jsx"` to `"react"` (classic transform). Rationale in the PR: the package's output is bundled into
WordPress block-editor builds where React is externalised to WP core's global copy by
`@wordpress/dependency-extraction-webpack-plugin`, which externalises bare `react`/`react-dom` but
**not** `react/jsx-runtime`. The automatic transform therefore bundled a second React runtime whose
elements WP's React 18.3.1 reconciler silently did not recognise. Classic transform emits
`React.createElement` and resolves through the global. This is the single most instructive change in
the PR — carry the same reasoning into anything digital-democracy ships into the WP editor.

**Global JSX namespace removal** (React 19 dropped the global `JSX` namespace):

- `core/src/react/blocks/YoutubeLiteBlock.tsx` — `declare global { namespace JSX }` → `declare module 'react' { namespace JSX }`.
- `core/src/react/components/Menu.tsx` and all four `epio-search` components — return type `JSX.Element` → `ReactElement` imported from `react`.
- `block-primitives` — explicit `import React from 'react'` added to every `.tsx` (required by the classic transform).

**Other changes:** `@wordpress/*` bumped hard (`block-editor ^12.21 → ^16`, `components ^27 → ^37`,
`data ^9.23 → ^10`), `@10up/block-components ^1.19.3 → ^1.22.3`, `@testing-library/react` aligned to
`^16.3.0` (block-primitives was on ^14), `@testing-library/dom ^9 → ^10`. `defaultProps` removed
from function components and `prop-types` dropped from the example projects, with
`react/prop-types: off` added to two `.eslintrc.js` files. `block-primitives/src/shared/types.ts`
stops importing the now-unexported `@wordpress/components/build-types/dropdown/types.d.ts` and
mirrors the prop shape locally. The `parseSeo` inline snapshot was regenerated — React 19 elements
serialise as raw objects with `Symbol(react.transitional.element)` rather than JSX.

**Not done yet:** no changeset (PR notes one is required to trigger version bumps), no v2 bump, no
pages-router work.

## 5. Key points from the reviewed upgrade playbook

An executive brief reviewing the `react-node-major-upgrade` skill against HeadstartWP (verified
2026-08-12 against the GitHub Advisory Database, npm registry, nextjs.org/support-policy, react.dev,
make.wordpress.org; versioning strategy adversarially reviewed and re-verified). Load-bearing points:

- **~70% of the playbook transfers**: discovery scans, BEFORE/CORE/AFTER sequencing, decision gates,
  append-only D##/R## decisions log, package ledger. Use these.
- **The verification harness does not transfer.** `build-equivalence-audit.sh` proves inertness by
  diffing content-hashed Next.js chunks; HeadstartWP's packages compile with `tsc -b` to
  `dist/cjs` + `dist/mjs` — nothing to fingerprint. It *does* run unchanged against the
  `projects/*` Next apps, which is a better signal anyway since they are consumers.
- **Renovate the test harness before the core bump.** `msw@^0.35` (current 2.x) needs a full
  request-handler rewrite; `@testing-library/react` was split across packages; React 19 moved `act`
  out of `react-dom/test-utils`. A mis-migrated mock silently changes what is asserted. Get the
  suite green on React 18 *first*, so the guard is trustworthy.
- **`html-react-parser@^3` → `^6`** for React 19 support — three majors, on the code path that turns
  WordPress block HTML into React elements. This is HeadstartWP's core value proposition and nothing
  audits it. Build a fixture-corpus parity harness over representative WP markup; failures present as
  subtle markup differences, not errors. **Highest residual risk in the whole job.**
- **RSC / `react-server` condition.** `core` ships a `react-server` export condition and an `./rsc`
  entry; `next` exports `./app` and `./middlewares`. A green `tsc` proves nothing here — the App
  Router example projects need hand-verification.
- **Bounded peer ranges, not open-ended.** `next >= 12.0.0` is how v1 became a liability: every 2026
  high-severity Next advisory reaching into majors 12–14 is first patched only in 15.5.x, so there is
  nothing upstream to backport. Recommended for v2: `react ^19`, `next ^15.5.21 || ^16.2.11`,
  internal `@headstartwp/core: ^2.0.0`, `engines.node >= 20.9.0`.
- **v1 already permits React 19** — `core@1.6.1` peers `react >= 17.0.2`, open-ended upward. So v2
  removes nothing from consumers; it *adds* a tested line. The root `overrides` pin only affects the
  monorepo's own dev install.
- **Next 16 does not force React 19** — `next@16.3.0` peers `react ^18.2.0 || ^19.0.0`; only the App
  Router requires 19. Dropping React 18 is a maintenance-cost choice, so present it as one.
- **Two transitive floors permit a fixed version but floor on a vulnerable one**: `path-to-regexp ^6.2.0`
  in core (ReDoS, CVE-2024-45296, fixed 6.3.0) and `loader-utils ^3.2.0` in next (ReDoS,
  CVE-2022-37603, fixed 3.2.1). Fresh installs are clean; consumer lockfiles pinned at the floor are
  not. Ship floor bumps in a **v1 patch, before v2**.
- **`changeset publish` tags `latest` by default**, even for a lower version — the first v1 backport
  after v2 ships will hijack `latest`. Needs a `v1` branch (none exists) and a workflow publishing
  `--tag latest-v1`. Stale `next`/`app` dist-tags (both on 1.5.0 prereleases) should be cleared in the
  same pass.
- **Repo hygiene**: no `SECURITY.md`, private vulnerability reporting disabled. Close both before
  publishing any supported-versions statement.
- **Bundle budget**: two workflows enforce 148,480 bytes; a React 19 bump will move it. Someone must
  decide what regression is acceptable.

## 6. Open items needing a decision

### 6.1 Conflict: "React 19 only" vs `block-primitives` ⚠️

Preston chose React-19-only peers (D4). The playbook contradicts this for one package: **WordPress
7.1 ships React 18.3**. React 19 was enabled in Gutenberg, reverted days later after breaking
plugins, and punted past 7.1 — testable only behind an experimental flag from Gutenberg 23.4.
`block-primitives`' own peer `@wordpress/components@^27` itself peers `react ^18`. A React-19-only
`block-primitives` would be **unusable in its only runtime**.

Recommendation to put to Preston: `core`, `next`, `epio-search` go v2 with `react ^19`;
`block-primitives` stays on `0.x` with `react ^18 || ^19` and tracks WP core's own migration. Note
PR #951 already bumps `@wordpress/components` to `^37` — check what React that peers before relying
on the current pins.

### 6.2 "v2" is partly taken

`@10up/next-redis-cache-provider` is already at 2.0.0, and Changesets has `fixed: []` / `linked: []`
so nothing couples the majors. Decide whether "HeadstartWP v2" means core+next only (recommended,
via a Changesets `linked` group) or a forced lockstep across all five packages.

### 6.3 Cap v1's React peer?

Capping `v1` at `react < 19` is honest but breaks `npm install` for anyone already on v1 + React 19 —
a breaking change inside a 1.x release. Leaving it open keeps an untested compatibility claim. A loud
install failure beats a silent untested combination, but this is a deliberate maintainers' call.

## 7. Recommended sequence

**Phase 0 — discovery.** `npm install` in headstartwp. Open an append-only decisions log
(`D##` decision · why · alternatives · consequences; `R##` for package rows). Run a workspace-aware
peer scan (walk each workspace's `node_modules` for `peerDependencies.react` ranges excluding 19 —
the hoisted root alone will lie) and an install-time deprecation→parent map. Baseline
`build-equivalence-audit.sh` against the six `projects/*` Next apps.

**Phase 1 — digital-democracy (D1).** Build `packages/core` + `packages/next` from
`feature/react-19-upgrade`; wire into `apps/web` and `packages/ui` via pnpm `overrides`/`link:` so the
app resolves the branch. Bump react/react-dom to 19 and `@types/react|react-dom` to `^19` in both
workspaces; add root pnpm `overrides` to force a single React copy (a second copy is the failure mode
PR #951 already hit). Then `pnpm run typecheck`, `pnpm run lint`, `pnpm --filter=web run build` and
work the errors. Expect: global `JSX.Element` → `ReactElement`, `useRef` now requires an argument,
`ref` as a plain prop / `forwardRef` no longer needed, removed `propTypes`/`defaultProps`, and
`react-player@2` (v3 is the React 19 line). **Log every error that points at a library-side fix** —
that list is the input to Phase 2.

**Phase 2 — feed back into #951.** Apply those library-side fixes on
`feature/react-19-upgrade`. Renovate the test harness (msw v2, aligned testing-library, `act` import)
*before* touching core. Build the `html-react-parser` 3→6 parity harness.

**Phase 3 — v2 + pages-router deprecation.** Changeset marking `core`/`next` major; bounded peers per
§5; `engines.node >= 20.9.0`. Add `@deprecated` JSDoc plus a one-time `console.warn` to the
pages-router entry points in `packages/next` (`HeadlessApp`, `getHeadstartWPProps` and friends) per D2
— keep the code and the example projects working. Document the removal target and the
supported-versions statement.

**Phase 4 — verify.** headstartwp: `turbo run build`, `test`, `lint` across packages and example
projects. digital-democracy: build + typecheck + lint, plus a real browse of the CA and HI sites
against local WordPress/Redis/Elasticsearch. Confirm exactly one React resolves
(`npm ls react` / `pnpm why react`) and no dual-instance warnings. Hand-verify App Router and RSC
routes — `tsc` will not catch those.

Commit locally on both branches; **do not push** (D3).

## 8. Why this brief exists

The prior session ran in Anthropic's cloud sandbox. Two limits made the work impossible there, neither
of them a permission that can be granted:

- **No network on the Mac-side shell.** `curl https://registry.npmjs.org` → `403 from proxy after
  CONNECT`; `corepack pnpm` fails fetching its tarball. A dependency upgrade is nothing but
  install-and-iterate.
- **No delete on mounted folders.** `rm` → `Operation not permitted`, so git leaves stale
  `.git/index.lock` files behind on every indexing operation.

Folder read/write access was correctly granted and verified working. Running the task **on your
computer** removes both limits.
