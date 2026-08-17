// v2 is app-router only. `previewHandler` and `revalidateHandler` were pages-router API route
// handlers and have been removed — use `previewRouteHandler` and `revalidateRouteHandler` from
// `@headstartwp/next/app` instead. `PreviewData` stays because the app-router preview handler
// shares the cookie payload shape.
export * from './types';
