import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeCallouts from 'rehype-callouts';
import rehypeMathjax from 'rehype-mathjax';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeImgSize from 'rehype-img-size';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter(), paths: { relative: false } },
	preprocess: [
		mdsvex({
			layout: join(__dirname, './src/lib/components/BlogLayout.svelte'),
			smartypants: false,
			remarkPlugins: [remarkGfm, remarkMath],
			rehypePlugins: [rehypeSlug, rehypeCallouts, rehypeMathjax, [rehypeImgSize, { dir: 'static' }], rehypeRaw]
		})
	],
	extensions: ['.svelte', '.svx']
};

export default config;
