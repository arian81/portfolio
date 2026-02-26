<script lang="ts">
	import type { Project } from '$lib/data/projects';
	let { title, description, image, url, repo }: Project = $props();
</script>

<a href={url} rel="external">
	<div class="bg-blue-100">
		<enhanced:img src={image} alt={title} class="p-10" />
		<h3 class="text-lg font-bold">{title}</h3>
		<p class="text-sm text-gray-500">{description}</p>
		<p class="text-sm text-gray-500">{repo}</p>
	</div>
</a>
