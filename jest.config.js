/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	transform: {
		// `[cm]?` matters: several ESM-only dependencies ship `.mjs` entry points, and a
		// transformIgnorePatterns carve-out is useless if the transform pattern never matches
		// the file in the first place.
		'\\.[cm]?[jt]sx?$': ['ts-jest', { preset: 'ts-jest/presets/js-with-ts' }],
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	// msw 2 talks to the real Fetch API (Request/Response/ReadableStream/BroadcastChannel/
	// TextEncoder). Stock jsdom deletes or never defines those, which is why msw 1 could live
	// with `isomorphic-fetch` and msw 2 cannot — whatwg-fetch's Request/Response are not
	// interchangeable with the platform ones msw 2 expects. jest-fixed-jsdom is jsdom with
	// those globals restored from Node.
	//
	// Set here rather than per package because both `core` and `next` load core's msw server.
	testEnvironment: 'jest-fixed-jsdom',
	testEnvironmentOptions: {
		// Without this the resolver picks msw's *browser* build inside a jsdom environment and
		// `msw/node`'s interceptors never engage.
		customExportConditions: [''],
	},
	testPathIgnorePatterns: ['dist'],
	// jest does not transform node_modules by default, so requiring an ESM-only package from a
	// CJS test throws "Cannot use import statement outside a module". Two upgrades in this
	// branch pull in such packages, so both subtrees are carved out here.
	//
	// Note the stack traces for these failures point at `<pkg>/src/**/*.ts`, which is a source
	// map artefact — the file actually being loaded is the CJS build that requires them.
	transformIgnorePatterns: [
		`node_modules/(?!(${[
			// html-react-parser@6 → domhandler@6 and friends
			'html-react-parser',
			'html-dom-parser',
			'domhandler',
			'domelementtype',
			'domutils',
			'dom-serializer',
			'entities',
			'style-to-js',
			'style-to-object',
			'inline-style-parser',
			'react-property',
			// msw@2 and the ESM-only packages it depends on
			'msw',
			'@mswjs',
			'@open-draft',
			'headers-polyfill',
			'rettime',
			'until-async',
			'strict-event-emitter',
			'is-node-process',
			'outvariant',
		].join('|')})/)`,
	],
	collectCoverage: true,
};
