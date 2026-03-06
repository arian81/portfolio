<script lang="ts">
	import Item from '$lib/components/Item.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import { projects } from '$lib/data/projects';
	import { experience } from '$lib/data/experience';
	import { useTheme } from '$lib/theme';
	import { clsx } from 'clsx';
	import Logo from '$lib/components/Logo.svelte';

	const theme = useTheme();
</script>

<div class="flex w-full min-w-0 flex-col gap-2 p-5 pt-10 md:p-10 lg:h-screen lg:overflow-hidden">
	<header class="flex -translate-y-7 justify-between">
		<Logo class="w-6 text-stone-900 dark:text-yellow-50" />
		<div class="flex gap-1 text-sm">
			{#each ['light', 'dark', 'system'] as state, i (state)}
				{#if i > 0}<span class="text-stone-300 select-none dark:text-stone-600">/</span>{/if}
				<button
					onclick={() => (theme.theme = state)}
					class={clsx(
						'cursor-pointer',
						state === theme.theme
							? 'text-stone-800 dark:text-stone-200'
							: 'text-stone-400 dark:text-stone-500'
					)}>{state}</button
				>
			{/each}
		</div>
	</header>
	<div class="flex flex-col gap-20 lg:min-h-0 lg:flex-1 lg:flex-row">
		<div class="flex shrink-0 flex-col gap-16 lg:min-h-0 lg:w-80 xl:w-110 2xl:w-150">
			<div class="flex flex-col gap-5">
				<h1
					class="pb-5 font-instrument text-5xl font-bold tracking-wider text-stone-800 md:text-6xl dark:text-yellow-50"
				>
					Arian<br />Ahmadinejad
				</h1>
				<h2 class="leading-relaxed text-stone-600 dark:text-stone-400">
					A software engineer who values simplicity and intention. Currently crafting developer
					tools at Greptile. Studying computer science at McMaster
				</h2>
				<div class="flex gap-4 text-stone-500/70 dark:text-stone-500">
					<a href="https://github.com/arian81">GitHub</a>
					<a href="https://linkedin.com/in/arian81">LinkedIn</a>
					<a href="https://x.com/ariancodes">𝕏</a>
					<a href="mailto:hey@arian.gg">Email</a>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<h2 class="pb-2 text-sm font-light tracking-[0.3em] text-stone-400 uppercase">
					Experience
				</h2>
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
				<h2 class="pb-2 text-sm font-light tracking-[0.3em] text-stone-400 uppercase">Writings</h2>
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
			<footer class="hidden justify-between text-xs text-stone-400 lg:flex">
				<p>
					Handcrafted in <a href="https://svelte.dev/" class="text-[#ff3e00] underline">Svelte</a>
				</p>
				<p>© {new Date().getFullYear()} Arian Ahmadinejad</p>
			</footer>
		</div>
		<div class="flex flex-1 flex-col gap-5 lg:min-h-0">
			<h2 class="text-sm font-light tracking-[0.3em] text-stone-400 uppercase 2xl:text-xl">
				Projects
			</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:overflow-y-auto 2xl:grid-cols-3">
				{#each projects as project (project.url)}
					<ProjectItem {...project} />
				{/each}
			</div>
		</div>
		<footer class="flex flex-col justify-between text-xs text-stone-400 lg:hidden">
			<p>
				Handcrafted in <a href="https://svelte.dev/" class="text-[#ff3e00] underline">Svelte</a>
			</p>
			<p>© {new Date().getFullYear()} Arian Ahmadinejad</p>
		</footer>
	</div>
</div>
