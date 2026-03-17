<script lang="ts">
	import { resolve } from '$app/paths';
	import { onDestroy, onMount } from 'svelte';
	import type { Crepe } from '@milkdown/crepe';

	let containerEl: HTMLDivElement;
	let crepe: Crepe | undefined;

	onDestroy(() => {
		crepe?.destroy();
	});

	onMount(async () => {
		const { Crepe } = await import('@milkdown/crepe');
		await import('@milkdown/crepe/theme/common/style.css');
		await import('@milkdown/crepe/theme/frame.css');

		const instance = new Crepe({
			root: containerEl,
			defaultValue: '# Hello\n\nStart writing...'
		});

		await instance.create();
		crepe = instance;
	});
</script>

<div class="flex min-h-screen flex-col">
	<div class="mx-auto w-full max-w-4xl px-5 md:px-10">
		<a href={resolve('/')} class="my-8 block text-sm text-stone-400 hover:text-stone-600"
			>&larr; Back</a
		>
	</div>
	<div class="editor flex-1" bind:this={containerEl}></div>
</div>

<style>
	.editor :global(.milkdown) {
		--crepe-color-background: transparent;
		--crepe-color-on-background: var(--color-stone-900);

		--crepe-font-title: var(--font-instrument), 'Times New Roman', serif;
		--crepe-font-default: system-ui, sans-serif;
		--crepe-font-code: 'Fira Code', Menlo, Monaco, monospace;
	}

	.editor :global(.milkdown .ProseMirror) {
		max-width: 56rem;
		margin: 0 auto;
		padding: 0 1.25rem;
		font-size: 1.25rem;
		flex: 1;
	}

	@media (min-width: 768px) {
		.editor :global(.milkdown .ProseMirror) {
			padding: 0 2.5rem;
		}
	}

	.editor {
		display: flex;
		flex-direction: column;
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
