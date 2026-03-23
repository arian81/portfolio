import type { Crepe } from '@milkdown/crepe';
import { editorViewCtx } from '@milkdown/kit/core';
import { imageBlockSchema } from '@milkdown/kit/component/image-block';

function dataUrlToFile(dataUrl: string): File {
	const [header, base64] = dataUrl.split(',');
	const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png';
	const ext = mime.split('/')[1] ?? 'png';
	const bytes = atob(base64);
	const arr = new Uint8Array(bytes.length);
	for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
	return new File([arr], `paste.${ext}`, { type: mime });
}

/**
 * Insert an image block node at the current cursor position.
 * Uses Milkdown's `editor.action` to access the underlying ProseMirror view,
 * creates an `image_block` node (Crepe's image component), and dispatches
 * a transaction that replaces the current selection with it.
 */
function insertImageBlock(crepe: Crepe, url: string) {
	crepe.editor.action((ctx) => {
		const view = ctx.get(editorViewCtx);
		const imageBlockType = imageBlockSchema.type(ctx);
		const node = imageBlockType.create({ src: url });
		view.dispatch(view.state.tr.replaceSelectionWith(node));
	});
}

/**
 * Intercepts paste events on the editor container to handle images that would
 * otherwise be inserted as external URLs or base64 data URIs (both of which
 * break blog post rendering).
 *
 * Listens in the capture phase so it fires before Milkdown/ProseMirror's own
 * paste handler. When an image is detected it prevents the default paste,
 * uploads the image to `/api/blog/upload`, and inserts a local image block.
 *
 */
export function setupPasteHandler(
	container: HTMLElement,
	getSlug: () => string,
	uploadFile: (file: File) => Promise<string>,
	uploadUrl: (url: string) => Promise<string>,
	crepe: Crepe
) {
	container.addEventListener(
		'paste',
		(event: ClipboardEvent) => {
			if (!getSlug()) return;
			const clipboard = event.clipboardData;
			if (!clipboard) return;

			// Clipboard contains an image file
			const imageFile = Array.from(clipboard.files).find((f) => f.type.startsWith('image/'));
			if (imageFile) {
				event.preventDefault();
				event.stopPropagation();
				uploadFile(imageFile).then((url) => {
					if (url) insertImageBlock(crepe, url);
				});
				return;
			}

			// Pasted HTML contains <img> tags (external URLs or base64)
			const html = clipboard.getData('text/html');
			if (!html) return;

			const doc = new DOMParser().parseFromString(html, 'text/html');
			const imgs = doc.querySelectorAll('img');
			if (imgs.length === 0) return;

			event.preventDefault();
			event.stopPropagation();

			for (const img of Array.from(imgs)) {
				const src = img.getAttribute('src');
				if (!src) continue;

				const upload = src.startsWith('data:')
					? uploadFile(dataUrlToFile(src))
					: src.startsWith('http')
						? uploadUrl(src)
						: null;

				upload?.then((url) => {
					if (url) insertImageBlock(crepe, url);
				});
			}
		},
		true
	);
}
