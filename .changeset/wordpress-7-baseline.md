---
'@headstartwp/block-primitives': major
---

Target the WordPress 7 package generation.

`@wordpress/*` peer dependencies move to the WP 7 line (`block-editor@^15.13.2`,
`data@^10.40.1`, `components@^32.2.1`, `blob@^4.40.1`). Consumers on the WP 6.5
generation will need to upgrade alongside this release.

The `@types/wordpress__block-editor` and `@types/wordpress__block-library`
dependencies are removed — the WP 7 packages ship their own types, and the
DefinitelyTyped packages pulled a conflicting older `@wordpress/components` into
the tree. `DropdownProps` is now derived from the public `Dropdown` component
rather than a deep `build-types/` import, which `@wordpress/components@32` no
longer exposes through its `exports` map.
