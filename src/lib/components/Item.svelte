<script lang="ts">
	import type { Experience } from '$lib/data/experience';

	interface BlogPost {
		type: 'blog';
		title: string;
		date: string;
		url: string;
	}
	type Props = Experience | BlogPost;
	const props: Props = $props();
</script>

<a class="group flex items-end gap-3 2xl:text-xl" href={props.url} rel="external">
	<span
		class="text-stone-800 transition-colors group-hover:text-amber-700 dark:text-stone-200 dark:group-hover:text-amber-400"
		>{props.type === 'blog' ? props.title : props.company}</span
	>
	<span class="hidden text-sm text-stone-400 md:block lg:hidden xl:block 2xl:text-lg"
		>{props.type === 'experience' ? props.role : ''}</span
	>
	<span class="text-sm text-stone-400 md:hidden lg:block xl:hidden 2xl:text-lg"
		>{props.type === 'experience' ? props.mobileRole : ''}</span
	>
	<span class="flex-1 grow -translate-y-2.5 border-b border-dotted border-stone-400"></span>
	<span class="text-sm text-stone-400 2xl:text-lg">{props.date}</span>
</a>
