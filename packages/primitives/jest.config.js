/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'\\.[jt]sx?$': ['ts-jest', { preset: 'ts-jest/presets/js-with-ts', useESM: true }],
	},
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['dist'],
	collectCoverage: true,
	setupFilesAfterEnv: ['./jest.setup.ts'],
};
