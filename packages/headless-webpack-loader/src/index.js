const { validate } = require('schema-utils');

const schema = {
	type: 'object',
	properties: {
		config: {
			type: 'object',
		},
	},
};

module.exports = function (source) {
	const options = this.getOptions();

	validate(schema, options, {
		name: '@10up/headless-webpack-loader',
	});

	const config = options.config || {};

	const transformed = source.replace('__10up__HEADLESS_CONFIG', JSON.stringify(config));

	return transformed;
};
