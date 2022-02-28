<script>
	export let mouseX;
	export let mouseY;
	let isMove = false;

	const start = () => {
		isMove = true;
	};
	const move = (e) => {
		if (isMove) {
			mouseX = e.clientX;
			mouseY = e.clientY;
		}
	};
	const end = () => {
		isMove = false;
	};
</script>

<svelte:window on:mousemove={move} on:mouseup={end} />
<g class="draggable" on:mousedown={start}>
	<slot />
</g>
