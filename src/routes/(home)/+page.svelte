<script lang="ts">
	import JobItem from '$lib/components/JobItem.svelte';
	import BlogItem from '$lib/components/BlogItem.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Webring from '$lib/components/Webring.svelte';

	import { projects } from '$lib/data/projects';
	import { experience } from '$lib/data/experience';
	import { topPosts } from '$lib/data/blogPosts';

	import { useTheme } from '$lib/theme';
	import { clsx } from 'clsx';
	import { resolve } from '$app/paths';

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
	<div class="flex flex-col gap-12 lg:min-h-0 lg:flex-1 lg:flex-row lg:gap-20">
		<div class="flex shrink-0 flex-col gap-12 lg:w-80 lg:justify-between xl:w-110 2xl:w-150">
			<div class="flex flex-col gap-12 lg:flex-1 lg:justify-between 2xl:h-200 2xl:flex-none">
				<div class="flex flex-col gap-5">
					<h1
						class="pb-5 font-instrument text-5xl font-bold tracking-wider text-stone-800 md:text-6xl dark:text-yellow-50"
					>
						Arian<br />Ahmadinejad
					</h1>
					<h2 class="leading-relaxed text-stone-600 2xl:text-xl dark:text-stone-400">
						I like to build <u>intentional</u> software with utmost
						<strong>simplicity</strong>
						that <i>just works™</i>. If you believe in the same principles, we should work together
						:)
					</h2>
					<div class="flex gap-4 text-stone-500/70 2xl:text-xl dark:text-stone-500">
						<a href="https://github.com/arian81">GitHub</a>
						<a href="https://linkedin.com/in/arian81">LinkedIn</a>
						<a href="https://x.com/ariancodes">𝕏</a>
						<a href="mailto:hey@arian.gg">Email</a>
						<a href={resolve('/resume')} class="text-stone-500 italic underline">Resume</a>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<h2 class="pb-2 text-sm font-light tracking-[0.3em] text-stone-400 uppercase 2xl:text-xl">
						Experience
					</h2>
					{#each experience as job (job.url)}
						<JobItem {...job} />
					{/each}
				</div>
				<div class="flex flex-col gap-2">
					<h2 class="pb-2 text-sm font-light tracking-[0.3em] text-stone-400 uppercase 2xl:text-xl">
						Writings
					</h2>
					<BlogItem url="/" title="Out with the old, in with the new" date="2026" />
					{#each topPosts as post (post.url)}
						<BlogItem title={post.title} url={post.url} date={post.date}></BlogItem>
					{/each}
				</div>
			</div>
			<footer class="hidden items-center justify-between text-xs text-stone-400 lg:flex">
				<p>
					Handcrafted in <a href="https://svelte.dev/" class="text-[#ff3e00] underline">Svelte</a>
				</p>
				<Webring />
				<p>© {new Date().getFullYear()} Arian Ahmadinejad</p>
			</footer>
		</div>
		<div class="flex flex-1 flex-col gap-5 lg:min-h-0">
			<h2 class="text-sm font-light tracking-[0.3em] text-stone-400 uppercase 2xl:text-xl">
				Projects
			</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:overflow-y-auto 2xl:grid-cols-3">
				{#each projects as project (project.repo)}
					<ProjectItem {...project} />
				{/each}
			</div>
		</div>
		<footer class="flex items-end justify-between text-xs text-stone-400 lg:hidden">
			<div class="flex flex-col">
				<p>
					Handcrafted in <a href="https://svelte.dev/" class="text-[#ff3e00] underline">Svelte</a>
				</p>
				<p>© {new Date().getFullYear()} Arian Ahmadinejad</p>
			</div>
			<Webring />
		</footer>
	</div>
</div>
