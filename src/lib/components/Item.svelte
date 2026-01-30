<script lang="ts">
	interface Props {
		href: string;
		title: string;
		description?: string;
		date: string;
	}

	let { href, title, description, date }: Props = $props();
</script>

<a class="flex items-end" {href}>
	<span>{title}</span>
	<span class="text-sm text-gray-500">{description}</span>

	<span class="flex-1 grow -translate-y-1.5 border-b border-dotted border-gray-500"></span>
	<span class="">{date}</span>
</a>
