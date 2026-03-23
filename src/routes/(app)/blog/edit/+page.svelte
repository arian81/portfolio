<script lang="ts">
	import { resolve } from '$app/paths';
	import { onDestroy, onMount } from 'svelte';
	import type { Crepe } from '@milkdown/crepe';
	import type { PageData } from './$types';
	import { resolveInitialDraft, saveDraft, clearDraft } from '$lib/editor/draft';

	let { data }: { data: PageData } = $props();

	let containerEl: HTMLDivElement;
	let crepe: Crepe | undefined;

	// Whether we're editing an existing published post (slug came from the URL)
	const isEditing = !!data.markdown;

	// svelte-ignore state_referenced_locally
	let title = $state(data.title);
	// svelte-ignore state_referenced_locally
	let slugOverride = $state(data.slug);

	let slug = $derived(
		slugOverride ||
			title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '')
	);

	async function uploadImage(file: File): Promise<string> {
		if (!slug) {
			alert('Set a slug before uploading images');
			return '';
		}
		const form = new FormData();
		form.append('file', file);
		form.append('slug', slug);
		const res = await fetch('/api/blog/upload', { method: 'POST', body: form });
		const { url } = await res.json();
		return url;
	}

	async function uploadImageFromUrl(imageUrl: string): Promise<string> {
		if (!slug) return '';
		const res = await fetch('/api/blog/upload', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url: imageUrl, slug })
		});
		const { url } = await res.json();
		return url;
	}

	async function publish() {
		if (!crepe || !slug || !title) return;
		const res = await fetch('/api/blog/publish', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ slug, title, markdown: crepe.getMarkdown() })
		});
		const result = await res.json();
		console.log(result.status);
		if (result.success) {
			clearDraft();
			// Wait for dev server to pick up the new .svx file
			await new Promise((r) => setTimeout(r, 1));
			window.location.href = result.path;
		}
	}

	let autoSaveTimer: ReturnType<typeof setTimeout> | undefined;
	let saveStatus: 'idle' | 'unsaved' | 'saved' = $state('idle');

	onDestroy(() => {
		clearTimeout(autoSaveTimer);
		crepe?.destroy();
	});

	onMount(async () => {
		const initial = resolveInitialDraft(data);
		title = initial.title;
		slugOverride = initial.slug;

		const { Crepe } = await import('@milkdown/crepe');
		const { setupPasteHandler } = await import('$lib/editor/pasteImagePlugin');
		await import('@milkdown/crepe/theme/common/style.css');
		await import('@milkdown/crepe/theme/frame.css');

		const instance = new Crepe({
			root: containerEl,
			defaultValue: initial.markdown || 'Start writing...',
			featureConfigs: {
				[Crepe.Feature.ImageBlock]: {
					onUpload: uploadImage
				}
			}
		});

		instance.on((listener) => {
			listener.markdownUpdated(() => {
				saveStatus = 'unsaved';
				clearTimeout(autoSaveTimer);
				autoSaveTimer = setTimeout(() => {
					if (crepe && slug) {
						saveDraft({ title, slug: slugOverride, markdown: crepe.getMarkdown() });
						saveStatus = 'saved';
					}
				}, 1000);
			});
		});

		await instance.create();
		crepe = instance;

		setupPasteHandler(containerEl, () => slug, uploadImage, uploadImageFromUrl, instance);
	});
</script>

<div class="mx-auto min-h-screen max-w-4xl">
	<div class="my-8 flex items-center justify-between gap-10">
		<a href={resolve('/')} class="text-sm text-stone-400 hover:text-stone-600">&larr; Back</a>
		<div class="flex items-center">
			<p>/blog/</p>
			<input
				bind:value={slugOverride}
				placeholder={slug || 'slug'}
				disabled={isEditing}
				class="field-sizing-content min-w-50 border-b pl-2 disabled:opacity-50"
			/>
		</div>
		<div class="flex items-center gap-3">
			{#if saveStatus === 'unsaved'}
				<span class="text-xs text-yellow-400">Unsaved changes</span>
			{:else if saveStatus === 'saved'}
				<span class="text-xs text-green-400">Draft saved</span>
			{/if}
			<button
				onclick={publish}
				disabled={!slug || !title}
				class="rounded-md bg-stone-800 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-stone-800 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300 dark:disabled:hover:bg-stone-200"
			>
				Publish
			</button>
		</div>
	</div>
	<input
		bind:value={title}
		class="my-5 ml-10 field-sizing-content min-w-20 text-xl"
		placeholder="untitled"
	/>
	<div class="editor font-xl flex-1" bind:this={containerEl}></div>
</div>

<style>
	.editor :global(.milkdown) {
		--crepe-color-background: transparent;
		--crepe-color-on-background: var(--color-stone-900);

		--crepe-font-title: var(--font-instrument), 'Times New Roman', serif;
		--crepe-font-default: system-ui, sans-serif;
		--crepe-font-code: 'Fira Code', Menlo, Monaco, monospace;
	}

	@media (min-width: 768px) {
		.editor :global(.milkdown .ProseMirror) {
			padding: 0 2.5rem;
		}
	}

	.editor :global(.milkdown .milkdown-code-block) {
		background: hsl(220, 13%, 18%);
		color: hsl(220, 14%, 71%);
		border-radius: 0.5rem;
	}

	.editor :global(.milkdown .milkdown-code-block .cm-editor),
	.editor :global(.milkdown .milkdown-code-block .cm-gutters) {
		background: transparent;
	}

	:global(.dark) .editor :global(.milkdown) {
		--crepe-color-background: transparent;
		--crepe-color-on-background: var(--color-yellow-50);
	}
</style>
