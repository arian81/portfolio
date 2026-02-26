<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { SvelteTheme } from '$lib/theme';
	import '@fontsource/instrument-serif/latin-400.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<SvelteTheme
	themes={['light', 'dark']}
	defaultTheme="system"
	attribute="class"
	enableSystem
	disableTransitionOnChange
>
	{@render children()}
</SvelteTheme>
