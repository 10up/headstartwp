---
"@10up/headless-core": minor
"@10up/headless-next": minor
"@10up/headless-wp-plugin": minor
---

Introduces a new feature: The PolyLang Integration. To use simply enable the integration

```js title="headless.config.js"
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
and add the supported locales to next.config.js.

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
