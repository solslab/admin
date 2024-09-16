<script lang="ts">
	import { Modal } from '@src/components-global/modal';
	import { API } from '@src/lib/api';
	interface Suggestion {
		suggestion_id: string;
		company_name: string;
		member_name: string;
		status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
		created_date: string;
	}

	export let suggestions: Suggestion[] = [];

	const statusOptions = [
		{ id: 'NOT_STARTED', text: '처리 전' },
		{ id: 'IN_PROGRESS', text: '처리 중' },
		{ id: 'COMPLETED', text: '완료' },
		{ id: 'REJECTED', text: '거절됨' }
	];

	async function handleStatusChange(
		suggestion: Suggestion,
		newStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'
	) {
		try {
			// newStatus에 해당하는 text를 찾음
			const statusText = statusOptions.find((option) => option.id === newStatus)?.text;

			// 상태 변경 확인 알림 창
			const userConfirmed = window.confirm(`상태를 "${statusText}"(으)로 변경하시겠습니까?`);

			if (!userConfirmed) {
				return; // 사용자가 취소하면 아무것도 하지 않음
			}

			// 상태를 로컬에서 먼저 업데이트
			suggestion.status = newStatus;

			// 서버에 상태 업데이트 요청을 보냄
			await API.Suggestion.updateSuggestionStatus({
				suggestionId: suggestion.suggestion_id,
				status: newStatus
			});

			// 성공적으로 업데이트된 후 알림 창 표시
			window.alert('상태가 성공적으로 업데이트되었습니다.');
		} catch (error) {
			// 실패 시 오류 알림 창 표시
			window.alert('상태 업데이트에 실패했습니다. 다시 시도해주세요.');
			console.error('상태 업데이트 실패:', error);
		}
	}

	function onStatusChange(event: Event, suggestion: Suggestion) {
		const selectElement = event.target as HTMLSelectElement;
		const newStatus = selectElement.value as
			| 'NOT_STARTED'
			| 'IN_PROGRESS'
			| 'COMPLETED'
			| 'REJECTED';
		handleStatusChange(suggestion, newStatus);
	}
</script>

<table>
	<thead>
		<tr>
			<th>회사명</th>
			<th>이름</th>
			<th>생성일</th>
			<th>상태</th>
		</tr>
	</thead>
	<tbody>
		{#each suggestions as suggestion}
			<tr on:click={() => Modal.SuggestionDetailModal.set({ data: suggestion }).open()}>
				<td>{suggestion.company_name}</td>
				<td>{suggestion.member_name}</td>
				<td>{suggestion.created_date}</td>
				<td>
					<div on:click|stopPropagation on:keydown>
						<select bind:value={suggestion.status} on:change={(e) => onStatusChange(e, suggestion)}>
							{#each statusOptions as option}
								<option value={option.id}>{option.text}</option>
							{/each}
						</select>
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

	select {
		width: 100%;
		padding: 4px;
		border: 1px solid var(--hq-base-0400);
		background-color: var(--hq-base-0300);
		color: var(--hq-base-2300);
		font-size: 0.9rem;
		border-radius: 4px;
		cursor: pointer;

		&:focus {
			outline: none;
			background-color: var(--hq-base-0400);
			border-color: var(--hq-base-0500);
		}
	}
</style>
