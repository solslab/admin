<script lang="ts">
	interface Suggestion {
		suggestion_id: string;
		company_name: string;
		member_name: string;
		status: string;
		created_date: string;
	}

	export let suggestions: Suggestion[] = [];
</script>

{#if suggestions.length > 0}
	<table>
		<thead>
			<tr>
				<th>회사명</th>
				<th>이름</th>
				<th>생성 날짜</th>
				<th>상태</th>
			</tr>
		</thead>
		<tbody>
			{#each suggestions as suggestion}
				<tr>
					<td>{suggestion.company_name}</td>
					<td>{suggestion.member_name}</td>
					<td>{suggestion.created_date}</td>
					<td>{suggestion.status}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

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
</style>
