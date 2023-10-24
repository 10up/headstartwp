const dts = require('rollup-plugin-dts');
const esbuild = require('rollup-plugin-esbuild');

const name = require('./package.json').main.replace(/\.js$/, '');

const bundle = (config) => ({
	...config,
	input: 'src/index.ts',
	external: (id) => !/^[./]/.test(id),
});

module.exports = [
	bundle({
		plugins: [esbuild.default()],
		output: [
			{
				file: `${name}.js`,
				format: 'cjs',
				sourcemap: false,
			},
			{
				file: `${name}.mjs`,
				format: 'es',
				sourcemap: false,
			},
		],
	}),
	bundle({
		plugins: [dts.default()],
		output: {
			file: `${name}.d.ts`,
			format: 'es',
		},
	}),
];
