module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['@10up/eslint-config/react', '@10up/eslint-config/jest'],
	plugins: ['@typescript-eslint'],
	rules: {
		'jsdoc/require-returns-type': 0,
		'jsdoc/require-returns': 0,
		'jsdoc/require-param': 0,
		'react/function-component-definition': 0,
	},
	settings: {
		'import/resolver': 'typescript',
	},
};
