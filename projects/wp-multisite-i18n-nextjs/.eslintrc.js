module.exports = {
	extends: ['@10up/eslint-config/react'],
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},
	rules: {
		// This project's components no longer declare propTypes — React 19 removed
		// runtime propTypes support for function components, so the validation this
		// rule checks for can no longer exist here.
		'react/prop-types': 'off',
	},
};
