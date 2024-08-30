<script lang="ts">
	import { __Model } from '@src/lib/api/company/model';
	import { API } from '@src/lib/api';
	import { CardContentAccentArea } from '@src/components/content';
	import { SectionDivider } from '@src/components/section';
	import { mdiFileImagePlusOutline, mdiPencil, mdiCloseThick } from '@mdi/js';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo } from '@src/components/typo';
	import { ValueRow } from '@src/components/value-row';
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { IconPropType } from '@src/util/icon';
	import { BCUnitEmpty } from '@src/components/empty-box';
	import { Input } from '@src/components/input';
	import { Button } from '@src/components/button';
	import { ComponentSizeProps } from '@src/util/component';
	import { DefIcons } from '@src/icons/defines';
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon';
	import { BaseModal } from '@src/components/basemodal';
	import { BCUnit } from '@src/components/unit/index';
	import { BCLayout } from '@src/components/layout';
	import { onMountBrowser } from '@src/util/svelte';
	import { default as PositionListItem } from './item.svelte';
	import { companyDetailData, companyPositionData } from '@src/util/company/index';
	import { Companies } from '@src/util/company';

	export let companyId: string;

	let isEditing = false;
	let editedCompanyName = '';
	let selectedIndustryTypes: Set<__Model.IndustryType> = new Set();

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

	$: enableModal = false;

	async function createPosition() {
		const languages = supportLanguages.split(',').map((lang) => lang.trim());
		const invalidLanguages = languages.filter((lang) => !Companies.validLanguages.includes(lang));

		if (invalidLanguages.length > 0) {
			alert(`잘못된 언어: ${invalidLanguages.join(', ')}. 정해진 언어만 사용해 주세요.`);
			return;
		}

		const positionData: Companies.CreatePositionRequest = {
			companyId,
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
			await API.Position.createPosition(positionData);
			alert('Position created successfully');
			await fetchCompanyDetails();
			clearForm();
			enableModal = false;
		} catch (error) {
			alert('Failed to create position');
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

	async function fetchCompanyDetails() {
		const details = await API.Company.getCompanyDetails({ companyId });
		companyDetailData.set(details);

		if (details && details.positions) {
			const positionDetails = await Promise.all(
				details.positions.map(async (position: any) => {
					const details = await API.Position.getPositionDetails({
						positionId: position.position_id
					});
					return details;
				})
			);
			companyPositionData.set(positionDetails);
		}
	}

	$: headerWidth = 10;

	function toggleIndustryType(type: __Model.IndustryType) {
		if (selectedIndustryTypes.has(type)) {
			selectedIndustryTypes.delete(type);
		} else {
			selectedIndustryTypes.add(type);
		}
		selectedIndustryTypes = new Set(selectedIndustryTypes);
	}

	// 파일 입력 요소에 대한 참조 생성
	let fileInput: HTMLInputElement;

	// 파일 선택 핸들러
	async function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0 && companyId) {
			const file = files[0];
			const formData = new FormData();
			formData.append('file', file);

			try {
				await API.Company.uploadCompanyLogo({
					companyId: companyId,
					file: file,
					fileName: file.name
				});
				alert('Company logo uploaded successfully.');
				await fetchCompanyDetails();
			} catch (error) {
				alert('Failed to upload company logo.');
			}
		}
	}

	// 파일 삭제 핸들러
	async function handleDeleteLogo(companyId: string) {
		const confirmed = window.confirm('로고를 삭제하시겠습니까?');
		if (confirmed) {
			try {
				await API.Company.deleteCompanyLogo({ companyId });
				alert('로고가 삭제되었습니다.');

				await fetchCompanyDetails();
			} catch (error) {
				alert('로고 삭제에 실패했습니다.');
			}
		}
	}

	// 파일 선택 다이얼로그 열기
	function openFileDialog() {
		if (fileInput) {
			fileInput.click();
		}
	}

	onMountBrowser(() => {
		fetchCompanyDetails();
	});
</script>

<BCLayout.ContentsCenter
	transparent
	rootStyle={{ paddingTop: '0.6rem !important', paddingBottom: '0rem !important' }}
