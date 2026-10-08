---
'@headstartwp/next': minor
---

Deprecate the built-in linaria/wyw-in-js webpack integration in `withHeadstartWPConfig`.

The loader still runs when `@linaria/webpack-loader` or `@wyw-in-js/webpack-loader` is installed, but it now logs a deprecation warning and will be removed in the next major version. HeadstartWP no longer prescribes a styling solution — the example projects use plain CSS, and any styling approach (CSS Modules, Tailwind, CSS-in-JS) works. If you want to keep using linaria, configure the loader yourself via `nextConfig.webpack`.
