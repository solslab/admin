import adapter from '@sveltejs/adapter-node';
import { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import preprocess from 'svelte-preprocess';
import process from 'process';

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/styles/`;

const prepends = [
	'@import "' + sassPath + 'functions.scss";',
	'@import "' + sassPath + 'properties.scss";',
	'@import "' + sassPath + 'animation.scss";'
].join('\n');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	onwarn: (warning, handler) => {
		process.stdout.write('.');
		switch (warning.code) {
			case 'a11y-no-onchange':
			case 'a11y-role-has-required-aria-props':
			case 'vite-plugin-svelte-css-no-scopable-elements':
			case 'unused-export-let':
			case 'css-unused-selector':
			case 'a11y-click-events-have-key-events':
				break;
			default:
				break;
		}
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: prepends
		}
	}),

	kit: {
		// version: {
		// 	name: child_process.execSync('git rev-parse HEAD').toString().trim(),
		// 	pollInterval: 3600 * 1000 // 1 hour
		// },
		adapter: adapter(),
		alias: {
			'@src': 'src',
			'@three': 'src/system/3d/three',
			'@src/': 'src/',
			'@styles': 'src/styles',
			'@styles/': 'src/styles/',
			'@util': 'src/util',
			'@util/': 'src/util/'
		}
	}
};

export default config;
