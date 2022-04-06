const config = require('10up-toolkit/config/webpack.config');

config.externals = {
	...config.externals,
	'react/jsx-runtime': 'commonjs2 react/jsx-runtime',
};

module.exports = config;
