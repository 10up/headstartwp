---
"@10up/headless-core": patch
---

Improve redirect handling in `fetchRedirect`.

It nows detects redirects that might cause infinite loop and ignore redirects for `wp-login.php`, `wp-register.php` and `wp-admin`.
