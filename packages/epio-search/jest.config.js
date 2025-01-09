const config = require('../../jest.config');

module.exports = {
	...config,
	modulePaths: ['./test'],
	setupFilesAfterEnv: ['./jest.setup.ts'],
};
