<script lang="ts">
	import { Palette } from '@src/util/color';
	import { ScrollShadow } from '@src/components/scroll-shadow';
	import { attr, css, getStyleStringUnitUndefined } from '@src/util/style';

	export let shade: Palette.ShadeType = 200;
	export let disableShade: boolean = false;
	export let maxHeight: string | number | undefined = undefined;

	let ele: HTMLDivElement;
</script>

<div
	class="root"
	data-scrollbar-shade={!disableShade && shade}
	bind:this={ele}
	data-border={attr(disableShade)}
	style={css({
		maxHeight: getStyleStringUnitUndefined(maxHeight)
	})}
>
	{#if !disableShade}
		<ScrollShadow position={{ top: '0px' }} parent={ele} />
	{/if}

	<slot />
</div>

<style lang="scss">
	.root {
		width: 100%;
		height: 100%;
		&[data-border] {
			border-top: solid 1px var(--hq-transparent-inverse-0300);
		}
		@include scrollbar();
		&[data-scrollbar-shade='200'] {
			@include scrollbarWithBg(var(--hq-base-0200));
		}
		&[data-scrollbar-shade='300'] {
			@include scrollbarWithBg(var(--hq-base-0300));
		}
		&[data-scrollbar-shade='400'] {
			@include scrollbarWithBg(var(--hq-base-0400));
		}
		overflow-y: auto;
	}
</style>
