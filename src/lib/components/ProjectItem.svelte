<script lang="ts">
	import type { Project } from '$lib/data/projects';
	let { title, description, image, url, color }: Project = $props();
</script>

<a href={url} rel="external" class="group block">
	<div
		class="{color} flex flex-col gap-3 p-3 pb-5 drop-shadow-md transition-all group-hover:scale-95 group-hover:drop-shadow-sm"
	>
		<div class="aspect-4/3 overflow-hidden">
			<enhanced:img
				src={image}
				alt={title}
				class="h-full w-full object-contain"
				sizes="(min-width: 1536px) 33vw, (min-width: 768px) 50vw, 100vw"
				loading="lazy"
			/>
		</div>
		<div class="space-x-2">
			<h3 class="text-xl font-normal text-white">{title}</h3>
			<p class="h-10 text-sm leading-5 text-white">{description}</p>
		</div>
	</div>
</a>
