<script lang="ts">
	import { __PositionListDetailModal } from './store';
	import { Modal } from '@src/components-global/modal';
	import { API } from '@src/lib/api';
	import { BaseModal, ModalPosition } from '@src/components/basemodal';
	import { CardModal } from '@src/components/card/modal/index';
	import { IconPropType } from '@src/util/icon';
	import { Screen, screen } from '@src/store/env';
	import { ContainerGrid } from '@src/components/container';
	import { SectionDivider } from '@src/components/section';
	import { CardContentAccentArea } from '@src/components/content';
	import { mdiPencil } from '@mdi/js';
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { ValueRow } from '@src/components/value-row';
	import { BCTypo } from '@src/components/typo';
	import { ComponentSizeProps } from '@src/util/component';
	import { ButtonIcon } from '@src/components/buttonicon';
	import { Button } from '@src/components/button';
	import { Input } from '@src/components/input';
	import { companyPositionData } from '@src/util/company/index';
	import _ from 'lodash';

	let { openStatus, data } = __PositionListDetailModal;

	let isEditing = false;
	let positionName = '';
	let supportLanguages = '';
	let testTime = '';
	let problemInfo = '';
	let permitIDE = '';
	let permitSearch = '';
	let hiddenCase = '';
	let examMode = '';
	let testPlace = '';
	let note = '';

	const validLanguages = [
		'C',
		'C++',
		'C#',
		'Java',
		'JavaScript',
		'Kotlin',
		'Python',
		'Go',
		'Ruby',
		'Scala',
		'Swift',
		'SQL',
		'Oracle'
	];

	interface CreatePositionRequest {
		positionId: string;
		position_name: string;
		support_languages: string[];
		test_time?: string | null;
		problem_info?: string | null;
		permit_ide?: string | null;
		permit_search?: string | null;
		hidden_case?: string | null;
		exam_mode?: string | null;
		test_place?: string | null;
		note?: string | null;
	}

	// Toggle helper function for IDE, Search, Hidden Case, etc.
	function toggleOption(option: string, value: string) {
		return option === value ? '' : value; // If already selected, deselect; otherwise, select
	}

	async function updatePosition() {
		const languages = supportLanguages.split(',').map((lang) => lang.trim());
		const invalidLanguages = languages.filter((lang) => !validLanguages.includes(lang));

		if (invalidLanguages.length > 0) {
			alert(`잘못된 언어: ${invalidLanguages.join(', ')}. 정해진 언어만 사용해 주세요.`);
			return;
		}

		const positionData: CreatePositionRequest = {
			positionId: $data.data.position_id,
			position_name: positionName,
			support_languages: languages,
			test_time: testTime || null,
			problem_info: problemInfo || null,
			permit_ide: permitIDE || null,
			permit_search: permitSearch || null,
			hidden_case: hiddenCase || null,
			exam_mode: examMode || null,
			test_place: testPlace || null,
			note: note || null
		};

		try {
			const result = await API.Position.updatePosition(positionData);

			alert('Position updated successfully');

			companyPositionData.update((positions) => {
				const position = _.find(positions, { position_id: result.position_id });
				if (position) {
					Object.assign(position, result);
				}
				return positions;
			});

			Modal.PositionListDetailModal.close();
			clearForm();
			isEditing = false;
		} catch (error) {
			alert('Failed to update position');
		}
	}

	function clearForm() {
		positionName = '';
		supportLanguages = '';
		testTime = '';
		problemInfo = '';
		permitIDE = '';
		permitSearch = '';
		hiddenCase = '';
		examMode = '';
		testPlace = '';
		note = '';
	}

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
		sm: '45rem'
	})}
	bind:active={$openStatus}
