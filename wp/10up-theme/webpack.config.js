const config = require('10up-toolkit/config/webpack.config');

config.resolve = {
	...config.resolve,
	conditionNames: ['block-editor'],
};

module.exports = config;
