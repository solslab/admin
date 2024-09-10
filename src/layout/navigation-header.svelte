<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '@src/components/button';

	$: routePart = $page.url.pathname.split('/')[1]?.toUpperCase() || 'MAIN'; // Extracts the first part after '/'
</script>

<div class="navigation-header">
	<div class="nav-content">
		<span>{routePart}</span>
		<Button>로그아웃</Button>
	</div>
</div>

<style lang="scss">
	.navigation-header {
		height: $frame-header-height;
		background: var(--hq-base-0200);
		border-bottom: solid 1px var(--hq-transparent-inverse-0300);
		color: var(--hq-base-2300);
		font-size: 14px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
	}

	.nav-content {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}
</style>
