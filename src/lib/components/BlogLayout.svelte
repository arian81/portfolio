<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let { title, date, children } = $props();

	const slug = $derived(page.url.pathname.split('/').pop());

	onMount(async () => {
		const posthog = (await import('posthog-js')).default;
		posthog.capture('blog_post_viewed', { title, slug, date });
	});
</script>

<div class="mx-auto w-full max-w-4xl">
	<a href={resolve('/')} class="my-8 block text-sm text-stone-400 hover:text-stone-600"
		>&larr; Back</a
	>
	<h1
		class="mb-2 font-instrument text-5xl font-bold text-stone-800 dark:text-yellow-50"
		style="view-transition-name: blog-title-{slug}"
	>
		{title}
	</h1>
	{#if date}
		<p class="mb-8 text-sm text-stone-400">{date}</p>
	{/if}
	<div
		class="prose max-w-none text-xl wrap-break-word prose-stone dark:prose-invert prose-img:mx-auto prose-img:max-w-[50%] prose-img:rounded-lg"
	>
		{@render children()}
	</div>
</div>
