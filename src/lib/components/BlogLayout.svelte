<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';

	let { title, date, children } = $props();

	const slug = $derived(page.url.pathname.split('/').pop());

	onMount(() => {
		posthog.capture('blog_post_viewed', { title, slug, date });
	});
</script>

<div class="mx-auto max-w-3xl p-5 pt-10 md:p-10">
	<a href={resolve('/')} class="mb-8 block text-sm text-stone-400 hover:text-stone-600"
		>&larr; Back</a
	>
	<h1
		class="mb-2 text-3xl font-bold text-stone-800 dark:text-yellow-50"
		style="view-transition-name: blog-title-{slug}"
	>
		{title}
	</h1>
	{#if date}
		<p class="mb-8 text-sm text-stone-400">{date}</p>
	{/if}
	<div class="prose max-w-none prose-stone dark:prose-invert">
		{@render children()}
	</div>
</div>
