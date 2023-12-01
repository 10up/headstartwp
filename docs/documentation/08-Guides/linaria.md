# Linaria (CSS-in-JS)

HeadstartWP offers a straightforward integration with [Linaria](https://github.com/callstack/linaria), a zero-runtime CSS-in-JS solution. To use it, simply install the following linaria packages.

```
npm install --save-dev @linaria/babel-preset @linaria/core @linaria/react @linaria/shaker @linaria/webpack-loader
```

The [withHeadstartWPConfig](/docs/api/namespaces/headstartwp_next.config/#withheadstartwpconfig) function will detect the presence of the Linaria packages and will enable the build steps necessary to compile Linaria.

:::caution
If you're on a monorepo setup, these packages should be installed on the Next.js project.
:::caution