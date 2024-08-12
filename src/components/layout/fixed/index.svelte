<script lang="ts">
	import { openDrawer } from '@src/components/frame/store';
	import { CSSProperties, css } from '@src/util/style';

	export let position: 'CENTER' | 'RIGHT';
	export let ignoreDrawer: boolean = true;

	export let zIndex: number | string = 1;
	export let style: CSSProperties = {};
</script>

<div
	class="root"
	data-fixed
	data-position={position}
	data-ignore-drawer={ignoreDrawer ? ignoreDrawer : undefined}
	data-open-drawer={$openDrawer ? $openDrawer : undefined}
	style={css(
		{
			zIndex
		},
		style
	)}
>
	<slot />
</div>

<style lang="scss">
	.root {
		position: fixed;
		bottom: 4rem;

		&[data-position='CENTER'] {
			left: 50vw;
			transform: translateX(-50%);

			&[data-ignore-drawer] {
				&[data-open-drawer] {
					left: calc(50vw + $drawer-max-width / 2);
				}

				&:not([data-open-drawer]) {
					left: calc(50vw + $drawer-min-width / 2);
				}
			}
		}

		&[data-position='RIGHT'] {
			right: 4rem;
		}
	}
</style>
