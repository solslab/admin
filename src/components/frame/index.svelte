<script lang="ts">
	import { isOverScreen, screen } from '@src/store/env/index';
	import { FrameDrawer } from './index';
	import { openDrawer } from './store';

	$: overSM = isOverScreen('sm', $screen);
</script>

<div class="root" data-frame>
	{#if overSM}
		<FrameDrawer />
	{/if}

	<div class="overvall" data-open={$openDrawer}>
		<div class="content-root" data-open={$openDrawer}>
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	@import './theme.scss';
	:global(html) {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		font-size: 18px;

		@include screen-more-lg() {
			font-size: 18px !important;
		}

		@include screen-md() {
			font-size: 16.5px;
		}

		@include screen-sm() {
			font-size: 14.5px;
		}

		@include screen-xs() {
			font-size: 14.5px;
		}
	}

	.root {
		display: flex;
		width: 100%;
		max-width: 100%;
		height: 100%;

		.overvall {
			flex: 1 0;
			height: 100%;
			max-width: calc(100% - #{$drawer-min-width});

			&[data-open='true'] {
				max-width: calc(100% - #{$drawer-max-width});
			}
			@include screen-sm() {
				max-width: 100% !important;
			}
			.content-root {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
				background: var(--hq-base-0200);
			}
		}
	}
</style>
