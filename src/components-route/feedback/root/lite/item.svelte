<script lang="ts">
	interface Feedback {
		rating: string;
		feedback_content: string;
	}

	export let feedbacks: Feedback[] = [];

	function getStarsArray(rating: string) {
		const num = parseInt(rating);
		return {
			filled: Array(num).fill('★'),
			empty: Array(5 - num).fill('★')
		};
	}
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
					<td class="stars">
						{#each getStarsArray(feedback.rating).filled as star}
							<span class="filled">{star}</span>
						{/each}
						{#each getStarsArray(feedback.rating).empty as star}
							<span class="empty">{star}</span>
						{/each}
					</td>
					<td>{feedback.feedback_content ? feedback.feedback_content : '-'}</td>
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

	.stars {
		text-align: center;
		font-size: 0; /* Removes default space between inline elements */

		.filled,
		.empty {
			font-size: 1rem;
			margin-right: 2px; /* Adds 2px space between stars */
		}

		.filled {
			color: var(--hq-peel-yellow-1500);
		}

		.empty {
			color: gray;
		}
	}
</style>
