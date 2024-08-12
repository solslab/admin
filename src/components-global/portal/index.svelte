<script lang="ts">
	import { page } from '$app/stores';

	let ref: HTMLDivElement;

	$: rootPortal = document.querySelector('.root-portal');
	$: ref && rootPortal && rootPortal.appendChild(ref);
</script>

<div bind:this={ref} class="portal-unit">
	<slot />
</div>

<style lang="scss">
	.portal-unit {
		pointer-events: none;
	}
</style>
