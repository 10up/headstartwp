---
"@10up/headless-core": patch
---

[#304](https://github.com/10up/headless/pull/304) fix: post path mapping for ut8encoded slugs.

Previously the code that would match the path of the current page with post's links would always fails for any URLs that contains encoded UTF-8 characters. This patch fixes the issue.
