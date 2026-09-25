---
'@headstartwp/core': patch
'@headstartwp/next': patch
---

Publish from the new automated Release workflow with npm provenance.

Packages are now published by a single GitHub Actions workflow (`.github/workflows/release.yml`) using npm
trusted publishing, so every release carries a signed provenance attestation linking it to the commit and
workflow run that built it. `package.json` now declares `repository` (required for provenance). No runtime
changes.
