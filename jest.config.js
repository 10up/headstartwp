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
	collectCoverage: true,
};
