import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), enhancedImages(), sveltekit(), devtoolsJson()],
	server: {
		proxy: {
			'/u/static': {
				target: 'https://us-assets.i.posthog.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/u/, '')
			},
			'/u': {
				target: 'https://us.i.posthog.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/u/, '')
			}
		}
	}
});
