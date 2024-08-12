<script lang="ts">
	import { CSSProperties, attr, css } from '@src/util/style';

	export let contentStyle: CSSProperties = {};
	export let rootStyle: CSSProperties = {};
	export let clear: boolean = false;
	export let fit: boolean = false;
	export let fitNoTitle = false;
	export let disableCenter = false;
	export let backgroundClear = false;
	export let transparent = false;
	export let borderBottom = false;

	$: rootStyle = {
		...rootStyle,
		backgroundColor: transparent ? 'transparent' : 'var(--hq-base-0300)',
		borderBottom: borderBottom ? 'solid 1px var(--hq-transparent-inverse-0400)' : undefined
	};
	$: contentStyle = {
		...contentStyle,
		boxShadow: transparent ? 'none' : undefined
	};
</script>

<div class="root" style={css(rootStyle)} data-fit={attr(fit)} data-fit-no-title={attr(fitNoTitle)}>
	<div
		class="content-center"
		data-clear={attr(clear)}
		style={css(contentStyle)}
		data-disable-center={attr(disableCenter)}
		data-basckground-clear={attr(backgroundClear)}
	>
		<slot />
	</div>
</div>

<style lang="scss">
	.root {
		background: var(--hq-base-0200);
		padding: 2rem;

		@include screen-sm {
			padding: 1rem 1rem;
		}

		@include screen-xs {
			padding: 0.5rem 0.5rem;
		}

		&[data-fit='true'] {
			min-height: 60vh;
		}

		&[data-fit-no-title='true'] {
			min-height: 70vh;
		}
		.content-center {
			position: relative;
			background: var(--hq-base-0200);
			max-width: 1440px;
			margin: 0 auto;

			border-radius: 0.3rem;
			box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.125);

			&[data-basckground-clear='true'] {
				background: transparent;
				box-shadow: none;
			}
			&[data-disable-center] {
				margin: 0;
			}
			&[data-clear='true'] {
				background: transparent;
				box-shadow: none;
				min-height: auto;
			}
		}
	}
</style>
