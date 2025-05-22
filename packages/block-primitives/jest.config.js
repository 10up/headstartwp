/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'\\.[jt]sx?$': ['ts-jest', { preset: 'ts-jest/presets/js-with-ts', useESM: true }],
	},
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['dist'],
	collectCoverage: true,
	setupFilesAfterEnv: ['./src/jest.setup.ts'],
	extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
