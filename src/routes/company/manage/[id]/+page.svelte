<script lang="ts">
	import { onDestroy } from 'svelte';
	import { RCCompany } from '@src/components-route/company';
	import { FrameContent } from '@src/components/frame';
	import { page } from '$app/stores';
	import { companyDetailData, companyPositionData } from '@src/util/company'; // 스토어 경로를 적절히 수정

	$: companyId = $page.params.id;

	// 컴포넌트가 파괴될 때 스토어 초기화
	onDestroy(() => {
		companyDetailData.set(null);
		companyPositionData.set([]);
	});
</script>

<FrameContent>
	<RCCompany.Detail {companyId} />
</FrameContent>
