---
"@headstartwp/next": patch
---

Fix an annoying bug that would require deleting the .next/cache folder after changing headless.config.js or .env files. Now you only need to restart the next.js server after changing those files.
