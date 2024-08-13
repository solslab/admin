<script lang="ts">
	import { API } from '@src/lib/api';
	import { FieldGrid } from '@src/components/field';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo } from '@src/components/typo';
	import { BCLayout } from '@src/components/layout';
	import { SectionDivider } from '@src/components/section';
	import { exec } from '@src/util/util.function';
	import ComapanyListItem from './item.svelte';

	$: asyncCompanyList = exec(async () => {
		return await API.Company.getAllCompanies();
	});
</script>

<BCLayout.ContentsCenter
	transparent
	contentStyle={{ overflow: 'hidden' }}
	rootStyle={{ paddingTop: '1rem', backgroundColor: 'transparent' }}
>
	<FieldGrid full row={'auto auto 1fr'} gap={0.5}>
		<ContainerGrid style={{ padding: '0' }}>
			<ContainerGrid flexAlignCenter>
				<BCTypo.Text
					prop={{ h: 4, bold: true }}
					paint={{ harmonyName: 'base', harmonyShade: 2300 }}
					text="Company List"
				/>
			</ContainerGrid>
		</ContainerGrid>
	</FieldGrid>

	<ContainerGrid style={{ paddingBottom: '1rem' }}>
		<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
	</ContainerGrid>

	{#await asyncCompanyList}
		<div>Loading...</div>
	{:then CompanyList}
		<ContainerGrid overflow="scroll">
			<FieldGrid gap={0.5}>
				{#each CompanyList as company}
					<ComapanyListItem {company} />
				{/each}
			</FieldGrid>
		</ContainerGrid>
	{/await}
</BCLayout.ContentsCenter>
