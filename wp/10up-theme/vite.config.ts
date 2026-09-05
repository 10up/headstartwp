import { createLogger, defineConfig } from 'vite';
import { wp } from '@10up/wp-vite-plugins';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssCustomMedia from 'postcss-custom-media';

/**
 * Vite replaces 10up-toolkit's webpack build.
 *
 * Entry keys are chosen so the emitted filenames match what the theme's PHP
 * already enqueues (dist/js/<name>.js, dist/css/<name>.css) — see
 * includes/core.php and includes/utility.php's get_asset_info().
 */

// `url()` references to files the theme ships via wpCopyAssets are resolved by
// WordPress at runtime, not by the bundler; silence that specific warning only.
const logger = createLogger();
const warn = logger.warn.bind(logger);
logger.warn = (msg, opts) => {
	if (!(typeof msg === 'string' && msg.includes("didn't resolve at build time"))) {
		warn(msg, opts);
	}
};

export default defineConfig({
	customLogger: logger,

	plugins: [
		wp({
			blocksDir: './includes/blocks',
			blocksStylesDir: './assets/css/blocks',
			copyAssetsDir: './assets',
		}),
	],

	resolve: {
		// Ported from the old webpack.config.js: @headstartwp/block-primitives
		// ships a `block-editor` export condition that must win over `default`.
		conditions: ['block-editor', 'module', 'browser', 'development|production'],
	},

	css: {
		postcss: {
			plugins: [
				// The @custom-media definitions live in one file and are used by
				// stylesheets that never @import it (per-block styles especially),
				// so inject them into every file rather than relying on imports.
				postcssGlobalData({
					files: ['./assets/css/frontend/global/media-queries.css'],
				}),
				postcssCustomMedia(),
			],
		},
	},

	build: {
		outDir: 'dist',
		// `target` is deliberately left at Vite's default: lowering it breaks
		// wpScriptDedupe. Only cssTarget is lowered, to stop lightningcss
		// rewriting `@media (min-width: 64em)` into range syntax.
		cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14', 'ios14'],
		rollupOptions: {
			input: {
				'js/admin': './assets/js/admin/admin.js',
				'js/editor-style-overrides': './assets/js/admin/editor-style-overrides.js',
				'js/frontend': './assets/js/frontend/frontend.js',
				'js/shared': './assets/js/shared/shared.js',
				'js/styleguide': './assets/js/styleguide/styleguide.js',
				'js/block-editor-script': './includes/block-editor-script.js',

				// Previously imported from the JS entries; now first-class entries.
				'css/admin': './assets/css/admin/admin-style.css',
				'css/editor-style-overrides':
					'./assets/css/frontend/editor-style-overrides.css',
				'css/frontend': './assets/css/frontend/style.css',
				'css/shared': './assets/css/shared/shared-style.css',
				'css/styleguide': './assets/css/styleguide/styleguide.css',
			},
			output: {
				entryFileNames: '[name].js',
				assetFileNames: '[name][extname]',
			},
		},
	},
});
