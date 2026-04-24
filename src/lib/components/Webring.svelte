<script lang="ts">
	import ArrowLeft from '$lib/components/ArrowLeft.svelte';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import SocraticaAsterism from '$lib/components/SocraticaAsterism.svelte';
</script>

<div class="flex items-center gap-1.5 text-base">
	<a href="https://socrati.ca/webring/arian.gg/prev" aria-label="Previous site in webring">
		<ArrowLeft class="block h-[1em] w-[1em]" />
	</a>
	<a href="https://socrati.ca/webring/" aria-label="Webring index">
		<SocraticaAsterism class="block h-[1em] w-[1em]" />
	</a>
	<a href="https://socrati.ca/webring/arian.gg/next" aria-label="Next site in webring">
		<ArrowRight class="block h-[1em] w-[1em]" />
	</a>
</div>
