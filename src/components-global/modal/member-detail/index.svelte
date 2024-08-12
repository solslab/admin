<script lang="ts">
	import { __MemberListDetailModal } from './store';
	import { Modal } from '@src/components-global/modal';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { BaseModal, ModalPosition } from '@src/components/basemodal';
	import { CardModal } from '@src/components/card/modal/index';
	import { Screen, screen } from '@src/store/env';
	import { ContainerGrid } from '@src/components/container';

	let { openStatus, data } = __MemberListDetailModal;

	$: console.log($data);

	$: asyncMemberDetailData = exec(async () => {
		if ($data) {
			return await API.Member.getMemberDetails({ memberKey: $data.data.member_key });
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
		title="Member Detail"
		padding="0.5rem"
		closeListener={() => Modal.MemberListDetailModal.close()}
		scrollShade={300}
		containerHeight={'100%'}
	>
		<ContainerGrid style={{ padding: '0 1rem' }}>
			{#await asyncMemberDetailData}
				<div>Loading...</div>
			{:then memberDetailData}
				<div>
					<h1>{memberDetailData.name || '-'}</h1>
					<p><strong>Email:</strong> {memberDetailData.email || '-'}</p>
					<p><strong>Member Tier:</strong> {memberDetailData.member_tier ?? '-'}</p>
					<p><strong>Social Type:</strong> {memberDetailData.social_type || '-'}</p>

					<div>
						<strong>Preferred Languages:</strong>
						<ul>
							{#if memberDetailData.prefer_languages && memberDetailData.prefer_languages.length > 0}
								{#each memberDetailData.prefer_languages as language}
									<li>{language}</li>
								{/each}
							{:else}
								<li>-</li>
							{/if}
						</ul>
					</div>

					<div>
						<strong>Preferred Industries:</strong>
						<ul>
							{#if memberDetailData.prefer_industries && memberDetailData.prefer_industries.length > 0}
								{#each memberDetailData.prefer_industries as industry}
									<li>{industry}</li>
								{/each}
							{:else}
								<li>-</li>
							{/if}
						</ul>
					</div>
				</div>
			{/await}
		</ContainerGrid>
	</CardModal>
</BaseModal>
