<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="px-5 md:px-10">
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>
