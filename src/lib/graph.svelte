<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import * as topojson from 'topojson-client';

	let width = 500;
	$: width = width * 0.95;
	let height = 500;
	$: height = height * 0.98;
	let world;
	// Add topojsom
	onMount(async () => {
		const resp = await d3.json(
			'/src/assets/world-administrative-boundaries.json'
		);
		world = await topojson.feature(resp, 'world-administrative-boundaries');
	});

	$: projection = d3.geoOrthographic().fitSize([width, height], world);
	$: path = d3.geoPath(projection);

	const fillScale = d3
		.scaleOrdinal()
		.domain(['UKR', 'RUS'])
		.range([' hsl(40, 98%, 47%)', 'hsl(9, 64%, 50%)'])
		.unknown('hsl(227, 16%, 42%)');
	const strokeScale = d3
		.scaleOrdinal()
		.domain(['UKR', 'RUS'])
		.range([' hsl(40, 98%, 35%)', 'hsl(9, 64%, 35%)'])
		.unknown('hsl(227, 16%, 22%)');
	// transform to features
	$: features = world?.features.map((obj) => {
		const { geometry, properties, _ } = obj;
		const d = path(geometry);
		const fill = fillScale(properties.iso3);
		const stroke = strokeScale(properties.iso3);
		return Object.assign({ ...properties }, { d, fill, stroke });
	});

	$: console.log('features', features);
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<svg {width} {height}>
	{#if features}
		{#each features as feature}
			<path d={feature.d} fill={feature.fill} stroke={feature.stroke} />
		{/each}
	{/if}
</svg>

<!-- markup (zero or more items) goes here -->
<style>
	svg {
		border: 1px solid tomato;
	}
</style>
