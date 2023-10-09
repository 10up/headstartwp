const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		// setupNodeEvents(on, config) {
		// implement node event listeners here
		// },
		// The baseUrl should be where the WP site dedicated to e2e tests is hosted.
		baseUrl: 'http://localhost:3000/',
	},
});
