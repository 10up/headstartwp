/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	transform: {
		'\\.[jt]sx?$': ['ts-jest', { preset: 'ts-jest/presets/js-with-ts' }],
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['dist'],
	// html-react-parser@6 pulls in domhandler@6 and friends, which ship ESM-only builds.
	// jest does not transform node_modules by default, so requiring them from a CJS test
	// throws "Cannot use import statement outside a module". Transform just that subtree.
	transformIgnorePatterns: [
		`node_modules/(?!(${[
			'html-react-parser',
			'html-dom-parser',
			'domhandler',
			'domelementtype',
			'domutils',
			'dom-serializer',
			'entities',
			'style-to-js',
			'style-to-object',
			'inline-style-parser',
			'react-property',
		].join('|')})/)`,
	],
	collectCoverage: true,
};
