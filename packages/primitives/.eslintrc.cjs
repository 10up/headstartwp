module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['@10up/eslint-config/react', '@10up/eslint-config/jest'],
	plugins: ['@typescript-eslint'],
	rules: {
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
	},
	settings: {
		'import/resolver': 'typescript',
	},
};