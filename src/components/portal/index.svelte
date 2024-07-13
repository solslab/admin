<script lang="ts">
	let ele: HTMLDivElement;

	$: rootPortal = document.querySelector('.root-portal');
	$: rootPortal && ele && rootPortal.appendChild(ele);
</script>

<div class="unit-portal" bind:this={ele}>
	<slot />
</div>
