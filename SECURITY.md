# Security Policy

## Supported versions

| Version line | React | Next.js | Node | Status |
| --- | --- | --- | --- | --- |
| **2.x** (`@headstartwp/core`, `@headstartwp/next`, `@headstartwp/epio-search`) | `^19` | `^15.5.21 \|\| ^16.2.11` | `>=24.0.0` | Active — **app router only** |
| **1.x** | `>=17.0.2` | `>=12.0.0` | `>=18` | Supported for pages-router consumers; published under the `latest-v1` dist-tag |
| **0.x** (`@headstartwp/block-primitives`) | `^18 \|\| ^19` | `>=14.0.0` | `>=20.9.0` | Active — tracks WordPress core's own React version |

**The router split is the main thing to know.** v2 supports only the Next.js app router — the
pages-router APIs are removed, not deprecated. Projects still on the pages router should stay on
1.x, which remains supported for them rather than being security-only.

A note on what the 1.x row means in practice. `1.x` peers `react >= 17.0.2` and `next >= 12.0.0`,
both open-ended upward. Those ranges *permit* far more than is tested. In particular, every
high-severity Next.js advisory in 2026 reaching majors 12–14 is first patched only in 15.5.x, so
there is nothing to backport into those lines — running HeadstartWP 1.x on Next.js 12, 13 or 14
means running a Next.js that cannot be patched. v2's bounded ranges exist precisely to stop making
that claim.

`@headstartwp/block-primitives` deliberately tracks WordPress rather than this repo's React line: it
runs inside the WordPress block editor, which ships React 18.3 as of WP 7.1. It will move to a
React-19-only range when WordPress core does.

## Reporting a vulnerability

Please report security issues privately, **not** as a public GitHub issue.

Use [GitHub's private vulnerability reporting](https://github.com/10up/headstartwp/security/advisories/new)
on this repository. If that is unavailable to you, email the maintainers rather than opening an
issue.

Please include the affected package and version, a description of the impact, and reproduction steps
where possible. We will acknowledge receipt and keep you updated on remediation.

## Scope

This policy covers the published packages in this repository: `@headstartwp/core`,
`@headstartwp/next`, `@headstartwp/block-primitives`, `@headstartwp/epio-search` and
`@10up/next-redis-cache-provider`.

The example projects under `projects/`, `test-projects/` and `wp/` are demonstrations, not supported
software, and are out of scope.
