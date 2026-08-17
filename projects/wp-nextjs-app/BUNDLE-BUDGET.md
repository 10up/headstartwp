# Bundle budget

`nextBundleAnalysis.budget` in `package.json` is enforced by
`.github/workflows/nextjs_bundle_analysis-app-router.yml` against the **shared first-load JS**
(`__global`) of this project, gzipped.

## Current value

**112,000 bytes gzip**, set 2026-08-16.

## How it was derived

The previous value was 148,480 bytes. It was inherited from a time when two workflows enforced it —
one over this project and one over `projects/wp-nextjs`, the pages-router example. That project was
removed when v2 became app-router only, so this is now the only bundle under measurement and the
number had to be re-derived against it.

Measured by building this project on each branch and running `npx -p nextjs-bundle-analysis report`,
which is exactly what CI does:

| Branch | React | `__global` raw | `__global` gzip |
| --- | --- | --- | --- |
| `feature/v1-react-19-compat` | 18.3.1 | 278,767 | 85,850 |
| `feature/v2-react-19` | 19.2.7 | 330,304 | **101,229** |

**React 19 costs +15,379 bytes gzip (+17.9%)** on shared first-load JS. That is the honest price of
the upgrade, and it is worth stating plainly rather than burying: it is a real regression, accepted
deliberately.

The old budget would not have caught it. At 148,480 the guard carried 42% slack on v1 and would
still carry 32% on v2 — it would not fire until the bundle grew a further 47KB gzip, about three
more React-19-sized regressions. A budget that loose is not a guard.

112,000 gives ~10.6% headroom over the measured value: enough to absorb routine dependency drift
without a false alarm on every `npm update`, tight enough that a genuine regression trips it.
`budgetPercentIncreaseRed: 20` remains as the separate alarm on *change* between base and head.

## When to change it

Re-derive rather than nudge. Build this project, run the report, and set the budget to roughly the
measured value plus ~10%. Record the measurement in the table above so the next person can see
whether a change was a deliberate acceptance or a slow drift nobody noticed.

Note the v1 line still carries the old 148,480 value. That is deliberate — v1 is a maintenance line
and its measured bundle is 85,850, so the loose budget is harmless there and re-tuning it would be
churn on a branch whose point is stability.
