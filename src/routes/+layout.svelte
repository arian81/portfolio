<script lang="ts">
	import './layout.css';
	import 'rehype-callouts/theme/vitepress';
	import 'prism-themes/themes/prism-one-dark.css';
	import { SvelteTheme } from '$lib/theme';
	import '@fontsource/instrument-serif/latin-400.css';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<SvelteTheme themes={['light', 'dark']} defaultTheme="system" attribute="class" enableSystem>
	<div class="flex w-full min-w-0 flex-col p-5 pt-10 md:p-10 lg:h-screen">
		<Header />
		<main class="flex min-h-0 flex-1 flex-col">
			{@render children()}
		</main>
	</div>
</SvelteTheme>
