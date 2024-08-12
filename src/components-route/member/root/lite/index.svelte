<script lang="ts">
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';

	$: asyncMemberList = exec(async () => {
		return await API.Member.getAllMembers();
	});
</script>

{#await asyncMemberList}
	<div>Loading...</div>
{:then memberList}
	{#each memberList as member}
		<div>{member.name}</div>
	{/each}
{:catch error}
	<div>{error.message}</div>
{/await}
