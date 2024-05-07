module.exports = {
	parserOptions: {
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		'jsdoc/require-returns-type': 0,
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/consistent-type-exports': 'error',
	},
	settings: {
		'import/resolver': 'typescript',
	},
};
