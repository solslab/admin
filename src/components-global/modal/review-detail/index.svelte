<script lang="ts">
	import { __ReviewListDetailModal } from './store';
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

	let { openStatus, data } = __ReviewListDetailModal;

	$: asyncReviewDetailData = exec(async () => {
		if ($data) {
			return await API.Review.getTestReviewDetails({ trId: $data.data.tr_id });
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
		title="Review Detail"
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
				{#await asyncReviewDetailData}
					<div>Loading...</div>
				{:then reviewDetailData}
					<ContainerGrid style={{ paddingBottom: '1rem' }}>
						<BCTypo.Text
							prop={{ h: 3, bold: true }}
							paint={{ harmonyName: 'base', harmonyShade: 2300 }}
							text={reviewDetailData.company_name || '-'}
						/>
					</ContainerGrid>
					<FieldGrid gap="0rem" full>
						<ContainerGrid style={{ paddingBottom: '0.2rem' }}>
							<FieldGrid gap={0.3}>
								<ValueRow
									{headerWidth}
									titleSans
									name="이름"
									styleRoot={{ alignItems: 'center' }}
									value={reviewDetailData.member_name || '-'}
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
									value={reviewDetailData.member_tier ?? '-'}
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
									name="직무 분야"
									styleRoot={{ alignItems: 'center' }}
									value={`${reviewDetailData.tr_year ?? '-'} ${reviewDetailData.tr_position ?? '-'} ${reviewDetailData.tr_career ?? '-'}`}
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
									name="문제/정답"
									styleRoot={{ alignItems: 'center' }}
									value={`${reviewDetailData.tr_problem_num ?? 0} / ${reviewDetailData.tr_solved_num ?? 0}`}
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
									name="합불"
									styleRoot={{ alignItems: 'center' }}
									value={reviewDetailData.tr_pass_status ?? '-'}
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
									{#if reviewDetailData.tr_problem_type && reviewDetailData.tr_problem_type.length > 0}
										{#each reviewDetailData.tr_problem_type as type}
											<BCTypo.Text
												prop={{ h: 5, bold: true }}
												paint={{ harmonyName: 'base', harmonyShade: 2300 }}
												text={type}
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
									name="코멘트"
									styleRoot={{ alignItems: 'center' }}
									value={reviewDetailData.tr_comment ?? '-'}
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
									name="생성일"
									styleRoot={{ alignItems: 'center' }}
									value={reviewDetailData.created_date ?? '-'}
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
							</FieldGrid>
						</ContainerGrid>
					</FieldGrid>
				{/await}
			</CardContentAccentArea>
		</CardContentAccentArea>
	</CardModal>
</BaseModal>
