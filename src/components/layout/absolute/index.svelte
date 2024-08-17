<script lang="ts">
	import { CSSProperties, css, getStyleStringUnitUndefined } from '@src/util/style';

	export let left: string | number | undefined = undefined;
	export let top: string | number | undefined = undefined;
	export let right: string | number | undefined = undefined;
	export let bottom: string | number | undefined = undefined;
	export let zIndex: number | string = 1;
	export let width: string | number | undefined = undefined;
	export let height: string | number | undefined = undefined;
	export let style: CSSProperties = {};
</script>

<div
	class="root"
	data-absolute
	style={css(
		{
			left: getStyleStringUnitUndefined(left),
			top: getStyleStringUnitUndefined(top),
			right: getStyleStringUnitUndefined(right),
			bottom: getStyleStringUnitUndefined(bottom),
			width: getStyleStringUnitUndefined(width),
			height: getStyleStringUnitUndefined(height),

			zIndex
		},
		style
	)}
>
	<slot />
</div>

<style lang="scss">
	.root {
		position: absolute;
	}
</style>
