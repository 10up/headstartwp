/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	transform: {
		'\\.[jt]sx?$': ['ts-jest', { preset: 'ts-jest/presets/js-with-ts' }],
	},
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['dist'],
};
