module.exports = {
	extends: ['@10up/eslint-config/react'],
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
		'import/core-modules': ['@10up/headless-next/config', '@10up/headless-next/middlewares'],
	},
};
