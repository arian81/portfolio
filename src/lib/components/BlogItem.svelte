<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';

	interface Props {
		title: string;
		date: string;
		url: Pathname;
	}
	const { title, date, url }: Props = $props();
	const slug = $derived(url.split('/').pop());
</script>

<a class="group flex items-end gap-3 2xl:text-xl" href={resolve(url)}>
	<span
		class="text-stone-800 transition-colors group-hover:text-amber-700 dark:text-stone-200 dark:group-hover:text-amber-400"
		style="view-transition-name: blog-title-{slug}">{title}</span
	>
	<span class="flex-1 grow -translate-y-2.5 border-b border-dotted border-stone-400"></span>
	<span class="text-sm text-stone-400 2xl:text-lg">{date}</span>
</a>
