import { defineConfig } from 'vite-plus';

/**
 * Repo-wide Vite+ config.
 *
 * This file is the root toolchain config only -- it does no bundling. Each
 * workspace that builds has its own vite.config.* alongside its package.json.
 *
 * Oxlint (`vp lint`) replaces ESLint here. @10up/eslint-config pinned the repo
 * to ESLint 8 (EOL) via eslint-config-airbnb and @wordpress/eslint-plugin, and
 * was the source of the repo's remaining high-severity advisories.
 */
export default defineConfig({
	lint: {
		ignorePatterns: [
			'**/dist/**',
			'**/.next/**',
			'**/vendor/**',
			'**/node_modules/**',
			'wp/headless-wp/**',
		],
	},

	fmt: {
		ignorePatterns: [
			'**/*.css',
			'**/*.html',
			'**/*.json',
			'**/LICENSE.md',
			'**/dist/**',
			'**/.next/**',
			'**/vendor/**',
			'wp/headless-wp/**',
		],
	},

	// Replaces .lintstagedrc.json; run from .husky/pre-commit via `vp staged`.
	staged: {
		'*.{js,jsx,ts,tsx}': 'vp check --fix',
		// phpcs lives in the theme's composer vendor dir -- the only one in this repo.
		'*.php': './wp/10up-theme/vendor/bin/phpcs --extensions=php --warning-severity=8 -s',
	},
});
