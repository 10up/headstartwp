module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['@10up/eslint-config/react', '@10up/eslint-config/jest'],
	plugins: ['@typescript-eslint'],
	rules: {
		'jsdoc/require-returns-type': 0,
		'jsdoc/require-returns': 0,
		'jsdoc/require-param': [
			'warn',
			{
				checkDestructured: false,
			},
		],
		'jsdoc/check-tag-names': [
			'warn',
			{
				definedTags: ['category'],
			},
		],
		'jsdoc/check-param-names': [
			'warn',
			{
				checkDestructured: false,
			},
		],
		'react/function-component-definition': 0,
		'react/require-default-props': 0,
		'jest/expect-expect': [
			'warn',
			{
				assertFunctionNames: ['expect', 'expectTypeOf'],
			},
		],
	},
	settings: {
		'import/resolver': 'typescript',
	},
};
