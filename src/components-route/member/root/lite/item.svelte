<script lang="ts">
	import { Modal } from '@src/components-global/modal';
	interface Member {
		member_key: string;
		name: string;
		email: string;
		social_type: string;
		created_date: string;
	}

	export let members: Member[] = [];
</script>

{#if members.length > 0}
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Social Type</th>
				<th>Created Date</th>
			</tr>
		</thead>
		<tbody>
			{#each members as member}
				<tr on:click={() => Modal.MemberListDetailModal.set({ data: member }).open()}>
					<td>{member.name}</td>
					<td>{member.email}</td>
					<td>{member.social_type}</td>
					<td>{member.created_date}</td>
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
