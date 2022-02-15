/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'js'],
	testPathIgnorePatterns: ['dist'],
};
