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
	import { default as SuggestionListItem } from './item.svelte';

	let suggestionLength = 0;

	$: asyncSuggestionList = exec(async () => {
		const suggestions = await API.Suggestion.getAllSuggestion();
		suggestionLength = suggestions.length;
		return suggestions;
	});
</script>

<BCLayout.ContentsCenter
	transparent
	contentStyle={{ overflow: 'hidden' }}
	rootStyle={{ paddingTop: '1rem', backgroundColor: 'transparent' }}
>
	<FieldGrid full row={'auto auto 1fr'} gap={0.5}>
		<ContainerGrid style={{ padding: '0' }}>
			<FieldFlex alignItems="center" gap={0.3}>
				<BCTypo.Text
					prop={{ h: 4, bold: true }}
					paint={{ harmonyName: 'base', harmonyShade: 2300 }}
					text="정보 수정 요청 목록"
				/>
				<BCTypo.Text
					prop={{ h: 4, mid: true }}
					paint={{ harmonyName: 'base', harmonyShade: 1600 }}
					text={`(${suggestionLength})`}
				/>
			</FieldFlex>
		</ContainerGrid>
	</FieldGrid>

	<ContainerGrid style={{ paddingBottom: '1rem' }}>
		<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
	</ContainerGrid>

	{#await asyncSuggestionList}
		<ContainerGrid full flexAlignCenter flexCenter minHeight="50vh">
			<IconPending size={ComponentSizeProps.XL} />
		</ContainerGrid>
	{:then suggestionList}
		<ContainerGrid overflow="scroll" style={{}}>
			<SuggestionListItem suggestions={suggestionList} />
		</ContainerGrid>
	{/await}
</BCLayout.ContentsCenter>
