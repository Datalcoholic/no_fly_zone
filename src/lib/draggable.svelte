<script>
	import { mouseAdjusted } from '../lib/Utilities';
	export let mouseX;
	export let mouseY;
	let isMove = false;

	const start = () => {
		isMove = true;
	};
	const move = (e) => {
		if (isMove) {
			const element = e.target;
			const target = e.target.parentElement.parentElement.getScreenCTM();

			// get the mouse position in the svg shape
			let offset = mouseAdjusted(e.clientX, e.clientY, target);
			// rest the shape mouse posicion from the shape x y coordinates
			offset[1] -= +element.getAttributeNS(null, 'y');
			offset[0] -= +element.getAttributeNS(null, 'x');
			mouseX = offset[0];
			mouseY = offset[1];
		}
	};
	const end = () => {
		isMove = false;
	};
</script>

<svelte:window
	on:mousemove|preventDefault={move}
	on:mouseup|preventDefault={end}
/>
<g class="draggable" on:mousedown|preventDefault|stopPropagation={start}>
	<slot />
</g>
