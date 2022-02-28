<script>
	import Graph from './lib/graph.svelte';
</script>

<main>
	<section class="container">
		<Graph />
	</section>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

		--base-color: hsl(227, 16%, 22%);
		--base-rest-country-color: hsl(227, 16%, 42%);
		--rusia-color: hsl(9, 64%, 50%);
		--rusia-color-2: hsl(9, 64%, 35%);
		--ukraine-color: hsl(40, 98%, 47%);
		--ukraine-color-2: hsl(40, 98%, 35%);
		--no-fly-color: hsl(192, 64%, 40%);
		--no-fly-color-1: #hsl(192, 64%, 62%);
		--font-color: hsl(212, 22%, 68%);

		background: var(--base-color);
	}

	.container {
		display: grid;
		justify-content: center;
	}
</style>
