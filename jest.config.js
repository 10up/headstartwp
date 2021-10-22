/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['dist'],
	globals: {
		'ts-jest': {
			isolatedModules: true,
		},
	},
};
