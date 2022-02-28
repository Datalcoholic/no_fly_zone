<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import * as topojson from 'topojson-client';

	let width = 500;
	$: width = width * 0.95;
	let height = 500;
	$: height = height * 0.98;
	let world;
	$: console.log('world', world);
	// Add topojsom
	onMount(async () => {
		const resp = await d3.json(
			'/src/assets/world-administrative-boundaries.json'
		);
		world = await topojson.feature(resp, 'world-administrative-boundaries');
	});

	$: projection = d3.geoOrthographic().fitSize([width, height], world);
	$: path = d3.geoPath(projection);
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
