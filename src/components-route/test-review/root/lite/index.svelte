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
	import { default as ReviewListItem } from './item.svelte';

	let searchWord = '';
	let reviewList: any = [];

	$: asyncTestReviewList = exec(async () => {
		const testReviews = await API.Review.getTestReviews();
		reviewList = testReviews;
		return testReviews;
	});

	$: filteredReviewList = reviewList.filter((review: any) => {
		return review.company_name.toLowerCase().includes(searchWord);
	});
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
					text="리뷰 목록"
				/>
				<BCTypo.Text
					prop={{ h: 2, mid: true }}
					paint={{ harmonyName: 'base', harmonyShade: 1600 }}
					text={`(${filteredReviewList.length})`}
				/>
			</FieldFlex>
		</ContainerGrid>
		<ContainerGrid>
			<Search on:onChange={(evt) => (searchWord = evt.detail)} style={{ width: '20rem' }} />
		</ContainerGrid>
	</FieldFlex>

	<ContainerGrid style={{ paddingBottom: '1rem', paddingTop: '0.5rem' }}>
		<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
	</ContainerGrid>

	{#await asyncTestReviewList}
		<ContainerGrid full flexAlignCenter flexCenter minHeight="50vh">
			<IconPending size={ComponentSizeProps.XL} />
		</ContainerGrid>
	{:then reviewList}
		<ContainerGrid overflow="scroll" style={{}}>
			<FieldGrid>
				<ReviewListItem reviews={filteredReviewList} />
			</FieldGrid>
		</ContainerGrid>
	{/await}
</BCLayout.ContentsCenter>
