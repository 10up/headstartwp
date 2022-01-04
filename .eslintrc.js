module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['@10up/eslint-config/react', '@10up/eslint-config/jest'],
	plugins: ['@typescript-eslint'],
	rules: {
		'jsdoc/require-returns-type': 0,
	},
	settings: {
		'import/resolver': 'typescript',
	},
};
