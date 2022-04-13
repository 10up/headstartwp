const config = require('10up-toolkit/config/webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

delete config.entry.loader;

config.externals = [
	{
		...config.externals,
		fs: 'commonjs2 fs',
		path: 'commonjs2 path',
		'@10up/headless-core/utils': 'commonjs2 @10up/headless-core/utils',
		'@10up/headless-core/react': 'commonjs2 @10up/headless-core/react',
		'react/jsx-runtime': 'commonjs2 react/jsx-runtime',
	},
	function ({ request }, callback) {
		if (/^next\//.test(request)) {
			return callback(null, `commonjs ${request}`);
		}

		return callback();
	},
];

config.plugins.push(
	new CopyWebpackPlugin({
		patterns: [
			{
				from: './config-loader.js',
				to: 'config/loader.js',
			},
		],
	}),
);

module.exports = config;
