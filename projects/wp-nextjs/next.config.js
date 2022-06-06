const { withHeadlessConfig } = require('@10up/headless-next/config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const headlessConfig = require('./headless.config');

const LINARIA_EXTENSION = '.linaria.module.css';

function traverse(rules) {
	for (const rule of rules) {
		if (typeof rule.loader === 'string' && rule.loader.includes('css-loader')) {
			if (
				rule.options &&
				rule.options.modules &&
				typeof rule.options.modules.getLocalIdent === 'function'
			) {
				const nextGetLocalIdent = rule.options.modules.getLocalIdent;
				rule.options.modules.mode = 'local';
				rule.options.modules.auto = true;
				rule.options.modules.exportGlobals = true;
				rule.options.modules.exportOnlyLocals = false;
				rule.options.modules.getLocalIdent = (context, _, exportName, options) => {
					if (context.resourcePath.includes(LINARIA_EXTENSION)) {
						return exportName;
					}
					return nextGetLocalIdent(context, _, exportName, options);
				};
			}
		}
		if (typeof rule.use === 'object') {
			traverse(Array.isArray(rule.use) ? rule.use : [rule.use]);
		}
		if (Array.isArray(rule.oneOf)) {
			traverse(rule.oneOf);
		}
	}
}

/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack(config) {
		traverse(config.module.rules);
		config.module.rules.push({
			test: /\.(tsx|ts|js|mjs|jsx)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: require.resolve('@linaria/webpack-loader'),
					options: {
						sourceMap: process.env.NODE_ENV !== 'production',
						...(nextConfig.linaria || {}),
						extension: LINARIA_EXTENSION,
					},
				},
			],
		});

		return config;
	},
};

module.exports = withBundleAnalyzer(withHeadlessConfig(nextConfig, headlessConfig));
