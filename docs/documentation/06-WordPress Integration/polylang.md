---
slug: /wordpress-integration/polylang
---

# Polylang Integration

:::caution
Polylang Pro is required since only Polylang Pro offers the [REST API integration](https://polylang.pro/doc/rest-api/).
:::caution

It is possible to integrate with Polylang by enabling the integration in `headstartwp.config.js` and adding the supported locales to [Next.js config](https://nextjs.org/docs/advanced-features/i18n-routing).

```js title="headstartwp.config.js"
module.exports = {
	// other settings
	integrations: {
		yoastSEO: {
			enable: true,
		},
		polylang: {
			enable: true
		},
	},
};
```

```js title="next.config.js"
module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'fr', 'nl'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
  }
};
```
:::info
You need to make sure that the locales set in Polylang matches the locales set in Next.js config.
:::info

Enabling this integration will automatically add the `lang` attribute to all REST API calls made to WordPres (when using the data-fetching layer provided by the framework). The `lang` attribute will be set based on the current Next.js locale (`context.locale` or `context.defaultLocale`).