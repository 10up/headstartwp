---
'@headstartwp/headstartwp': minor
---

Raise the PHP floor to 8.2 and pin the test environment to WordPress 7.1.1.

`composer.json` now requires `php >=8.2` (was `>=8`), and the plugin header
declares `Requires PHP: 8.2` so WordPress blocks activation on older PHP rather
than fataling. PHPUnit runs against PHP 8.2 and 8.4.

`.wp-env.json` pins `core` to `WordPress/WordPress#7.1.1`. It previously
tracked whatever the latest WordPress release happened to be, which meant core
changes could break CI on unrelated PRs. **After pulling this branch, run
`wp-env destroy` once** so your local container picks up the pinned version.
