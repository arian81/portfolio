// svelte-sitemap.config.ts
import type { OptionsSvelteSitemap } from 'svelte-sitemap';

const config: OptionsSvelteSitemap = {
	domain: 'https://www.arian.gg',
	trailingSlashes: true,
	ignore: ['meta*'],
	outDir: '.vercel/output/static'
};

export default config;
