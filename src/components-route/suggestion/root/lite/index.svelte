<script lang="ts">
	import { FieldGrid } from '@src/components/field';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo } from '@src/components/typo';
	import { SectionDivider } from '@src/components/section';
	import { BCLayout } from '@src/components/layout';
    import { default as SuggestionListItem } from './item.svelte';

	$: asyncSuggestionList = exec(async () => {
		return await API.Suggestion.getAllSuggestion();
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
                text="정보 수정 요청 목록"
            />
        </ContainerGrid>
    </ContainerGrid>
</FieldGrid>

<ContainerGrid style={{ paddingBottom: '1rem' }}>
    <SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
</ContainerGrid>

{#await asyncSuggestionList}
    <div>Loading...</div>
{:then suggestionList}
    <ContainerGrid overflow="scroll" style={{}}>
        <FieldGrid>
            <SuggestionListItem suggestions={suggestionList} />
        </FieldGrid>
    </ContainerGrid>
{/await}


</BCLayout.ContentsCenter>