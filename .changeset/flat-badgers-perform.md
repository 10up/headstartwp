---
"@headstartwp/core": patch
"@headstartwp/next": patch
---

Fix: fetch calls made under getStaticProps now always includes a timestamp in the query to ensure it always get latest content from the api
