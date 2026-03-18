import { dev } from '$app/environment';
import { error, json } from '@sveltejs/kit';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';

const publishSchema = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	markdown: z.string().min(1)
});

export const prerender = false;

// When publishing a blog post, we need to create a .svx file and update the blog registry
export async function POST({ request }: { request: Request }) {
	if (!dev) error(404);

	const parsed = publishSchema.safeParse(await request.json());
	if (!parsed.success) error(400, parsed.error.message);
	const { slug, title, markdown } = parsed.data;

	const date = new Date().toISOString().slice(0, 10);

	// Write .svx file
	const content = `---\ntitle: "${title}"\ndate: "${date}"\ndescription: ""\n---\n\n${markdown}\n`;
	const dir = join(process.cwd(), 'src', 'routes', '(app)', 'blog', slug);
	await mkdir(dir, { recursive: true });
	await writeFile(join(dir, '+page.svx'), content);

	// Update blog registry
	const registryPath = join(process.cwd(), 'src', 'lib', 'data', 'blogPosts.json');
	const registry = JSON.parse(await readFile(registryPath, 'utf-8'));

	if (!registry.some((p: { url: string }) => p.url === `/blog/${slug}`)) {
		registry.unshift({ url: `/blog/${slug}`, title, date: date.slice(0, 4) });
		await writeFile(registryPath, JSON.stringify(registry, null, '\t') + '\n');
	}

	return json({ success: true, path: `/blog/${slug}` });
}
