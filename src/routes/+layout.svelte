<script lang="ts">
	import { browser } from '$app/environment';
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
	import NavigationFooter from '@src/layout/navigation-footer.svelte';
	import NavigationHeader from '@src/layout/navigation-header.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { TabItems } from '@src/layout/index';
	import { onMount } from 'svelte';


	if (browser) {
		onMount(() => {
			const currentType = $page.url.searchParams.get('type'); 

			if (!TabItems.some((tab) => tab.id === currentType)) {
				goto(`/?type=user-management`, { replaceState: true });
			}
		});
	}

	// support & feedback 은 status 상태로 넘겨줄 거임 company 안에 job들어가고 기업 선택시 tab 나오게 하면 될듯.
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
