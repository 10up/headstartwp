---
"@headstartwp/headstartwp": patch
---

Fix: Add null coalescing check for context parameter in extend_post_content to prevent PHP 8+ "Undefined array key" warning. Fixes #940
