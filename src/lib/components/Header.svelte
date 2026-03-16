<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { useTheme } from '$lib/theme';
	import { clsx } from 'clsx';

	const theme = useTheme();
</script>

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
