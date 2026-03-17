<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="flex h-full w-full items-center justify-center bg-yellow-50">
	<div class="flex items-stretch gap-7">
		<div class="flex flex-col items-center gap-4">
			<Logo class="w-48 text-stone-800" />
			<!-- <span class="text-lg tracking-[0.3em] text-stone-400">arian.gg</span> -->
		</div>
		<div class="flex flex-col justify-between">
			<h1 class="font-instrument text-7xl leading-[0.9] font-medium tracking-wider text-stone-800">
				Arian<br />Ahmadinejad
			</h1>
			<p class="translate-y-2 text-xl leading-relaxed whitespace-nowrap text-stone-500">
				I like to build <u class="text-stone-700 decoration-stone-300">intentional</u> software with
				utmost <strong class="font-semibold text-stone-700">simplicity</strong> that
				<i class="text-stone-700">just works</i>.
			</p>
		</div>
	</div>
</div>
