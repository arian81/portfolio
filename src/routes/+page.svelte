<script>
	import Item from '$lib/components/Item.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import { projects } from '$lib/data/projects';
	import { experience } from '$lib/data/experience';
</script>

<div class="flex w-full min-w-0 flex-col gap-10 p-5 md:p-10 lg:h-screen lg:overflow-hidden">
	<header class="text-sm text-neutral-600">
		<span class="text-sm text-stone-800">アリアン</span>
	</header>
	<div class="flex flex-col gap-20 lg:min-h-0 lg:flex-1 lg:flex-row">
		<div class="flex shrink-0 flex-col gap-16 xl:w-110 2xl:w-150">
			<div class="flex flex-col gap-5">
				<h1
					class="pb-5 font-instrument text-5xl font-bold tracking-wider text-stone-800 md:text-6xl"
				>
					Arian<br />Ahmadinejad
				</h1>
				<h2 class="leading-relaxed text-stone-600">
					A software engineer who values simplicity and intention. Currently crafting developer
					tools at Greptile. Studying computer science at McMaster
				</h2>
				<div class="flex gap-4 text-stone-500/70">
					<a href="https://github.com/arian81">GitHub</a>
					<a href="https://linkedin.com/in/arian81">LinkedIn</a>
					<a href="https://x.com/ariancodes">𝕏</a>
					<a href="mailto:hey@arian.gg">Email</a>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<h2 class="text-lg font-bold">Experience</h2>
				{#each experience as job (job.url)}
					<Item
						type="experience"
						url={job.url}
						company={job.company}
						role={job.role}
						date={job.date}
						mobileRole={job.mobileRole}
					/>
				{/each}
			</div>
			<div class="flex flex-col gap-2">
				<h2 class="text-md tracking-[0.3em] text-stone-400 uppercase">Writings</h2>
				<Item
					type="blog"
					url="https://github.com/arian81"
					title="Writing 1"
					date="2022 - Present"
				/>
				<Item
					type="blog"
					url="https://github.com/arian81"
					title="Writing 2"
					date="2022 - Present"
				/>
				<Item
					type="blog"
					url="https://github.com/arian81"
					title="Writing 3"
					date="2022 - Present"
				/>
			</div>
		</div>
		<div class="flex flex-1 flex-col lg:min-h-0">
			<h2 class="mb-4 text-lg font-bold">Projects</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:overflow-y-auto 2xl:grid-cols-3">
				{#each projects as project (project.url)}
					<ProjectItem {...project} />
				{/each}
			</div>
		</div>
	</div>
</div>