>
	<CardModal
		titleSize={2}
		title="Test Information Detail"
		padding="0.5rem"
		closeListener={() => Modal.PositionListDetailModal.close()}
		scrollShade={300}
		containerHeight={'100%'}
	>
		<CardContentAccentArea
			disableArea
			height="100%"
			style={{ padding: '0 0.8rem' }}
			overflow="scroll"
		>
			<ContainerGrid style={{ paddingBottom: '1rem' }}>
				<SectionDivider height={0.1} line />
			</ContainerGrid>
			{#if $data}
				<ContainerGrid style={{ paddingBottom: '0.5rem' }}>
					<FieldFlex alignItems="center" justifyContent="flex-end">
						<ButtonIcon
							icon={{
								type: IconPropType.PATH,
								src: mdiPencil,
								scale: 1.2
							}}
							size={ComponentSizeProps.SM}
							ghost
							on:click={() => {
								if (!isEditing) {
									positionName = $data.data.position_name || '';
									supportLanguages = ($data.data.support_languages || []).join(', ');
									testTime = $data.data.test_time || '';
									problemInfo = $data.data.problem_info || '';
									permitIDE = $data.data.permit_ide || '';
									permitSearch = $data.data.permit_search || '';
									hiddenCase = $data.data.hidden_case || '';
									examMode = $data.data.exam_mode || '';
									testPlace = $data.data.test_place || '';
									note = $data.data.note || '';
									isEditing = true;
								} else {
									isEditing = false;
								}
							}}
						/>
					</FieldFlex>
				</ContainerGrid>
				<CardContentAccentArea border contentStyle={{ padding: '0 0.6rem' }} height="fit-content">
					<FieldGrid gap="0rem" full>
						<!-- Position Name -->
						<ValueRow
							{headerWidth}
							titleSans
							name="시험 정보"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
								<Input
									type="text"
									bind:value={positionName}
									size={ComponentSizeProps.MD}
									placeholder="시험정보 입력"
									width="100%"
								/>
							{:else}
								<BCTypo.Text
									prop={{ h: 5, mid: true }}
									text={$data.data.position_name || '-'}
								/>
							{/if}
						</ValueRow>

						<!-- Support Languages -->
						<ValueRow
							{headerWidth}
							titleSans
							name="지원 언어"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
								<Input
									type="text"
									bind:value={supportLanguages}
									size={ComponentSizeProps.MD}
									placeholder="Enter Support Languages (comma separated)"
									width="100%"
								/>
							{:else}
								<BCTypo.Text
									prop={{ h: 5, mid: true }}
									text={$data.data.support_languages.join(', ') || '-'}
								/>
							{/if}
						</ValueRow>

						<!-- Test Time -->
						<ValueRow
							{headerWidth}
							titleSans
							name="시험 시간"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
								<Input
									type="text"
									bind:value={testTime}
									size={ComponentSizeProps.MD}
									placeholder="시험시간 입력"
									width="100%"
								/>
							{:else}
								<BCTypo.Text prop={{ h: 5, mid: true }} text={$data.data.test_time || '-'} />
							{/if}
						</ValueRow>

						<!-- Problem Info -->
						<ValueRow
							{headerWidth}
							titleSans
							name="문제 유형"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
								<Input
									type="text"
									bind:value={problemInfo}
									size={ComponentSizeProps.MD}
									placeholder="문제 정보 입력"
									width="100%"
								/>
							{:else}
								<BCTypo.Text prop={{ h: 5, mid: true }} text={$data.data.problem_info || '-'} />
							{/if}
						</ValueRow>

						<!-- Permit IDE -->
						<ValueRow
							{headerWidth}
							titleSans
							name="IDE 허용여부"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
							<FieldFlex direction="row" gap={0.5} full>
								<Button
									size="sm"
									selected={permitIDE === '가능'}
									on:click={() => (permitIDE = toggleOption(permitIDE, '가능'))}
									style={{ flex: '1' }}
								>
									가능
								</Button>
								<Button
									size="sm"
									selected={permitIDE === '불가능'}
									on:click={() => (permitIDE = toggleOption(permitIDE, '불가능'))}
									style={{ flex: '1' }}
								>
									불가능
								</Button>
							</FieldFlex>
							{:else}
								<BCTypo.Text prop={{ h: 5, mid: true }} text={$data.data.permit_ide || '-'} />
							{/if}
						</ValueRow>

						<!-- Permit Search -->
						<ValueRow
							{headerWidth}
							titleSans
							name="구글링 허용여부"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
							<FieldFlex direction="row" gap={0.5} full>
								<Button
									size="sm"
									selected={permitSearch === '가능'}
									on:click={() => (permitSearch = toggleOption(permitSearch, '가능'))}
									style={{ flex: '1' }}
								>
									가능
								</Button>
								<Button
									size="sm"
									selected={permitSearch === '불가능'}
									on:click={() => (permitSearch = toggleOption(permitSearch, '불가능'))}
									style={{ flex: '1' }}
								>
									불가능
								</Button>
							</FieldFlex>
							{:else}
								<BCTypo.Text
									prop={{ h: 5, mid: true }}
									text={$data.data.permit_search || '-'}
								/>
							{/if}
						</ValueRow>

						<!-- Hidden Case -->
						<ValueRow
							{headerWidth}
							titleSans
							name="히든케이스 존재여부"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
							<FieldFlex direction="row" gap={0.5} full>
								<Button
									selected={hiddenCase === '있음'}
									on:click={() => (hiddenCase = toggleOption(hiddenCase, '있음'))}
									style={{ flex: '1' }}
								>
									있음
								</Button>
								<Button
									selected={hiddenCase === '없음'}
									on:click={() => (hiddenCase = toggleOption(hiddenCase, '없음'))}
									style={{ flex: '1' }}
								>
									없음
								</Button>
							</FieldFlex>
							{:else}
								<BCTypo.Text prop={{ h: 5, mid: true }} text={$data.data.hidden_case || '-'} />
							{/if}
						</ValueRow>

						<!-- Exam Mode -->
						<ValueRow
							{headerWidth}
							titleSans
							name="시험 모드"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
							<FieldFlex direction="row" gap={0.5} full>
								<Button
									selected={examMode === '대면'}
									on:click={() => (examMode = toggleOption(examMode, '대면'))}
									style={{ flex: '1' }}
								>
									대면
								</Button>
								<Button
									selected={examMode === '비대면'}
									on:click={() => (examMode = toggleOption(examMode, '비대면'))}
									style={{ flex: '1' }}
								>
									비대면
								</Button>
							</FieldFlex>
							{:else}
								<BCTypo.Text prop={{ h: 5, mid: true }} text={$data.data.exam_mode || '-'} />
							{/if}
						</ValueRow>

						<!-- Test Place -->
						<ValueRow
							{headerWidth}
							titleSans
							name="시험장소 / 플랫폼"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
								<Input
									type="text"
									bind:value={testPlace}
									size={ComponentSizeProps.MD}
									placeholder="시험장소 입력"
									width="100%"
								/>
							{:else}
								<BCTypo.Text prop={{ h: 5, mid: true }} text={$data.data.test_place || '-'} />
							{/if}
						</ValueRow>

						<!-- Note -->
						<ValueRow
							{headerWidth}
							titleSans
							name="참고사항"
							styleRoot={{ alignItems: 'center' }}
							titleProp={{ h: 5, mid: true }}
							paint={{
								harmonyName: 'base',
								harmonyShade: 2300
							}}
						>
							{#if isEditing}
								<Input
									type="text"
									bind:value={note}
									size={ComponentSizeProps.MD}
									placeholder="참고사항 입력"
									width="100%"
								/>
							{:else}
								<BCTypo.Text prop={{ h: 5, mid: true }} text={$data.data.note || '-'} />
							{/if}
						</ValueRow>
						{#if isEditing}
							<ContainerGrid style={{ paddingTop: '1rem' }}>
								<Button on:click={updatePosition}>Update Position</Button>
							</ContainerGrid>
						{/if}
					</FieldGrid>
				</CardContentAccentArea>
			{/if}
		</CardContentAccentArea>
	</CardModal>
</BaseModal>
