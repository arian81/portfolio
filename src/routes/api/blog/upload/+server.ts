import { dev } from '$app/environment';
import { error, json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';

const uploadSchema = z.object({
	file: z.instanceof(File),
	slug: z.string().min(1)
});

const urlSchema = z.object({
	url: z.string().url(),
	slug: z.string().min(1)
});

export const prerender = false;

async function saveImage(buffer: Buffer, slug: string, ext: string) {
	const name = `${Date.now()}.${ext}`;
	const dir = join(process.cwd(), 'static', 'blog', slug);
	await mkdir(dir, { recursive: true });
	await writeFile(join(dir, name), buffer);
	return `/blog/${slug}/${name}`;
}

//This endpoint gets the image uploaded by crepe and puts them in blog asset folder
// Supports both file uploads (FormData) and URL downloads (JSON body)
export async function POST({ request }: { request: Request }) {
	if (!dev) error(404);

	const contentType = request.headers.get('content-type') ?? '';

	// JSON body = download from external URL
	if (contentType.includes('application/json')) {
		const body = await request.json();
		const parsed = urlSchema.safeParse(body);
		if (!parsed.success) error(400, parsed.error.message);
		const { url: imageUrl, slug } = parsed.data;

		const res = await fetch(imageUrl);
		if (!res.ok) error(400, `Failed to fetch image: ${res.status}`);

		const contentTypeHeader = res.headers.get('content-type') ?? '';
		const ext =
			['png', 'gif', 'webp', 'svg'].find((t) => contentTypeHeader.includes(t)) ?? 'jpg';

		const buffer = Buffer.from(await res.arrayBuffer());
		const url = await saveImage(buffer, slug, ext);
		return json({ url });
	}

	// FormData = file upload
	const formData = await request.formData();
	const parsed = uploadSchema.safeParse({
		file: formData.get('file'),
		slug: formData.get('slug')
	});
	if (!parsed.success) error(400, parsed.error.message);
	const { file, slug } = parsed.data;

	const ext = file.name.split('.').pop() ?? 'png';
	const buffer = Buffer.from(await file.arrayBuffer());
	const url = await saveImage(buffer, slug, ext);
	return json({ url });
}
