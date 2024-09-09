<script lang="ts">
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
	import { goto } from '$app/navigation';
	import { Icon, IconPropType } from '@src/components/icon';
	import { css } from '@src/util/style';
	import { page } from '$app/stores';
	import { TabItems } from './index';
	import { Button } from '@src/components/button';

	function selectTab(tabId: string) {
		goto(`/?type=${tabId}`);
	}

	function goToRoot() {
		goto('/');
	}

	$: selectedTab = $page.url.searchParams.get('type') || TabItems[0]?.id;
</script>

<div class="navigation-header">
</div>

<style lang="scss">
	.navigation-header {
		height: $frame-header-height;
		background: var(--hq-base-0200);
		border-bottom: solid 1px var(--hq-transparent-inverse-0300);
		color: var(--hq-base-0400);
		font-size: 14px;
	}
</style>
