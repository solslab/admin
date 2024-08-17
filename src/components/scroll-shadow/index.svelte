<script lang="ts">
	import { Palette } from '@src/util/color';
	import { attr, css, CSSProperties, getStyleStringUnit } from '@src/util/style';
	import _ from 'lodash';
	import { onDestroy } from 'svelte';

	export let parent: HTMLDivElement;
	export let harmonyName: Palette.HarmonyNameType = 'base';
	export let harmonyShade: Palette.ShadeType = 200;
	export let color: string | undefined = undefined;
	export let shadowHeight: string | number = '1rem';
	export let position: { top?: string | number; bottom?: string | number } = {};
	export let style: CSSProperties = {};
	export let bindTop: boolean = false;
	export let disableBottom: boolean = false;
	export let disableTop: boolean = false;

	let _scroll = 0;
	let _scrollable = false;
	let _top = false;
	let _bottom = false;
	const throttleScroll = () => {
		_scroll = parent.scrollTop;
		_scrollable = parent.scrollHeight > parent.clientHeight;
		_scrollable && (_top = _scroll === 0);
		_scrollable && (_bottom = _scroll === parent.scrollHeight - parent.clientHeight);
	};

	$: parent &&
		(parent.removeEventListener('scroll', throttleScroll),
		parent.addEventListener('scroll', throttleScroll),
		throttleScroll());

	$: _scrollable = parent && parent.scrollHeight > parent.clientHeight;

	onDestroy(() => {
		parent && parent.removeEventListener('scroll', throttleScroll);
	});
</script>

<div class="root" style={css({ top: bindTop ? _scroll + 'px' : 0 + 'px' })}>
	<div
		class="grad"
		data-top
		data-enable={attr(_scrollable && !_top && !disableTop)}
		style={css(
			{
				top: getStyleStringUnit(position.top || 0),
				height: getStyleStringUnit(shadowHeight),
				background: `linear-gradient(${
					color || Palette.scss(harmonyName, harmonyShade)
				}, var(--hq-transparent-0100));`
			},
			style
		)}
	/>
	<div
		class="grad"
		data-bottom
		data-enable={attr(_scrollable && !_bottom && !disableBottom)}
		style={css(
			{
				bottom: getStyleStringUnit(position.bottom || 0),
				height: getStyleStringUnit(shadowHeight),
				background: `linear-gradient(var(--hq-transparent-0100), ${
					color || Palette.scss(harmonyName, harmonyShade)
				})`
			},
			style
		)}
	/>
</div>

<style lang="scss">
	.root {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		.grad {
			position: absolute;
			height: 2rem;
			width: 100%;
			left: 0;
			z-index: 20;
			opacity: 0;
			transition: opacity 0.215s;

			&[data-enable] {
				opacity: 0.7;
			}

			&[data-top] {
				top: 0;
			}
			&[data-bottom] {
				bottom: 0;
			}
		}
	}
</style>
