<script lang="ts">
	import { browser } from '$app/environment';
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
	import NavigationFooter from '@src/layout/navigation-footer.svelte';
	import NavigationHeader from '@src/layout/navigation-header.svelte';
</script>

<div class="root">
	<FieldGrid full row="48px 1fr 24px">
		<ContainerGrid>
			<NavigationHeader></NavigationHeader>
		</ContainerGrid>
		<ContainerGrid>
			<div class="content">
				{#if browser}
					<slot />
				{/if}
			</div>
		</ContainerGrid>
		<ContainerGrid>
			<NavigationFooter></NavigationFooter>
		</ContainerGrid>
	</FieldGrid>
</div>

<style lang="scss">
	@import './__layout_hub_colors.scss';

	.root {
		width: 100%;
		height: 100%;
		background: var(--hq-base-1000);
		.content {
			height: 100%;
		}
	}
</style>
