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
	import { Button } from '@src/components/button';
	import { ComponentSizeProps } from '@src/util/component';
	import { DefIcons } from '@src/icons/defines';
	import { ButtonIcon } from '@src/components/buttonicon';
	import { BCUnit } from '@src/components/unit/index';
	import { BCLayout } from '@src/components/layout';
	import { onMountBrowser } from '@src/util/svelte';
	import { default as PositionListItem } from './item.svelte';
	import { companyDetailData, companyPositionData } from '@src/util/company/index';
	import { CreatePositionModal, EditCompanyModal } from './modal';
	import { Companies } from '@src/util/company';
	import { IconPending } from '@src/components/icon-pending';

	export let companyId: string;

	let editedCompanyName = '';
	let editedSearchTerms = '';
	let selectedIndustryTypes: Set<__Model.IndustryType> = new Set();

	let positionName = '';
	let isOfficial = false;
	let supportLanguages = '';
	let testTime = '';
	let problemInfo = '';
	let permitIDE = '';
	let permitSearch = '';
	let hiddenCase = '';
	let examMode = '';
	let testPlace = '';
	let note = '';

	$: enableEditModal = false;
	$: enablePositionModal = false;
	$: companyPending = true;
	$: positionPending = true;

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
			is_official: isOfficial,
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
			alert('Test Information created successfully');
			await fetchCompanyDetails();
			clearForm();
			enablePositionModal = false;
		} catch (error) {
			alert('Failed to create Test Information');
		}
	}

	function clearForm() {
		positionName = '';
		isOfficial = false;
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
		companyPending = true;
		const details = await API.Company.getCompanyDetails({ companyId });
		companyDetailData.set(details);
		companyPending = false;

		if (details && details.positions) {
			positionPending = true;
			const positionDetails = await Promise.all(
				details.positions.map(async (position: any) => {
					const details = await API.Position.getPositionDetails({
						positionId: position.position_id
					});
					return details;
				})
			);
			companyPositionData.set(positionDetails);
			positionPending = false;
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

	async function updateCompany() {
		const industryList = Array.from(selectedIndustryTypes);
		const supportSearchTerms = editedSearchTerms.split(',').map((term) => term.trim());

		await API.Company.updateCompany({
			companyId: companyId,
			company_name: editedCompanyName,
			search_terms: supportSearchTerms,
			industry_type: industryList
		});
		const updatedData = await API.Company.getCompanyDetails({ companyId });
		companyDetailData.set(updatedData);
		editedCompanyName = '';
		alert('회사 정보가 업데이트 되었습니다.');
		enableEditModal = false;
	}

	function openEditModal() {
		editedCompanyName = $companyDetailData.company_name;
		editedSearchTerms = $companyDetailData.search_terms.join(', ');
		selectedIndustryTypes.clear();

		if ($companyDetailData?.industry_type) {
			$companyDetailData.industry_type.forEach((type: __Model.IndustryType) => {
				toggleIndustryType(type);
			});
		}

		enableEditModal = true;
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
						on:click={openEditModal}
					/>
				</FieldFlex>
			</ContainerGrid>

			<CardContentAccentArea border contentStyle={{ paddingLeft: '0.5rem' }} height="fit-content">
				{#if companyPending}
					<ContainerGrid full flexAlignCenter flexCenter minHeight="20vh">
						<IconPending size={ComponentSizeProps.XL} />
					</ContainerGrid>
				{:else}
					<FieldGrid column={'1fr 15rem'} row="auto 1fr">
						<FieldGrid full row="auto 1fr">
							<FieldGrid gap={0.3}>
								<ValueRow
									{headerWidth}
									titleSans
									name="회사 이름"
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
										text={$companyDetailData.company_name || '-'}
									/>
								</ValueRow>
								<ValueRow
									{headerWidth}
									titleSans
									name="업종"
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
										text={$companyDetailData.industry_type.join(', ') || '-'}
									/>
								</ValueRow>

								<ValueRow
									{headerWidth}
									titleSans
									name="검색어"
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
										text={$companyDetailData.search_terms.join(', ') || '-'}
									/>
								</ValueRow>
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
				{/if}
			</CardContentAccentArea>
		{/if}
	</CardContentAccentArea>
</BCLayout.ContentsCenter>

<BCLayout.ContentsCenter transparent rootStyle={{ padding: '1.2rem 2.8rem 0rem 2.8rem' }}>
	<FieldGrid full column="1fr auto" gap={0.5}>
		<ContainerGrid style={{ padding: '0' }}>
			<ContainerGrid flexAlignCenter>
				<BCTypo.Text
					prop={{ h: 4, bold: true }}
					paint={{ harmonyName: 'base', harmonyShade: 2300 }}
					text="코딩테스트 정보"
				/>
			</ContainerGrid>
		</ContainerGrid>
		<ContainerGrid onClick={() => (enablePositionModal = true)}>
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
			<FieldGrid column="1fr" gap={0.5}>
				{#each $companyPositionData as $companyPositionData}
					<PositionListItem
						positionDetails={$companyPositionData}
						on:positionDeleted={fetchCompanyDetails}
					/>
				{/each}
			</FieldGrid>
		</ContainerGrid>
	{/if}
</BCLayout.ContentsCenter>

<CreatePositionModal
	bind:active={enablePositionModal}
	bind:positionName
	bind:isOfficial
	bind:supportLanguages
	bind:testTime
	bind:problemInfo
	bind:permitIDE
	bind:permitSearch
	bind:hiddenCase
	bind:examMode
	bind:testPlace
	bind:note
	{createPosition}
/>

<EditCompanyModal
	bind:active={enableEditModal}
	bind:companyName={editedCompanyName}
	bind:searchTerms={editedSearchTerms}
	industryTypes={selectedIndustryTypes}
	{toggleIndustryType}
	{updateCompany}
/>
