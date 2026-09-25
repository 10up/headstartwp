---
'@headstartwp/core': minor
'@headstartwp/next': minor
---

Replace the example and starter projects with LLM-ready PRDs.

The `projects/` and `test-projects/` workspaces have been removed from the repository. Each one is now
documented as a product requirements document in [`prds/`](https://github.com/10up/headstartwp/tree/develop/prds),
written so an LLM coding agent can stand up an equivalent project against the package versions you are
installing. Start with `prds/00-foundation.md` plus the PRD that matches your use case (most new projects
want `prds/app-router-starter.md`).

**Heads up:** `npx create-next-app -e https://github.com/10up/headstartwp/tree/trunk/projects/wp-nextjs-app`
no longer works once this ships to `trunk`. The Quick Setup docs now describe the PRD workflow instead. The
last commit containing the legacy projects is `1c5d2be` if you need to reference their code.

No package APIs changed in this release.
