<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import * as topojson from 'topojson-client';
	import Draggable from './draggable.svelte';
	import { addLabel, changeName, isBan, move } from './Utilities';

	let width = 500;
	$: width = width * 0.95;
	let height = 500;
	$: height = height * 0.98;
	let world;
	let x;
	let y;
	let projection;
	let path;
	let ROTATION = [35, -75, -20];

	// Add topojsom
	onMount(async () => {
		const resp = await d3.json(
			'/src/assets/world-administrative-boundaries.json'
		);
		world = await topojson.feature(resp, 'world-administrative-boundaries');
	});

	//$: ROTATION = [-x, y, 0];
	$: projection = d3
		.geoOrthographic()
		.fitSize([width, height], world)
		.scale([height / 2])
		.translate([width / 2, height / 2])
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
		const iso3 = properties.iso3;
		const fill = fillScale(iso3);
		const stroke = strokeScale(iso3);
		const ban = isBan(iso3);
		const newName = changeName(iso3);
		const label = newName ? newName : properties.name;
		const translate = move(iso3);

		const centroid = path.centroid(geometry);
		const newProperties = Object.assign(
			{ ...properties },
			{ fill, stroke, ban, label, centroid, translate }
		);
		return Object.assign({}, { geometry, properties: newProperties });
	});

	//$: countries?.forEach((d) => console.log(d.properties));
	//$: console.log('first', ROTATION);
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<svg {width} {height}>
	<!-- <defs>
		<pattern
			id="restricted"
			viewBox="0 0 100 10 "
			width="3%"
			height="3%"
			preserveAspectRatio="xMidYMin"
		>
			<rect id="pattern-rect" x={0} y={0} width={150} height={200} />
			<circle id="pattern-circle" cx={50} cy={50} r={20} />
		</pattern>
	</defs> -->
	<Draggable bind:mouseX={x} bind:mouseY={y}>
		{#if countries}
			<path class="sphere" d={path({ type: 'Sphere' })} />
			<g class="countries">
				{#each countries as country}
					<path
						class={country.properties.iso3 === 'UKR' ||
						country.properties.iso3 === 'RUS'
							? ''
							: country.properties.ban}
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
			<g class="labels">
				{#each countries as country}
					{#if addLabel(country.properties.iso3)}
						<text
							x={country.properties.centroid[0]}
							y={country.properties.centroid[1]}
							style="fill:{country.properties.iso3 === 'RUS' ||
							country.properties.iso3 === 'UKR'
								? country.properties.stroke
								: 'hsl(192, 64%, 30%)'};
								transform:translate({country.properties.translate})
								
								"
						>
							{country.properties.label}
						</text>
					{/if}
				{/each}
			</g>

			<!-- content here -->
		{/if}
	</Draggable>
</svg>

<!-- markup (zero or more items) goes here -->
<style>
	/* svg {
		border: 1px solid tomato;
	} */

	.sphere {
		fill: var(--base-color-2);
	}

	.non-eu,
	.eu {
		fill: var(--no-fly-color);
	}

	.no-restricted {
		fill-opacity: 0.25;
	}

	.labels {
		text-anchor: middle;
		font-size: 1.3rem;
		font-weight: 400;
		stroke: var(--base-color);
		stroke-width: 2px;
		paint-order: stroke;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	/* #pattern-rect {
		fill: var(--no-fly-color);
	}

	#pattern-circle {
		fill: var(--no-fly-dark);
	} */
</style>
