<script lang="ts">
	import { __MemberListDetailModal } from './store';
	import { Modal } from '@src/components-global/modal';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { BaseModal, ModalPosition } from '@src/components/basemodal';
	import { CardModal } from '@src/components/card/modal/index';
	import { Screen, screen } from '@src/store/env';
	import { ContainerGrid } from '@src/components/container';
	import { SectionDivider } from '@src/components/section';
	import { CardContentAccentArea } from '@src/components/content';
	import { FieldGrid } from '@src/components/field';
	import { ValueRow } from '@src/components/value-row';
	import { BCTypo } from '@src/components/typo';

	let { openStatus, data } = __MemberListDetailModal;

	$: asyncMemberDetailData = exec(async () => {
		if ($data) {
			return await API.Member.getMemberDetails({ memberKey: $data.data.member_key });
		}
	});
	$: headerWidth = 10;
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
		sm: '24rem'
	})}
	bind:active={$openStatus}
>
	<CardModal
		titleSize={2}
		title="Member Detail"
		padding="0.5rem"
		closeListener={() => Modal.MemberListDetailModal.close()}
		scrollShade={300}
		containerHeight={'100%'}
	>
		<CardContentAccentArea disableArea height="100%" style={{ padding: '0 0.8rem' }}>
			<ContainerGrid style={{ paddingBottom: '1rem' }}>
				<SectionDivider height={0.1} line />
			</ContainerGrid>
			<CardContentAccentArea border contentStyle={{ padding: '0 0.6rem' }} height="fit-content">
				{#await asyncMemberDetailData}
					<div>Loading...</div>
				{:then memberDetailData}
					<ContainerGrid style={{ paddingBottom: '1rem' }}>
						<BCTypo.Text
							prop={{ h: 3, bold: true }}
							paint={{ harmonyName: 'base', harmonyShade: 2300 }}
							text={memberDetailData.name || '-'}
						/>
					</ContainerGrid>
					<FieldGrid gap="0rem" full>
						<ContainerGrid style={{ paddingBottom: '0.2rem' }}>
							<FieldGrid gap={0.3}>
								<ValueRow
									{headerWidth}
									titleSans
									name="이메일"
									styleRoot={{ alignItems: 'center' }}
									value={memberDetailData.email || '-'}
									titleProp={{ h: 5, mid: true }}
									textProp={{
										h: 5,
										bold: true
									}}
									paint={{
										harmonyName: 'base',
										harmonyShade: 2300
									}}
								/>

								<ValueRow
									{headerWidth}
									titleSans
									name="티어"
									styleRoot={{ alignItems: 'center' }}
									value={memberDetailData.member_tier ?? '-'}
									titleProp={{ h: 5, mid: true }}
									textProp={{
										h: 5,
										bold: true
									}}
									paint={{
										harmonyName: 'base',
										harmonyShade: 2300
									}}
								/>

								<ValueRow
									{headerWidth}
									titleSans
									name="가입 방식"
									styleRoot={{ alignItems: 'center' }}
									value={memberDetailData.social_type || '-'}
									titleProp={{ h: 5, mid: true }}
									textProp={{
										h: 5,
										bold: true
									}}
									paint={{
										harmonyName: 'base',
										harmonyShade: 2300
									}}
								/>
								<ValueRow
									{headerWidth}
									titleSans
									name="주 사용 언어"
									styleRoot={{ alignItems: 'base-line' }}
									titleProp={{ h: 5, mid: true }}
									textProp={{
										h: 5,
										bold: true
									}}
									paint={{
										harmonyName: 'base',
										harmonyShade: 2300
									}}
								>
									{#if memberDetailData.prefer_languages && memberDetailData.prefer_languages.length > 0}
										{#each memberDetailData.prefer_languages as language}
											<BCTypo.Text
												prop={{ h: 5, bold: true }}
												paint={{ harmonyName: 'base', harmonyShade: 2300 }}
												text={language}
											/>
										{/each}
									{:else}
										<BCTypo.Text
											prop={{ h: 5, bold: true }}
											paint={{ harmonyName: 'base', harmonyShade: 2300 }}
											text={'-'}
										/>
									{/if}
								</ValueRow>

								<ValueRow
									{headerWidth}
									titleSans
									name="희망 취업 분야"
									styleRoot={{ alignItems: 'base-line' }}
									titleProp={{ h: 5, mid: true }}
									textProp={{
										h: 5,
										bold: true
									}}
									paint={{
										harmonyName: 'base',
										harmonyShade: 2300
									}}
								>
									{#if memberDetailData.prefer_industries && memberDetailData.prefer_industries.length > 0}
										{#each memberDetailData.prefer_industries as industry}
											<BCTypo.Text
												prop={{ h: 5, bold: true }}
												paint={{ harmonyName: 'base', harmonyShade: 2300 }}
												text={industry}
											/>
										{/each}
									{:else}
										<BCTypo.Text
											prop={{ h: 5, bold: true }}
											paint={{ harmonyName: 'base', harmonyShade: 2300 }}
											text={'-'}
										/>
									{/if}
								</ValueRow>
							</FieldGrid>
						</ContainerGrid>
					</FieldGrid>
				{/await}
			</CardContentAccentArea>
		</CardContentAccentArea>
	</CardModal>
</BaseModal>
