<script lang="ts">
	import { SectionDivider } from '@src/components/section';
	import { attr } from '@src/util/style';
	import { NavGroup } from '..';
	import { openDrawer } from '../../store';
	import { NavPropGroup } from '../navigation';

	export let groups: NavPropGroup[];
</script>

<div class="nav-group-field" data-close-drawer={attr(!$openDrawer)}>
	<div class="nav-group-background">
		<slot name="forwards" />
		{#each groups as group, index}
			<NavGroup {group} useTopDivider />
		{/each}
	</div>
</div>

<style lang="scss">
	.nav-group-field {
		margin: 0.2rem 0;
		padding: 0 0.5rem;
		&[data-close-drawer] {
			margin: 0.3rem 0;
		}
		.nav-group-background {
			border-radius: 0.4rem;
			overflow: hidden;
		}
	}
</style>
