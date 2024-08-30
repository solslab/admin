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
	import { default as ReviewListItem } from './item.svelte';

	let reviewLength = 0;

	$: asyncTestReviewList = exec(async () => {
		const testReviews = await API.Review.getTestReviews();
		reviewLength = testReviews.length;
		return testReviews;
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
					text="리뷰 목록"
				/>
				<BCTypo.Text
					prop={{ h: 4, mid: true }}
					paint={{ harmonyName: 'base', harmonyShade: 1600 }}
					text={`(${reviewLength})`}
				/>
			</FieldFlex>
		</ContainerGrid>
	</FieldGrid>

	<ContainerGrid style={{ paddingBottom: '1rem' }}>
		<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
	</ContainerGrid>

	{#await asyncTestReviewList}
		<ContainerGrid full flexAlignCenter flexCenter minHeight="50vh">
			<IconPending size={ComponentSizeProps.XL} />
		</ContainerGrid>
	{:then reviewList}
		<ContainerGrid overflow="scroll" style={{}}>
			<FieldGrid>
				<ReviewListItem reviews={reviewList} />
			</FieldGrid>
		</ContainerGrid>
	{/await}
</BCLayout.ContentsCenter>
