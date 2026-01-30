<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}
	let { title, description }: Props = $props();
</script>

<div>
	<!-- imgage placeholder -->
	<div class="h-50 w-full bg-gray-200"></div>
	{title}
	{description}
</div>