>
	<CardContentAccentArea disableArea height="100%" style={{ padding: '0 0.8rem' }}>
		{#if $companyDetailData}
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
								if ($companyDetailData?.industry_type) {
									$companyDetailData.industry_type.forEach((type) => {
										toggleIndustryType(type);
									});
								}
								isEditing = true;
							} else {
								selectedIndustryTypes = new Set();
								isEditing = false;
							}
						}}
					/>
				</FieldFlex>
			</ContainerGrid>

			<CardContentAccentArea border contentStyle={{ paddingLeft: '0.5rem' }} height="fit-content">
				<FieldGrid column={'1fr 15rem'} row="auto 1fr">
					<FieldGrid full row="auto 1fr">
						<FieldGrid gap={0.3}>
							<ValueRow
								{headerWidth}
								titleSans
								vertical={isEditing}
								name="회사 이름"
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
										bind:value={editedCompanyName}
										placeholder={$companyDetailData.company_name || '-'}
									/>
								{:else}
									<BCTypo.Text
										prop={{ h: 5, bold: true }}
										paint={{ harmonyName: 'base', harmonyShade: 2300 }}
										text={$companyDetailData.company_name || '-'}
									/>
								{/if}
							</ValueRow>
							<ValueRow
								{headerWidth}
								titleSans
								vertical={isEditing}
								name="업종"
								styleRoot={{ alignItems: 'center' }}
								titleProp={{ h: 5, mid: true }}
								paint={{
									harmonyName: 'base',
									harmonyShade: 2300
								}}
							>
								{#if isEditing}
									<FieldGrid gap={0.5} column="1fr 1fr 1fr">
										{#each Companies.industryOptions as type}
											<div
												class="industry-tag {selectedIndustryTypes.has(type) ? 'selected' : ''}"
												on:click={() => toggleIndustryType(type)}
											>
												{type}
											</div>
										{/each}
									</FieldGrid>
								{:else}
									<BCTypo.Text
										prop={{ h: 5, bold: true }}
										paint={{ harmonyName: 'base', harmonyShade: 2300 }}
										text={$companyDetailData.industry_type.join(', ') || '-'}
									/>
								{/if}
							</ValueRow>
							{#if !isEditing}
								<ValueRow
									{headerWidth}
									titleSans
									name="포지션"
									styleRoot={{ alignItems: 'center' }}
									titleProp={{ h: 5, mid: true }}
									paint={{
										harmonyName: 'base',
										harmonyShade: 2300
									}}
								>
									<BCTypo.Text
										prop={{ h: 5, bold: true }}
										paint={{ harmonyName: 'base', harmonyShade: 2300 }}
										text={$companyDetailData.positions.map((pos) => pos.position_name).join(', ') ||
											'-'}
									/>
								</ValueRow>
							{/if}

							{#if isEditing}
								<Button
									on:click={async () => {
										const industryList = Array.from(selectedIndustryTypes);
										await API.Company.updateCompany({
											companyId: companyId,
											company_name: editedCompanyName,
											industry_type: industryList
										});
										const updatedData = await API.Company.getCompanyDetails({ companyId });
										companyDetailData.set(updatedData); // Update store
										editedCompanyName = '';
										isEditing = false;
									}}
									><BCTypo.Text
										prop={{ h: 4 }}
										paint={{ harmonyName: 'base', harmonyShade: 2300 }}
										text="변경"
									/></Button
								>
							{/if}
						</FieldGrid>
					</FieldGrid>

					<ContainerGrid style={{ padding: '0.5rem' }}>
						{#if $companyDetailData.company_logo}
							<BCUnit.Image
								src={$companyDetailData.company_logo}
								defaultSrc="/assets/airdrop/default.png"
								cover
								style={{
									borderRadius: '0.5rem ',
									overflow: 'hidden',
									height: '13rem',
									width: '100%'
								}}
							/>
							<FieldGrid column="1fr 1fr" style={{ paddingTop: '0.5rem' }}>
								<Button on:click={openFileDialog} style={{ borderRadius: '4px 0 0 4px' }}
									><BCTypo.Text
										prop={{ h: 5, bold: true }}
										paint={{ harmonyName: 'base', harmonyShade: 2300 }}
										text="변경"
									/>
									<input
										type="file"
										accept=".jpg, .jpeg, .png"
										on:change={handleFileSelect}
										bind:this={fileInput}
										style="display: none;"
									/></Button
								>
								<Button
									on:click={() => handleDeleteLogo(companyId)}
									style={{ borderRadius: '0 4px 4px 0' }}
								>
									<BCTypo.Text
										prop={{ h: 5, bold: true }}
										paint={{ harmonyName: 'base', harmonyShade: 2300 }}
										text="삭제"
									></BCTypo.Text></Button
								>
							</FieldGrid>
						{:else}
							<ContainerGrid
								full
								style={{
									borderRadius: '0.5rem',
									overflow: 'hidden',
									minHeight: '13rem',
									width: '100%',
									border: '1px solid var(--hq-base-0400)',
									display: 'flex'
								}}
								flexJustifyCenter
							>
								<FieldFlex alignItems="center" center>
									<ContainerGrid>
										<ButtonIcon
											icon={{
												type: IconPropType.PATH,
												src: mdiFileImagePlusOutline,
												scale: 1.2
											}}
											size={ComponentSizeProps.SM}
											ghost
											on:click={openFileDialog}
										/>
										<input
											type="file"
											accept=".jpg, .jpeg, .png"
											on:change={handleFileSelect}
											bind:this={fileInput}
											style="display: none;"
										/>
									</ContainerGrid>
								</FieldFlex>
							</ContainerGrid>
						{/if}
					</ContainerGrid>
				</FieldGrid>
			</CardContentAccentArea>
		{/if}
	</CardContentAccentArea>
</BCLayout.ContentsCenter>

<BCLayout.ContentsCenter transparent rootStyle={{ padding: '1.2rem 3.8rem 0rem 3.8rem' }}>
	<FieldGrid full column="1fr auto" gap={0.5}>
		<ContainerGrid style={{ padding: '0' }}>
			<ContainerGrid flexAlignCenter>
				<BCTypo.Text
					prop={{ h: 4, bold: true }}
					paint={{ harmonyName: 'base', harmonyShade: 2300 }}
					text="직무리스트"
				/>
			</ContainerGrid>
		</ContainerGrid>
		<ContainerGrid onClick={() => (enableModal = true)}>
			<ButtonIcon icon={DefIcons.Common.Add} />
		</ContainerGrid>
		<SectionDivider height={0.1} />
	</FieldGrid>

	<ContainerGrid style={{ paddingBottom: '1rem' }}>
		<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
	</ContainerGrid>

	{#if $companyPositionData.length === 0}
		<ContainerGrid style={{ border: '1px solid var(--hq-base-0400)' }}>
			<BCUnitEmpty prop={{ title: 'No items to display', message: '' }} flexCenter />
		</ContainerGrid>
	{:else}
		<ContainerGrid overflow="scroll" style={{}}>
			<FieldGrid>
				<PositionListItem
					positionDetails={$companyPositionData}
					on:positionDeleted={fetchCompanyDetails}
				/>
			</FieldGrid>
		</ContainerGrid>
	{/if}
</BCLayout.ContentsCenter>

<BaseModal bind:active={enableModal} height="34rem">
	<CardContentAccentArea
		style={{ padding: '1.5rem 1rem' }}
		backgroundPaint={{
			harmonyName: 'base',
			harmonyShade: 200
		}}
	>
		<FieldGrid row="auto 1fr" full gap={0.5}>
			<ContainerGrid style={{ padding: '0.5 0rem' }}>
				<FieldGrid column="1fr auto">
					<ContainerGrid>
						<BCTypo.Text text="직무 생성" prop={{ bold: true, h: 4 }} />
					</ContainerGrid>
					<ContainerGrid>
						<ButtonIcon
							ghost
							icon={{
								type: IconPropType.PATH,
								src: mdiCloseThick,
								scale: 1.2
							}}
							size={ComponentSizeProps.SM}
							style={{ paddingTop: '0.3rem' }}
							borderRadius={ButtonIconBorderRadiusProps.MEDIUM}
							on:click={() => {
								enableModal = false;
							}}
						/>
					</ContainerGrid>
				</FieldGrid>
				<ContainerGrid style={{ padding: '0.5rem 0rem' }}>
					<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
				</ContainerGrid>
			</ContainerGrid>
			<CardContentAccentArea border contentStyle={{ padding: '0 0.6rem' }} height="fit-content">
				<FieldGrid column="1fr 1fr" gap={1}>
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="포지션" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="Enter Position Name"
								width="100%"
								bind:value={positionName}
							/>
						</FieldFlex>
					</ContainerGrid>
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="지원언어" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="Enter Supported Languages"
								width="100%"
								bind:value={supportLanguages}
							/>
						</FieldFlex>
					</ContainerGrid>
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="시험시간" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="Enter Test Time"
								width="100%"
								bind:value={testTime}
							/>
						</FieldFlex>
					</ContainerGrid>
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="문제유형 / 문제 수" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="Enter Problem Info"
								width="100%"
								bind:value={problemInfo}
							/>
						</FieldFlex>
					</ContainerGrid>
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="IDE 허용여부" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="가능 or 불가능"
								width="100%"
								bind:value={permitIDE}
							/>
						</FieldFlex>
					</ContainerGrid>
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="구글링 허용여부" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="가능 or 불가능"
								width="100%"
								bind:value={permitSearch}
							/>
						</FieldFlex>
					</ContainerGrid>

					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="히든케이스 존재여부" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="있음 or 없음"
								width="100%"
								bind:value={hiddenCase}
							/>
						</FieldFlex>
					</ContainerGrid>

					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="시험방식" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="대면 or 비대면"
								width="100%"
								bind:value={examMode}
							/>
						</FieldFlex>
					</ContainerGrid>

					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="시험장소 / 플랫폼" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="Enter Test Place"
								width="100%"
								bind:value={testPlace}
							/>
						</FieldFlex>
					</ContainerGrid>

					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="참고사항" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="Enter Notes"
								width="100%"
								bind:value={note}
							/>
						</FieldFlex>
					</ContainerGrid>
				</FieldGrid>
				<ContainerGrid style={{ paddingTop: '1rem' }}>
					<Button on:click={createPosition}>Create Position</Button>
				</ContainerGrid>
			</CardContentAccentArea>
		</FieldGrid>
	</CardContentAccentArea>
</BaseModal>

<style lang="scss">
	.industry-tag {
		display: inline-block;
		padding: 0.4rem 0.8rem;
		border-radius: 0.25rem;
		background-color: var(--hq-base-0300);
		color: var(--hq-base-2300);
		cursor: pointer;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.industry-tag:hover {
		background-color: var(--hq-base-0400);
	}

	.industry-tag.selected {
		background-color: var(--hq-base-2300);
		color: var(--hq-light-0000);
	}
</style>
