<script>
	import Item from '$lib/components/Item.svelte';
	import ProjectItem from '$lib/components/projectItem.svelte';
</script>

<div class="grid w-full min-w-0 grid-cols-1 gap-12 lg:grid-cols-12">
	<header class="col-span-1 px-4 py-8 text-sm text-neutral-600 lg:col-span-12"></header>
	<div class="col-span-1 flex flex-col justify-evenly gap-16 px-4 lg:col-span-4">
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
	<div class="col-span-1 h-full px-4 lg:col-span-8">
		<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
			<ProjectItem title="Project 1" description="Description 1" />
			<ProjectItem title="Project 2" description="Description 2" />
			<ProjectItem title="Project 3" description="Description 3" />
		</div>
	</div>
</div>
