<script lang="ts">
	import { BCUnit } from '@src/components/unit';
	import { ComponentSizeProps, Size } from '@src/util/size';
	import { CSSProperties, attr, css } from '@src/util/style';
	import _ from 'lodash';
	import { IconFlipProps, IconSpinProps, getIconTransfromStyle } from '..';

	export let url: string | undefined;
	export let size: number = Size.Number.md;
	export let flip: IconFlipProps | undefined | true = undefined;
	export let rotate: number = 0;
	export let spin: IconSpinProps | undefined = undefined;
	export let defaultSrc: string | undefined = undefined;
	export let defaultSize: ComponentSizeProps = ComponentSizeProps.SM;

	export let style: CSSProperties = {};
	let _style: CSSProperties = _.cloneDeep(style);

	if (Number(size)) {
		size = Number(size);
	}
	$: styles = getIconTransfromStyle(size, flip, rotate);
	$: _style = _.cloneDeep(style);
</script>

<div class="image-icon" data-spin={attr(spin)} style={css(styles, _style)} data-img={url}>
	<BCUnit.Image src={url} {defaultSrc} {defaultSize} />
</div>

<style lang="scss">
	.image-icon {
		position: relative;
		width: 100%;
		height: 100%;

		&[data-spin='clockwise'] {
			animation: spin-inverse linear 2s infinite;
			transform-origin: center;
			@keyframes spin-inverse {
				to {
					transform: rotate(360deg);
				}
			}
		}

		&[data-spin='counterclockwise'] {
			animation: spin linear 2s infinite;
			transform-origin: center;
			@keyframes spin {
				to {
					transform: rotate(-360deg);
				}
			}
		}
	}
</style>
