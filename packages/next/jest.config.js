const config = require('../../jest.config');

module.exports = {
	...config,
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig-cjs.json',
		},
	},
	setupFilesAfterEnv: ['./jest.setup.ts'],
};
