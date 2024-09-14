<script lang="ts">
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo } from '@src/components/typo';
	import { SectionDivider } from '@src/components/section';
	import { BCLayout } from '@src/components/layout';
	import { mdiRefresh } from '@mdi/js';
	import { default as MemberListItem } from './item.svelte';
	import { IconPending } from '@src/components/icon-pending';
	import { ComponentSizeProps } from '@src/util/component';
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon/index';
	import { IconPropType } from '@src/components/icon';
	import { BCUnitEmpty } from '@src/components/empty-box';

	let searchWord = '';
	let memberList: any = [];

	$: asyncMemberList = exec(async () => {
		const members = await API.Member.getAllMembers();
		memberList = members;
		return members;
	});

	// $: filteredMemberList = memberList.filter((member: any) => {
	// 	return member.name.toLowerCase().includes(searchWord);
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
					text="회원 목록"
				/>
				<BCTypo.Text
					prop={{ h: 2, mid: true }}
					paint={{ harmonyName: 'base', harmonyShade: 1600 }}
					text={`(${memberList.length})`}
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
					asyncMemberList = exec(async () => {
						const members = await API.Member.getAllMembers();
						memberList = members;
						return members;
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

	{#await asyncMemberList}
		<ContainerGrid full flexAlignCenter flexCenter minHeight="50vh">
			<IconPending size={ComponentSizeProps.XL} />
		</ContainerGrid>
	{:then memberList}
		{#if memberList.length === 0}
			<ContainerGrid style={{ border: '1px solid var(--hq-base-0400)' }}>
				<BCUnitEmpty prop={{ title: 'No items to display', message: '' }} flexCenter />
			</ContainerGrid>
		{:else}
			<ContainerGrid overflow="scroll">
				<FieldGrid>
					<MemberListItem members={memberList} />
				</FieldGrid>
			</ContainerGrid>
		{/if}
	{/await}
</BCLayout.ContentsCenter>
