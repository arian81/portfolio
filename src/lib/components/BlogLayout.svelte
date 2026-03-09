<script lang="ts">
	let { title, date, children } = $props();
</script>

<div class="mx-auto max-w-3xl p-5 pt-10 md:p-10">
	<a href="/" class="mb-8 block text-sm text-stone-400 hover:text-stone-600">&larr; Back</a>
	<h1 class="mb-2 text-3xl font-bold text-stone-800 dark:text-yellow-50">{title}</h1>
	{#if date}
		<p class="mb-8 text-sm text-stone-400">{date}</p>
	{/if}
	<div class="prose prose-stone dark:prose-invert max-w-none">
		{@render children()}
	</div>
</div>
