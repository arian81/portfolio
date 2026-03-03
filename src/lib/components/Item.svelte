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

<a class="group flex items-end gap-3" href={props.url} rel="external">
	<span class="group-hover:text-amber-700 dark:group-hover:text-amber-400"
		>{props.type === 'blog' ? props.title : props.company}</span
	>
	<span class="hidden text-sm text-gray-500 md:block"
		>{props.type === 'experience' ? props.role : ''}</span
	>
	<span class="text-sm text-gray-500 md:hidden"
		>{props.type === 'experience' ? props.mobileRole : ''}</span
	>
	<span class="flex-1 grow -translate-y-2.5 border-b border-dotted border-gray-500"></span>
	<span class="text-sm text-gray-500">{props.date}</span>
</a>
