<script lang="ts">
	import './layout.css';
	import 'rehype-callouts/theme/vitepress';
	import 'prism-themes/themes/prism-one-dark.css';
	import { SvelteTheme } from '$lib/theme';
	import '@fontsource/instrument-serif/latin-400.css';
	import { onNavigate } from '$app/navigation';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();

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
	{@render children()}
</SvelteTheme>
