<script lang="ts">
	import { __SuggestionDetailModal } from './store';
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

	let { openStatus, data } = __SuggestionDetailModal;

	const statusOptions = [
		{ id: 'NOT_STARTED', text: '처리 전' },
		{ id: 'IN_PROGRESS', text: '처리 중' },
		{ id: 'COMPLETED', text: '완료' },
		{ id: 'REJECTED', text: '거절됨' }
	];

	$: asyncSuggestionDetailData = exec(async () => {
		if ($data) {
			return await API.Suggestion.getSuggestionDetails({ SuggestionId: $data.data.suggestion_id });
		}
	});

	$: headerWidth = 10;

	// 상태 텍스트를 가져오는 함수
	function getStatusText(status: string): string {
		const statusOption = statusOptions.find((option) => option.id === status);
		return statusOption ? statusOption.text : status; // 상태 텍스트가 없을 경우 원래 값을 반환
	}
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
		sm: '40rem'
	})}
	bind:active={$openStatus}
>
	<CardModal
		titleSize={2}
		title="Review Detail"
		padding="0.5rem"
		closeListener={() => Modal.SuggestionDetailModal.close()}
		scrollShade={300}
		containerHeight={'100%'}
	>
		<CardContentAccentArea disableArea height="100%" style={{ padding: '0 0.8rem' }}>
			<ContainerGrid style={{ paddingBottom: '1rem' }}>
				<SectionDivider height={0.1} line />
			</ContainerGrid>
			<CardContentAccentArea border contentStyle={{ padding: '0 0.6rem' }} height="fit-content">
				{#await asyncSuggestionDetailData}
					<div>Loading...</div>
				{:then SuggestionDetailData}
					<ContainerGrid style={{ paddingBottom: '1rem' }}>
						<BCTypo.Text
							prop={{ h: 3, bold: true }}
							paint={{ harmonyName: 'base', harmonyShade: 2300 }}
							text={SuggestionDetailData.company_name || '-'}
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
									value={SuggestionDetailData.member_name || '-'}
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
									name="이메일"
									styleRoot={{ alignItems: 'center' }}
									value={SuggestionDetailData.member_email ?? '-'}
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
									name="직무"
									styleRoot={{ alignItems: 'center' }}
									value={SuggestionDetailData.position_name ?? '-'}
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
									name="정보수정요청 내용"
									styleRoot={{ alignItems: 'center' }}
									value={SuggestionDetailData.suggestion_content ?? '-'}
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
									name="상태"
									styleRoot={{ alignItems: 'center' }}
									value={getStatusText(SuggestionDetailData.status) ?? '-'}
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
									value={SuggestionDetailData.created_date ?? '-'}
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
