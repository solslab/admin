import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5174,
		host: true,
		strictPort: false
	},
	build: {
		sourcemap: false
	}
});
