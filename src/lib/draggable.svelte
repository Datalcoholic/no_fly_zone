<script>
	import { mouseAdjusted } from '../lib/Utilities';

	export let mouseX;
	export let mouseY;
	let offset;

	let isMove = false;
	const start = (e) => {
		isMove = true;
		const element = e.target;
		const target = e.target.parentElement.parentElement.getScreenCTM();

		// get the mouse position in the svg shape
		offset = mouseAdjusted(e.clientX, e.clientY, target);
		// rest the shape mouse posicion from the shape x y coordinates
		offset[1] -= +element.getAttributeNS(null, 'y');
		offset[0] -= +element.getAttributeNS(null, 'x');
	};
	const move = (e) => {
		if (isMove) {
			const target = e.target.parentElement.parentElement.getScreenCTM();
			const [x, y] = mouseAdjusted(e.clientX, e.clientY, target);
			mouseX = offset[0] - x;
			mouseY = offset[1] - y;
		}
	};
	const end = () => {
		isMove = false;
		offset = null;
	};
</script>

<svelte:window
	on:mousemove|preventDefault={move}
	on:mouseup|preventDefault={end}
/>
<g class="draggable" on:mousedown={start}>
	<slot />
</g>
