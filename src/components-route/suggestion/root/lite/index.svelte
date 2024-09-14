<script lang="ts">
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo } from '@src/components/typo';
	import { SectionDivider } from '@src/components/section';
	import { BCLayout } from '@src/components/layout';
	import { IconPending } from '@src/components/icon-pending';
	import { ComponentSizeProps } from '@src/util/component';
	import { Search } from '@src/components/search';
	import { mdiRefresh } from '@mdi/js';
	import { IconPropType } from '@src/components/icon';
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon/index';
	import { default as SuggestionListItem } from './item.svelte';
	import { BCUnitEmpty } from '@src/components/empty-box';

	let suggestionList: any = [];
	let searchWord = '';

	$: asyncSuggestionList = exec(async () => {
		const suggestions = await API.Suggestion.getAllSuggestion();
		suggestionList = suggestions;
		return suggestions;
	});

	// $: filteredSuggestionList = suggestionList.filter((suggestion: any) => {
	// 	return suggestion.company_name.toLowerCase().includes(searchWord);
	// });
</script>

<BCLayout.ContentsCenter
	transparent
	contentStyle={{ overflow: 'hidden' }}
	rootStyle={{ paddingTop: '1rem', backgroundColor: 'transparent' }}
>
	<FieldFlex alignItems="center" justifyContent="space-between" gap={0.5}>
		<ContainerGrid style={{ padding: '0' }}>
			<FieldFlex alignItems="center" gap={0.3}>
				<BCTypo.Text
					prop={{ h: 2, bold: true }}
					paint={{ harmonyName: 'base', harmonyShade: 2300 }}
					text="정보 수정 요청 목록"
				/>
				<BCTypo.Text
					prop={{ h: 2, mid: true }}
					paint={{ harmonyName: 'base', harmonyShade: 1600 }}
					text={`(${suggestionList.length})`}
				/>
			</FieldFlex>
		</ContainerGrid>

		<ContainerGrid>
			<ButtonIcon
				style={{ marginRight: '0.3rem' }}
				size={ComponentSizeProps.MD}
				icon={{
					type: IconPropType.PATH,
					src: mdiRefresh
				}}
				borderRadius={ButtonIconBorderRadiusProps.MEDIUM}
				on:click={() => {
					asyncSuggestionList = exec(async () => {
						const suggestions = await API.Suggestion.getAllSuggestion();
						suggestionList = suggestions;
						return suggestions;
					});
				}}
			/>
		</ContainerGrid>
		<!-- <ContainerGrid>
			<Search on:onChange={(evt) => (searchWord = evt.detail)} style={{ width: '20rem' }} />
		</ContainerGrid> -->
	</FieldFlex>

	<ContainerGrid style={{ paddingBottom: '1rem', paddingTop: '0.5rem' }}>
		<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
	</ContainerGrid>

	{#await asyncSuggestionList}
		<ContainerGrid full flexAlignCenter flexCenter minHeight="50vh">
			<IconPending size={ComponentSizeProps.XL} />
		</ContainerGrid>
	{:then suggestionList}
		{#if suggestionList.length === 0}
			<ContainerGrid style={{ border: '1px solid var(--hq-base-0400)' }}>
				<BCUnitEmpty prop={{ title: 'No items to display', message: '' }} flexCenter />
			</ContainerGrid>
		{:else}
			<ContainerGrid overflow="scroll" style={{}}>
				<SuggestionListItem suggestions={suggestionList} />
			</ContainerGrid>
		{/if}
	{/await}
</BCLayout.ContentsCenter>
