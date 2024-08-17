<script lang="ts">
	import { __Model } from '@src/lib/api/company/model';
	import { Modal } from '@src/components-global/modal';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { CardContentAccentArea } from '@src/components/content';
	import { SectionDivider } from '@src/components/section';
	import { mdiFileImagePlusOutline, mdiCogOutline } from '@mdi/js';
	import { Screen, screen } from '@src/store/env';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo, TypoTextWithIcon } from '@src/components/typo';
	import { onMount } from 'svelte';
	import { ValueRow } from '@src/components/value-row';
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { IconPropType } from '@src/util/icon';
	import { Input } from '@src/components/input';
	import { Button } from '@src/components/button';
	import { ComponentSizeProps } from '@src/util/component';
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon';
	import { BCUnit } from '@src/components/unit/index';
	import { BCLayout } from '@src/components/layout';

	export let companyId: string;

	let isEditing = false;
	let editedCompanyName = '';
	let selectedIndustryTypes: Set<__Model.IndustryType> = new Set();

	const industryOptions: __Model.IndustryType[] = [
		'IT 서비스',
		'금융',
		'솔루션',
		'게임',
		'SI',
		'SM',
		'빅테크',
		'스타트업',
		'대기업',
		'중견기업',
		'중소기업',
		'공기업'
	];

	$: asyncCompanyDetailData = exec(async () => {
		return await API.Company.getCompanyDetails({ companyId: companyId });
	});

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
				asyncCompanyDetailData = await API.Company.getCompanyDetails({
					companyId: companyId
				});
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

				// Re-fetch company details after deletion
				asyncCompanyDetailData = await API.Company.getCompanyDetails({ companyId });
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
</script>

<BCLayout.ContentsCenter
	transparent
	rootStyle={{ paddingTop: '0.6rem !important', paddingBottom: '0rem !important' }}
>
	<CardContentAccentArea disableArea height="100%" style={{ padding: '0 0.8rem' }}>
		{#await asyncCompanyDetailData}
			<div>Loading...</div>
		{:then companyDetailData}
			<ContainerGrid style={{ paddingBottom: '0.5rem' }}>
				<FieldFlex alignItems="center" justifyContent="flex-end">
					<ButtonIcon
						icon={{
							type: IconPropType.PATH,
							src: mdiCogOutline,
							scale: 1.2
						}}
						size={ComponentSizeProps.SM}
						ghost
						on:click={() => {
							if (!isEditing) {
								if (companyDetailData?.industry_type) {
									companyDetailData.industry_type.forEach((type) => {
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
										placeholder={companyDetailData.company_name || '-'}
									/>
								{:else}
									<BCTypo.Text
										prop={{ h: 5, bold: true }}
										paint={{ harmonyName: 'base', harmonyShade: 2300 }}
										text={companyDetailData.company_name || '-'}
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
										{#each industryOptions as type}
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
										text={companyDetailData.industry_type.join(', ') || '-'}
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
										text={companyDetailData.positions.map((pos) => pos.position_name).join(', ') ||
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
										asyncCompanyDetailData = await API.Company.getCompanyDetails({
											companyId: companyId
										});
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
						{#if companyDetailData.company_logo}
							<BCUnit.Image
								src={companyDetailData.company_logo}
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
		{/await}
	</CardContentAccentArea>
</BCLayout.ContentsCenter>

<BCLayout.ContentsCenter transparent rootStyle={{ paddingTop: '0.6rem' }}></BCLayout.ContentsCenter>

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
