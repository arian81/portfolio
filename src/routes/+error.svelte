<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 p-5">
	<h1 class="font-instrument text-8xl font-bold tracking-wider text-stone-800 dark:text-yellow-50">
		{page.status}
	</h1>
	<p class="text-lg text-stone-500 dark:text-stone-400">
		{page.status === 404
			? "Ummmm, hopefully this page isn't supposed to exist"
			: page.error?.message}
	</p>
	<a
		href={resolve('/')}
		class="mt-4 text-stone-500 underline hover:text-stone-800 dark:hover:text-stone-200"
	>
		Go home
	</a>
</div>
