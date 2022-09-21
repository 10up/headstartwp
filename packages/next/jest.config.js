const config = require('../../jest.config');

module.exports = {
	...config,
	setupFilesAfterEnv: ['./jest.setup.ts'],
};
