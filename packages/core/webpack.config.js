const config = require('10up-toolkit/config/webpack.config');

config.externals = {
	...config.externals,
	'@10up/headless-core': 'commonjs2 @10up/headless-core',
	'@10up/headless-core/utils': 'commonjs2 @10up/headless-core/utils',
	'react/jsx-runtime': 'commonjs2 react/jsx-runtime',
};

module.exports = config;
