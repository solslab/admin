<script lang="ts">
	import { Modal } from '@src/components-global/modal';
	interface Review {
		tr_id: string;
		company_name: string;
		member_name: string;
		created_date: string;
	}

	export let reviews: Review[] = [];
</script>

<table>
	<thead>
		<tr>
			<th>회사명</th>
			<th>이름</th>
			<th>생성 날짜</th>
		</tr>
	</thead>
	<tbody>
		{#each reviews as review}
			<tr on:click={() => Modal.ReviewListDetailModal.set({ data: review }).open()}>
				<td>{review.company_name}</td>
				<td>{review.member_name}</td>
				<td>{review.created_date}</td>
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
</style>
