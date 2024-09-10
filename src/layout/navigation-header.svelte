<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '@src/components/button';
	import { API } from '@src/lib/api';

	$: routePart = $page.url.pathname.split('/')[1]?.toUpperCase() || 'MAIN';

	async function handleLogout() {
		if (confirm('로그아웃 하시겠습니까?')) {
			try {
				await API.Admin.adminLogout('solslab24@gmail.com');
				alert('성공적으로 로그아웃되었습니다.');
				window.location.href = '/';
			} catch (error) {
				alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
			}
		}
	}
</script>

<div class="navigation-header">
	<div class="nav-content">
		<span>{routePart}</span>
		<Button on:click={handleLogout}>로그아웃</Button>
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
