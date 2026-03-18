import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

export const prerender = false;

export async function load({ url }) {
	if (!dev) error(404);

	const slug = url.searchParams.get('slug');
	if (!slug) return { slug: '', title: '', markdown: '' };

	try {
		const filePath = join(process.cwd(), 'src', 'routes', '(app)', 'blog', slug, '+page.svx');
		const raw = await readFile(filePath, 'utf-8');
		const { data, content } = matter(raw);

		return { slug, title: data.title ?? '', markdown: content.trim() };
	} catch {
		return { slug, title: '', markdown: '' };
	}
}
