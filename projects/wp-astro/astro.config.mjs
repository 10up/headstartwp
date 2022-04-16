import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import replace from '@rollup/plugin-replace';
import headlessConfig from './headless.config.mjs';

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	vite: {
		plugins: [
			replace({
				__10up__HEADLESS_CONFIG: JSON.stringify(headlessConfig),
			}),
		],
	},
});
