const config = require('../../jest.config');

module.exports = {
	...config,
	modulePaths: ['./test'],
	setupFilesAfterEnv: ['./jest.setup.ts'],
	moduleNameMapper: {
		'@10up/headless-core': '<rootDir>/src/index.ts',
		'@10up/headless-core/react': '<rootDir>/src/react/index.ts',
		'@10up/headless-core/utils': '<rootDir>/src/utils/index.ts',
	},
};
