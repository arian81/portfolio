# Theme

Svelte 5 theme management with system preference detection and FOUC prevention.

## Setup

```svelte
<!-- +layout.svelte -->
<script lang="ts">
	import { SvelteTheme } from '$lib/theme';
	let { children } = $props();
</script>

<SvelteTheme>
	{#snippet children(theme)}
		{@render children()}
	{/snippet}
</SvelteTheme>
```

## Usage

```svelte
<script lang="ts">
	import { useTheme } from '$lib/theme';
	const theme = useTheme();
</script>

<button onclick={() => (theme.theme = 'dark')}>Dark</button>
<button onclick={() => (theme.theme = 'light')}>Light</button>
<button onclick={() => (theme.theme = 'system')}>System</button>
<p>Current: {theme.resolvedTheme}</p>
```

## Custom Themes

```svelte
<SvelteTheme themes={['light', 'dark', 'ocean']} attribute="class" defaultTheme="ocean">
	{#snippet children(theme)}
		{@render children()}
	{/snippet}
</SvelteTheme>
```
