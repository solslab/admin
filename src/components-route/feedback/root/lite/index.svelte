<script lang="ts">
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo } from '@src/components/typo';
	import { SectionDivider } from '@src/components/section';
	import { BCLayout } from '@src/components/layout';
	import { mdiRefresh } from '@mdi/js';
	import { default as FeedbackListItem } from './item.svelte';
	import { IconPending } from '@src/components/icon-pending';
	import { ComponentSizeProps } from '@src/util/component';
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon/index';
	import { IconPropType } from '@src/components/icon';

	let feedbackLength = 0;
	let averageRating = '0';

	$: asyncFeedbackList = exec(async () => {
		const feedbacks = await API.Feedback.getAllFeedbacks();
		feedbackLength = feedbacks.feedback_list.length;

		if (feedbackLength > 0) {
			const totalRating = feedbacks.feedback_list.reduce(
				(sum: any, feedback: any) => sum + feedback.rating,
				0
			);
			averageRating = (totalRating / feedbackLength).toFixed(1);
		}

		return feedbacks;
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
					text="피드백 목록"
				/>
				<BCTypo.Text
					prop={{ h: 2, mid: true }}
					paint={{ harmonyName: 'base', harmonyShade: 1600 }}
					text={`(${feedbackLength})`}
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
					asyncFeedbackList = exec(async () => {
						const feedbacks = await API.Feedback.getAllFeedbacks();
						feedbackLength = feedbacks.feedback_list.length;

						if (feedbackLength > 0) {
							const totalRating = feedbacks.feedback_list.reduce(
								(sum, feedback) => sum + feedback.rating,
								0
							);
							averageRating = (totalRating / feedbackLength).toFixed(1);
						}

						return feedbacks;
					});
				}}
			/>
		</ContainerGrid>
	</FieldFlex>

	<ContainerGrid style={{ paddingBottom: '1rem' }}>
		<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
	</ContainerGrid>

	{#await asyncFeedbackList}
		<ContainerGrid full flexAlignCenter flexCenter minHeight="50vh">
			<IconPending size={ComponentSizeProps.XL} />
		</ContainerGrid>
	{:then feedbackList}
		<ContainerGrid>
			<FieldFlex alignItems="center" gap={0.3}>
				<BCTypo.Text
					prop={{ h: 2, bold: true }}
					paint={{ harmonyName: 'base', harmonyShade: 2300 }}
					text="평균 별점 :"
				/>
				<BCTypo.Text
					prop={{ h: 2, mid: true }}
					paint={{ harmonyName: 'base', harmonyShade: 1600 }}
					text={`${averageRating}`}
				/>
			</FieldFlex>
		</ContainerGrid>
		<ContainerGrid overflow="scroll">
			<FieldGrid>
				<FeedbackListItem feedbacks={feedbackList.feedback_list} />
			</FieldGrid>
		</ContainerGrid>
	{/await}
</BCLayout.ContentsCenter>
