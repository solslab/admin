<script lang="ts">
	import { Modal } from '@src/components-global/modal';
	interface Feedback {
		rating: string;
		feedback_content: string;
	}

	export let feedbacks: Feedback[] = [];
</script>

{#if feedbacks.length > 0}
	<table>
		<thead>
			<tr>
				<th>별점</th>
				<th>피드백</th>
			</tr>
		</thead>
		<tbody>
			{#each feedbacks as feedback}
				<tr>
					<td>{feedback.rating}</td>
					<td>{feedback.feedback_content}</td>
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
