module.exports = {
	extends: ['@10up/eslint-config/react'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
		'import/core-modules': [
			'@10up/headless-core/react',
			'@10up/headless-core/utils',
			'@10up/headless-next/config',
			'@10up/headless-next/middlewares',
		],
	},
	rules: {
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				mjs: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
	},
};
