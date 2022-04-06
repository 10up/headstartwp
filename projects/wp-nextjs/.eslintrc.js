module.exports = {
	extends: ['@10up/eslint-config/react'],
	settings: {
		'import/core-modules': [
			'@10up/headless-core',
			'@10up/headless-core/utils',
			'@10up/headless-core/react',
		],
		jsdoc: {
			mode: 'typescript',
		},
	},
};
