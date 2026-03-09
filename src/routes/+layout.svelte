<script lang="ts">
	import './layout.css';
	import { SvelteTheme } from '$lib/theme';
	import '@fontsource/instrument-serif/latin-400.css';

	let { children } = $props();
</script>

<SvelteTheme themes={['light', 'dark']} defaultTheme="system" attribute="class" enableSystem>
	{@render children()}
</SvelteTheme>
