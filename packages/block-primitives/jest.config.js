/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'\\.[jt]sx?$': ['ts-jest', { preset: 'ts-jest/presets/js-with-ts', useESM: true }],
	},
	testEnvironment: 'jsdom',
	// jsdom resolves the `browser` export condition, which hands us ESM-only
	// builds (uuid, pulled in by the @wordpress packages) that Jest cannot parse.
	// Preferring `node` picks the CommonJS entry instead.
	testEnvironmentOptions: {
		customExportConditions: ['node'],
	},
	testPathIgnorePatterns: ['dist'],
	collectCoverage: true,
	setupFilesAfterEnv: ['./jest.setup.ts'],
	extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
