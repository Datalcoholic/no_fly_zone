<script>
	import { onMount, onDestroy } from 'svelte';
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
	// Add topojsom
	onMount(async () => {
		const resp = await d3.json(
			'/src/assets/world-administrative-boundaries.json'
		);
		world = await topojson.feature(resp, 'world-administrative-boundaries');
	});

	$: ROTATION = [-x, y, 0];
	$: projection = d3
		.geoOrthographic()
		.fitSize([width, height], world)
		.scale([width / 3])
		.rotate(ROTATION);

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
	$: countries = world?.features.map((obj) => {
		const { geometry, properties, _ } = obj;
		//const d = path(geometry);
		const fill = fillScale(properties.iso3);
		const stroke = strokeScale(properties.iso3);
		const newProperties = Object.assign({ ...properties }, { fill, stroke });
		return Object.assign({}, { geometry, properties: newProperties });
	});

	//	$: console.log('features', features);
	//$: console.log('first', ROTATION);
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<svg {width} {height}>
	<Draggable bind:mouseX={x} bind:mouseY={y}>
		{#if countries}
			<path class="sphere" d={path({ type: 'Sphere' })} />
			<g class="countries">
				{#each countries as country}
					<path
						d={path(country.geometry)}
						fill={country.properties.fill}
						stroke={country.properties.stroke}
						style="stroke-width:{country.properties.iso3 === 'UKR' ||
						country.properties.iso3 === 'RUS'
							? 1.5
							: 0.3}px"
					/>
				{/each}
			</g>
		{/if}
	</Draggable>
</svg>

<!-- markup (zero or more items) goes here -->
<style>
	svg {
		border: 1px solid tomato;
	}

	.sphere {
		fill: var(--base-color-2);
	}
</style>
