<script lang="ts">
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
</script>

<div class="footer">
	<FieldGrid column="1fr auto" full>
		<ContainerGrid></ContainerGrid>
		<ContainerGrid flexAlignCenter>
			<div class="powered-by">
				<a href="https://github.com/solslab" target="_blank">
					Powered by
					<b>Sols lab</b>
				</a>
			</div>
		</ContainerGrid>
	</FieldGrid>
</div>

<style lang="scss">
	.footer {
		height: 100%;
		background: var(--hq-base-2200);
		border-top: solid 1px var(--hq-base-2100);
		.powered-by {
			font-size: 11px;
			font-weight: 400;
			color: var(--hq-base-1200);
			padding-right: 8px;
		}
	}
</style>
