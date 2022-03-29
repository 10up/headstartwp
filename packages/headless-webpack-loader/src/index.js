const path = require('path');
const fs = require('fs');

module.exports = function (source) {
	// const callback = this.async();
	const headlessConfigPath = path.join(process.cwd(), 'headless.config.js');
	this.addDependency(headlessConfigPath);
	if (fs.existsSync(headlessConfigPath)) {
		let headlessConfig;
		try {
			delete require.cache[require.resolve(headlessConfigPath)];
			// eslint-disable-next-line global-require, import/no-dynamic-require
			headlessConfig = require(headlessConfigPath);
		} catch (e) {
			return '';
		}

		const transformed = source.replace(/(__10up__HEADLESS_CONFIG\|\|)({})/, (match, p1) => {
			return [p1, JSON.stringify(headlessConfig)].join('');
		});

		return transformed;
	}

	return '';
};
