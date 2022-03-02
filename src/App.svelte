<script>
	import Graph from './lib/graph.svelte';
</script>

<main>
	<section class="container">
		<h2 class="description">
			Paises que le han <span class="cerrado">cerrado</span> el uso de su
			espacio aereo a
			<span class="rusia">Rusia</span>
		</h2>
		<Graph />
	</section>
</main>

<style>
	:root {
		@import url('https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500&display=swap');

		font-family: 'Teko';

		--base-color: hsl(227, 16%, 22%);
		--base-color-2: hsl(227, 16%, 18%);
		--base-rest-country-color: hsl(227, 16%, 42%);
		--rusia-color: hsl(9, 64%, 50%);
		--rusia-color-2: hsl(9, 64%, 35%);
		--ukraine-color: hsl(40, 98%, 47%);
		--ukraine-color-2: hsl(40, 98%, 35%);
		--no-fly-color: hsl(192, 64%, 40%);
		--no-fly-color-1: hsl(192, 64%, 62%);
		--no-fly-dark: hsl(192, 64%, 28%);
		--font-color: hsl(212, 22%, 68%);

		background: var(--base-color);
		color: var(--font-color);
	}

	.container {
		display: grid;
		justify-content: center;
		justify-items: center;
	}
	h2 {
		width: 30ch;
	}
	.description {
		color: var(--font-color);
		margin: 0;
	}

	span {
		color: var(--base-color);
		border-radius: 4px;
		padding: 0 4px;
	}
	.rusia {
		background: var(--rusia-color);
	}
	.cerrado {
		background: var(--no-fly-color);
	}
</style>
