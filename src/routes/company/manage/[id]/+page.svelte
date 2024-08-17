<script lang="ts">
	import { RCCompany } from '@src/components-route/company';
	import { FrameContent } from '@src/components/frame';
	import { page } from '$app/stores';

	$: companyId = $page.params.id;
</script>

<FrameContent>
	<RCCompany.Detail {companyId} />
</FrameContent>
