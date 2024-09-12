<script lang="ts">
	import { API } from '@src/lib/api';
	import { __Model } from '@src/lib/api/company/model';
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo } from '@src/components/typo';
	import { mdiCloseThick } from '@mdi/js';
	import { Input } from '@src/components/input';
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon';
	import { Button } from '@src/components/button';
	import { BaseModal } from '@src/components/basemodal';
	import { IconPropType } from '@src/components/icon';
	import { CardContentAccentArea } from '@src/components/content';
	import { BCLayout } from '@src/components/layout';
	import { Search } from '@src/components/search';
	import { SectionDivider } from '@src/components/section';
	import { exec } from '@src/util/util.function';
	import { DefIcons } from '@src/icons/defines';
	import ComapanyListItem from './item.svelte';
	import { ComponentSizeProps } from '@src/util/component';
	import { Companies } from '@src/util/company';
	import { IconPending } from '@src/components/icon-pending';

	let companyName = '';
	let companyList: any = [];
	let searchWord = '';
	let selectedIndustryTypes: Set<__Model.IndustryType> = new Set();

	$: asyncCompanyList = exec(async () => {
		const companies = await API.Company.getAllCompanies();
		companyList = companies;
		return companies;
	});

	$: enableModal = false;

	function toggleIndustryType(type: __Model.IndustryType) {
		if (selectedIndustryTypes.has(type)) {
			selectedIndustryTypes.delete(type);
		} else {
			selectedIndustryTypes.add(type);
		}
		selectedIndustryTypes = new Set(selectedIndustryTypes);
	}

	async function handleSubmit() {
		if (!companyName || selectedIndustryTypes.size === 0) {
			alert('Please fill in all required fields.');
			return;
		}

		const industryList = Array.from(selectedIndustryTypes);

		try {
			await API.Company.createCompany({
				company_name: companyName,
				industry_type: industryList
			});
			alert('Company created successfully.');
			enableModal = false;
			companyName = '';
			selectedIndustryTypes.clear();
			companyList = await API.Company.getAllCompanies();
		} catch (error) {
			console.error('Error creating company:', error);
			alert('Failed to create company.');
		}
	}

	// 검색어가 변경될 때마다 호출되는 함수
	async function handleSearchChange(evt: any) {
		searchWord = evt.detail;

		if (searchWord.trim() !== '') {
			try {
				const result = await API.Company.searchCompanies({ query: searchWord });
				companyList = result; // 검색 결과를 companies에 저장
			} catch (error) {
				console.error('Error fetching companies:', error);
			}
		} else {
			// 검색어가 없으면 전체 리스트를 다시 불러옴
			asyncCompanyList = API.Company.getAllCompanies();
			companyList = await asyncCompanyList;
		}
	}
</script>

<BCLayout.ContentsCenter
	transparent
	contentStyle={{}}
	rootStyle={{ paddingTop: '1rem', backgroundColor: 'transparent' }}
>
	<FieldGrid full column="1fr auto" gap={0.5}>
		<ContainerGrid style={{ padding: '0' }}>
			<FieldFlex alignItems="center" gap={0.3}>
				<BCTypo.Text
					prop={{ h: 2, bold: true }}
					paint={{ harmonyName: 'base', harmonyShade: 2300 }}
					text="기업 목록"
				/>
				<BCTypo.Text
					prop={{ h: 2, mid: true }}
					paint={{ harmonyName: 'base', harmonyShade: 1600 }}
					text={`(${companyList.length})`}
				/>
			</FieldFlex>
		</ContainerGrid>
		<FieldFlex alignItems="center" gap={0.3}>
			<Search on:onChange={handleSearchChange} style={{ width: '20rem' }} />
			<ContainerGrid onClick={() => (enableModal = true)}>
				<ButtonIcon icon={DefIcons.Common.Add} />
			</ContainerGrid>
		</FieldFlex>
	</FieldGrid>

	<ContainerGrid style={{ paddingBottom: '1rem', paddingTop: '0.5rem' }}>
		<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
	</ContainerGrid>

	{#await asyncCompanyList}
		<ContainerGrid full flexAlignCenter flexCenter minHeight="50vh">
			<IconPending size={ComponentSizeProps.XL} />
		</ContainerGrid>
	{:then CompanyList}
		<ContainerGrid overflow="scroll">
			<FieldGrid column="1fr 1fr" gap={0.5}>
				{#each companyList as company}
					<ContainerGrid>
						<ComapanyListItem
							{company}
							on:companyDeleted={async () => {
								asyncCompanyList = await API.Company.getAllCompanies();
							}}
						/>
					</ContainerGrid>
				{/each}
			</FieldGrid>
		</ContainerGrid>
	{:catch error}
		<ContainerGrid>
			<BCTypo.Text text="Error loading company list." />
		</ContainerGrid>
	{/await}
</BCLayout.ContentsCenter>

<BaseModal bind:active={enableModal}>
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
						<BCTypo.Text text="Create Company" prop={{ bold: true, h: 4 }} />
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
				<FieldGrid column="1fr" gap={1}>
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="Company Name" prop={{ bold: true }} />
							<Input
								type="text"
								bind:value={companyName}
								size={ComponentSizeProps.MD}
								placeholder="Enter Company Name"
								width="100%"
							/>
						</FieldFlex>
					</ContainerGrid>
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="Industry Type" prop={{ bold: true }} />
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
						</FieldFlex>
					</ContainerGrid>
					<ContainerGrid>
						<Button
							on:click={handleSubmit}
							size={ComponentSizeProps.LG}
							style={{ borderRadius: '0.25rem' }}
						>
							<BCTypo.Text text="Create Company" prop={{ bold: true }} />
						</Button>
					</ContainerGrid>
				</FieldGrid>
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
