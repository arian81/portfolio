<script>
	import Item from '$lib/components/Item.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import { projects } from '$lib/data/projects';
</script>

<div
	class="grid w-full min-w-0 grid-cols-1 gap-x-20 gap-y-10 p-10 lg:h-screen lg:grid-cols-12 lg:overflow-hidden"
>
	<header class="col-span-1 text-sm text-neutral-600 lg:col-span-12">
		<span class="text-sm text-stone-800">アリアン</span>
	</header>
	<div class="col-span-1 flex flex-col gap-16 lg:col-span-4">
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-bold">Arian Ahmadinejad</h1>
			<h2>
				A software engineer who values simplicity and intention. Currently crafting developer tools
				at Greptile. Studying computer science at McMaster
			</h2>
			<div class="flex gap-4">
				<a href="https://github.com/arian81">GitHub</a>
				<a href="https://linkedin.com/in/arian81">LinkedIn</a>
				<a href="mailto:hey@arian.gg">Email</a>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<h2 class="text-lg font-bold">Experience</h2>
			<Item
				href="https://github.com/arian81"
				title="Bell Canada"
				description="Software Engineering Intern"
				date="2023 - 2024"
			/>
			<Item
				href="https://github.com/arian81"
				title="Stripe"
				description="Software Engineering Intern"
				date="2023 - 2024"
			/>
			<Item
				href="https://github.com/arian81"
				title="DeltaHacks"
				description="Technical VP"
				date="2022 - Present"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<h2 class="text-lg font-bold">Writings</h2>
			<Item href="https://github.com/arian81" title="Writing 1" date="2022 - Present" />
			<Item href="https://github.com/arian81" title="Writing 2" date="2022 - Present" />
			<Item href="https://github.com/arian81" title="Writing 3" date="2022 - Present" />
		</div>
	</div>
	<div class="col-span-1 flex flex-col lg:col-span-8 lg:overflow-hidden">
		<h2 class="mb-4 text-lg font-bold">Projects</h2>
		<div class="grid grid-cols-1 gap-8 lg:flex-1 lg:grid-cols-2 lg:overflow-y-auto">
			{#each projects as project}
				<ProjectItem {...project} />
			{/each}
		</div>
	</div>
</div>
