const config = require('10up-toolkit/config/webpack.config');

class IgnoreDynamicRequire {
	apply(compiler) {
		compiler.hooks.normalModuleFactory.tap('IgnoreDynamicRequire', (factory) => {
			factory.hooks.parser.for('javascript/auto').tap('IgnoreDynamicRequire', (parser) => {
				parser.hooks.call.for('require').tap('IgnoreDynamicRequire', (expression) => {
					// This is a SyncBailHook, so returning anything stops the parser, and nothing allows to continue
					if (
						expression.arguments.length !== 1 ||
						expression.arguments[0].type === 'Literal'
					) {
						return;
					}
					const arg = parser.evaluateExpression(expression.arguments[0]);
					if (!arg.isString() && !arg.isConditional()) {
							return true; //eslint-disable-line
					}
				});
			});
		});
	}
}

config.entry.loader.import = './config-loader.js';

config.externals = [
	{
		...config.externals,
		fs: 'commonjs2 fs',
		path: 'commonjs2 path',
		'@10up/headless-core/utils': 'commonjs2 @10up/headless-core/utils',
		'react/jsx-runtime': 'commonjs2 react/jsx-runtime',
	},
	function ({ request }, callback) {
		if (/^next\//.test(request)) {
			return callback(null, `commonjs ${request}`);
		}

		return callback();
	},
];

config.plugins.push(new IgnoreDynamicRequire());

module.exports = config;
