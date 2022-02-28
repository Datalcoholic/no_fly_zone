<script>
	let width;
	$: width = width * 0.95;
	let height;
	$: height = height * 0.98;
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<svg {width} {height}>
	<slot />
</svg>

<!-- markup (zero or more items) goes here -->
<style>
	svg {
		border: 1px solid tomato;
	}
</style>
