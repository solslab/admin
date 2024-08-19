<script lang="ts">
	import { Modal } from '@src/components-global/modal';
	import { ButtonIcon } from '@src/components/buttonicon';
	import { IconPropType } from '@src/util/icon';
	import { mdiDelete } from '@mdi/js';
	import { ComponentSizeProps } from '@src/util/component';
	import { API } from '@src/lib/api';
	import { createEventDispatcher } from 'svelte';

	export let positionDetails: Array<{
		exam_mode: string | null;
		hidden_case: string | null;
		note: string | null;
		permit_ide: string | null;
		permit_search: string | null;
		position_name: string;
		position_id: string;
		problem_info: string | null;
		support_languages: string[];
		test_place: string | null;
		test_time: string | null;
	}> = [];

	const dispatch = createEventDispatcher();

	async function deletePosition(positionId: string) {
		if (confirm('삭제하시겠습니까?')) {
			await API.Position.deletePosition({ positionId: positionId });
			alert('삭제되었습니다.');
			dispatch('positionDeleted'); // Dispatch an event to notify the parent
		}
	}
</script>

<table>
	<thead>
		<tr>
			<th>포지션</th>
			<th>시험 방식</th>
			<th>히든케이스</th>
			<th>IDE 사용</th>
			<th>구글링</th>
			<th>문제 수</th>
			<th>지원언어</th>
			<th>응시지역/장소</th>
			<th>시험 시간</th>
			<th>삭제</th>
		</tr>
	</thead>
	<tbody>
		{#each positionDetails as position}
			<tr on:click={() => Modal.PositionListDetailModal.set({ data: position }).open()}>
				<td>{position.position_name || '-'}</td>
				<td>{position.exam_mode || '-'}</td>
				<td>{position.hidden_case || '-'}</td>
				<td>{position.permit_ide || '-'}</td>
				<td>{position.permit_search || '-'}</td>
				<td>{position.problem_info || '-'}</td>
				<td>
					{#if position.support_languages && position.support_languages.length > 0}
						{position.support_languages.join(', ')}
					{:else}
						-
					{/if}
				</td>
				<td>{position.test_place || '-'}</td>
				<td>{position.test_time || '-'}</td>
				<td>
					<div on:click|stopPropagation on:keydown>
						<ButtonIcon
							icon={{
								type: IconPropType.PATH,
								src: mdiDelete,
								scale: 1
							}}
							size={ComponentSizeProps.SM}
							ghost
							on:click={async () => await deletePosition(position.position_id)}
						/>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		border: 1px solid var(--hq-base-0400);
		color: var(--hq-base-2300);
		padding: 8px;
		text-align: left;
	}

	th {
		background-color: var(--hq-base-1200);
	}

	tr:hover {
		background-color: var(--hq-base-0500);
	}

	button {
		background-color: var(--hq-danger-500);
		color: white;
		border: none;
		padding: 4px 8px;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--hq-danger-600);
	}
</style>
