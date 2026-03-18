<script lang="ts">
	import { resolve } from '$app/paths';
	import { onDestroy, onMount } from 'svelte';
	import type { Crepe } from '@milkdown/crepe';

	let containerEl: HTMLDivElement;
	let crepe: Crepe | undefined;
	let title = $state('');
	let slugOverride = $state('');
	let slug = $derived(
		slugOverride ||
			title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '')
	);

	// This is horrible and reallistically should be using tanstack query. However, this is a local tool and I don't want extra dependencies
	let publishing = $state(false);
	let published = $state('');

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

	async function publish() {
		if (!crepe || !slug || !title) return;
		publishing = true;
		try {
			const res = await fetch('/api/blog/publish', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ slug, title, markdown: crepe.getMarkdown() })
			});
			const data = await res.json();
			if (data.success) {
				published = data.path;
			}
		} finally {
			publishing = false;
		}
	}

	onDestroy(() => {
		crepe?.destroy();
	});

	onMount(async () => {
		const { Crepe } = await import('@milkdown/crepe');
		await import('@milkdown/crepe/theme/common/style.css');
		await import('@milkdown/crepe/theme/frame.css');

		const instance = new Crepe({
			root: containerEl,
			defaultValue: 'Start writing...',
			featureConfigs: {
				[Crepe.Feature.ImageBlock]: {
					onUpload: uploadImage
				}
			}
		});

		await instance.create();
		crepe = instance;
	});
</script>

<div class="mx-auto min-h-screen max-w-4xl">
	<div class="my-8 flex items-center gap-10">
		<a href={resolve('/')} class="text-sm text-stone-400 hover:text-stone-600">&larr; Back</a>
		<div class="flex items-center">
			<input
				bind:value={title}
				class="field-sizing-content min-w-20"
				placeholder="untitled"
			/>
			<p>/blog/</p>
			<input
				bind:value={slugOverride}
				placeholder={slug || 'slug'}
				class="border-b pl-2"
			/>
		</div>
		{#if published}
			<a href={published} class="text-sm text-green-600 hover:text-green-700">View Post &rarr;</a>
		{:else}
			<button
				onclick={publish}
				disabled={publishing || !slug}
				class="rounded-md bg-stone-800 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-stone-800 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300 dark:disabled:hover:bg-stone-200"
			>
				{publishing ? 'Publishing...' : 'Publish'}
			</button>
		{/if}
	</div>
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
