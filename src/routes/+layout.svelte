<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { SvelteTheme } from '$lib/theme';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<SvelteTheme
	themes={['light', 'dark']}
	defaultTheme="light"
	attribute="class"
	disableTransitionOnChange
>
	{@render children()}
</SvelteTheme>
