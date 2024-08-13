<script lang="ts">
	import { __CompanyListDetailModal } from './store';
	import { Modal } from '@src/components-global/modal';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { BaseModal, ModalPosition } from '@src/components/basemodal';
	import { CardModal } from '@src/components/card/modal/index';
	import { Screen, screen } from '@src/store/env';
	import { ContainerGrid } from '@src/components/container';

	let { openStatus, data } = __CompanyListDetailModal;

	$: asyncCompanyDetailData = exec(async () => {
		if ($data) {
			return await API.Company.getCompanyDetails({ companyId: $data.data.company_id });
		}
	});
</script>

<BaseModal
	modalPosition={Screen.responsive($screen, {
		xs: ModalPosition.BOTTOM,
		sm: ModalPosition.CENTER
	})}
	width={Screen.responsive($screen, {
		xs: '100%',
		sm: '39rem'
	})}
	height={Screen.responsive($screen, {
		xs: '100%',
		sm: '41rem'
	})}
	bind:active={$openStatus}
>
	<CardModal
		title="Company Detail"
		padding="0.5rem"
		closeListener={() => Modal.MemberListDetailModal.close()}
		scrollShade={300}
		containerHeight={'100%'}
	>
		<ContainerGrid style={{ padding: '0 1rem' }}>
			{#await asyncCompanyDetailData}
				<div>Loading...</div>
			{:then companyDetailData}
				<div>
					<h1>{companyDetailData.company_name || '-'}</h1>
					{#if companyDetailData.company_logo}
						<img
							src={companyDetailData.company_logo}
							alt="Company Logo"
							style="width: 100%; max-width: 200px;"
						/>
					{:else}
						<p><strong>Logo:</strong> No logo available</p>
					{/if}
					<p><strong>Industry Type:</strong> {companyDetailData.industry_type.join(', ') || '-'}</p>
					<div>
						<strong>Positions:</strong>
						<ul>
							{#if companyDetailData.position && companyDetailData.position.length > 0}
								{#each companyDetailData.position as pos}
									<li>{pos.name}</li>
								{/each}
							{:else}
								<li>No positions available</li>
							{/if}
						</ul>
					</div>
				</div>
			{/await}
		</ContainerGrid>
	</CardModal>
</BaseModal>
