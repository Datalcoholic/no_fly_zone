<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import * as topojson from 'topojson-client';
	import Draggable from './draggable.svelte';

	let width = 500;
	$: width = width * 0.95;
	let height = 500;
	$: height = height * 0.98;
	let world;
	let x;
	let y;
	let projection;
	let path;
	let ROTATION = [-45, -65, 0];
	let sphere = { type: 'Sphere' };
	// Add topojsom
	onMount(async () => {
		const resp = await d3.json(
			'/src/assets/world-administrative-boundaries.json'
		);
		world = await topojson.feature(resp, 'world-administrative-boundaries');

		projection = d3
			.geoOrthographic()
			.fitSize([width, height], sphere)
			.scale([width / 3])
			.rotate(ROTATION);

		path = d3.geoPath(projection);
	});

	$: ROTATION = [-x, y, 0];
	// $: projection = d3
	// 	.geoOrthographic()
	// 	.fitSize([width, height], world)
	// 	.scale([width / 3])
	// 	.rotate(ROTATION);
	$: projection = projection?.rotate(ROTATION);
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
	// $: countries = world?.features.map((obj) => {
	// 	const { geometry, properties, _ } = obj;
	// 	//const d = path(geometry);
	// 	const fill = fillScale(properties.iso3);
	// 	const stroke = strokeScale(properties.iso3);
	// 	const newProperties = Object.assign({ ...properties }, { fill, stroke });
	// 	return Object.assign({}, { geometry, properties: newProperties });
	// });

	//	$: console.log('features', features);
	$: console.log('first', ROTATION);
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<svg {width} {height}>
	<Draggable bind:mouseX={x} bind:mouseY={y}>
		{#if world}
			<path class="sphere" d={path(sphere)} />
			{#each world.features as country}
				<path
					d={path(country.geometry)}
					fill={fillScale(country.properties.iso3)}
					stroke={strokeScale(country.properties.iso3)}
				/>
			{/each}
		{/if}
	</Draggable>
</svg>

<style>
	svg {
		border: 1px solid tomato;
	}
	.sphere {
		fill: var(--base-color-2);
	}
</style>
