<script lang="ts">
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
	import { Icon, IconPropType } from '@src/components/icon';
	import { css } from '@src/util/style';
</script>

<div class="navigation-header">
	<FieldGrid
		column="250px auto auto auto 1fr auto auto"
		gap={1}
		full
		style={{ paddingRight: '8px' }}
	>
		<ContainerGrid flexAlignCenter>
			<div
				style={css({
					height: '100%',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					borderRight: 'solid 1px var(--hq-base-2100)'
				})}
			>
				<Icon
					styleContainer={{
						marginLeft: '-4px'
					}}
					style={{ width: '180px' }}
					icon={{
						type: IconPropType.IMAGE,
						src: '/favicon.png'
					}}
				></Icon>
			</div>
		</ContainerGrid>
		<!-- layout menu영역  -->
		<ContainerGrid flexAlignCenter></ContainerGrid>
		<ContainerGrid flexAlignCenter></ContainerGrid>
		<ContainerGrid flexAlignCenter></ContainerGrid>
		<ContainerGrid></ContainerGrid>
		<ContainerGrid flexAlignCenter></ContainerGrid>
		<ContainerGrid flexAlignCenter>
		</ContainerGrid>
	</FieldGrid>
</div>

<style lang="scss">
	.navigation-header {
		height: 100%;
		background: var(--hq-base-2200);
		border-bottom: solid 1px var(--hq-base-2100);
		color: var(--hq-base-0400);
		font-size: 14px;
	}
</style>
