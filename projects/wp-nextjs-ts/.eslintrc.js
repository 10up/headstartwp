module.exports = {
	extends: ['@10up/eslint-config/react'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
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
