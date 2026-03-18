import { dev } from '$app/environment';
import { error, json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';

const uploadSchema = z.object({
	file: z.instanceof(File),
	slug: z.string().min(1)
});

export const prerender = false;

//This endpoint basically gets the image uploaded by crepe and puts them in blog asset folder
export async function POST({ request }: { request: Request }) {
	if (!dev) error(404);

	const formData = await request.formData();
	const parsed = uploadSchema.safeParse({
		file: formData.get('file'),
		slug: formData.get('slug')
	});
	if (!parsed.success) error(400, parsed.error.message);
	const { file, slug } = parsed.data;

	const ext = file.name.split('.').pop() ?? 'png';
	const name = `${Date.now()}.${ext}`;
	const dir = join(process.cwd(), 'static', 'blog', slug);

	await mkdir(dir, { recursive: true });
	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(join(dir, name), buffer);

	return json({ url: `/blog/${slug}/${name}` });
}
