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
		'react/require-default-props': ['error', { functions: 'defaultArguments' }],
		'jsdoc/require-returns-type': 'off',
	},
};
