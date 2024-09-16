<script lang="ts">
	import { Modal } from '@src/components-global/modal';
	import { ButtonIcon } from '@src/components/buttonicon';
	import { IconPropType } from '@src/util/icon';
	import { ClickableListItem } from '@src/components/clickable-list-item';
	import { mdiDelete } from '@mdi/js';
	import { BCTypo } from '@src/components/typo';
	import { FieldGrid } from '@src/components/field';
	import { ComponentSizeProps } from '@src/util/component';
	import { API } from '@src/lib/api';
	import { SectionDivider } from '@src/components/section';
	import { ContainerGrid } from '@src/components/container';
	import { createEventDispatcher } from 'svelte';

	export let positionDetails: {
		exam_mode: string;
		hidden_case: string;
		note: string;
		permit_ide: string;
		permit_search: string;
		position_name: string;
		position_id: string;
		problem_info: string;
		support_languages: string[];
		test_place: string;
		test_time: string;
	};

	const dispatch = createEventDispatcher();

	async function deletePosition(positionId: string) {
		if (confirm('삭제하시겠습니까?')) {
			await API.Position.deletePosition({ positionId: positionId });
			alert('삭제되었습니다.');
			dispatch('positionDeleted'); // Dispatch an event to notify the parent
		}
	}
</script>

<ClickableListItem
	padding="0.5rem"
	dark
	style={{
		border: 'solid 1px var(--hq-base-0400)',
		borderRadius: '0.3rem'
	}}
	on:click={() => Modal.PositionListDetailModal.set({ data: positionDetails }).open()}
>
	<FieldGrid style={{ padding: '0 0 0 0.5rem' }}>
		<ContainerGrid>
			<FieldGrid column="1fr auto" gap={0.2}>
				<ContainerGrid flexAlignCenter>
					<BCTypo.Text
						prop={{ h: 4 }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text={positionDetails.position_name || '-'}
					/>
				</ContainerGrid>
				<div on:click|stopPropagation on:keydown>
					<ContainerGrid flexAlignCenter>
						<ButtonIcon
							icon={{
								type: IconPropType.PATH,
								src: mdiDelete,
								scale: 1
							}}
							size={ComponentSizeProps.MD}
							ghost
							on:click={async () => await deletePosition(positionDetails.position_id)}
						/>
					</ContainerGrid>
				</div>
			</FieldGrid>
			<ContainerGrid style={{ padding: '0 0.5rem' }}>
				<SectionDivider height={0.5} />
			</ContainerGrid>
		</ContainerGrid>
	</FieldGrid>
</ClickableListItem>
