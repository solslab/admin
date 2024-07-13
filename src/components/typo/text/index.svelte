<script lang="ts">
	import { Link } from '@src/components/link';
	import { Palette } from '@src/util/color';
	import { attr, css, getStyleStringUnit, type CSSProperties } from '@src/util/style';
	import type { Typo } from '@src/util/typo';

	export let style: CSSProperties = {};
	export let light: boolean = false;
	export let bold: boolean = false;
	export let mid: boolean = false;
	export let h: Typo.Size | undefined = undefined;
	export let pad: boolean = false;
	export let padding: string | undefined = undefined;
	export let harmonyName: Palette.HarmonyNameType | undefined = undefined;
	export let harmonyShade: Palette.ShadeType | undefined = undefined;
	export let ellipsis: boolean = false;
	export let color: string | undefined = undefined;
	export let width: string | number | undefined = undefined;
	export let align: 'left' | 'center' | 'right' = 'left';
	export let userSelect: 'none' | 'text' | 'all' = 'text';
	export let fontWeight: number | string | undefined = undefined;
	export let paint: Palette.Paint.Prop | undefined = undefined;
	export let breakAll: boolean = false;
	export let breakWord: boolean = false;
	export let link: { outbound?: boolean; href: string; disableUnderline?: boolean } | undefined =
		undefined;
	export let mono: boolean = false;
	export let opensans: boolean = false;
	export let innerHtml: string | undefined = undefined;
	export let inline: boolean = false;

	$: _fontWeight = fontWeight ? String(fontWeight) : bold ? 700 : light ? 400 : mid ? 500 : 600;
	$: paletteColor = (harmonyName || harmonyShade) && Palette.scss(harmonyName || 'base', 100);
	$: _color = color
		? color
		: Palette.Paint.from({ paint: paint }) ||
			(link ? Palette.scss('sapphire-blue', 900) : undefined) ||
			paletteColor ||
			Palette.scss('base', 200);
	let eleText: HTMLDivElement;

	$: innerHtml && eleText && (eleText.innerHTML = innerHtml);
</script>

<div
	class="typo"
	data-ellipsis={attr(ellipsis)}
	data-link={attr(link)}
	data-mono={attr(mono)}
	data-opensans={attr(opensans)}
	data-disable-underline={attr(link && link.disableUnderline)}
	style={css(
		{
			color: _color,
			fontWeight: _fontWeight,
			padding: padding ? padding : pad ? undefined : '0',
			width: getStyleStringUnit(width),
			textAlign: align,
			wordBreak: breakAll ? 'break-all' : breakWord ? 'break-word' : undefined,
			userSelect
		},
		style
	)}
	data-h={attr(h)}
	data-inline={attr(inline)}
	bind:this={eleText}
>
	{#if !innerHtml}
		{#if link}
			<Link outbound={link.outbound} href={link.href}>
				<slot />
			</Link>
		{:else}
			<slot />
		{/if}
	{/if}
</div>

<style lang="scss">
	.typo {
		font-weight: 500;
		line-height: 1.5;

		&[data-link] {
			&[data-disable-underline] {
				text-decoration: none;
			}
		}

		font-size: inherit;
		// font Size
		&[data-ellipsis] {
			@include text-ellipse();
		}
		&[data-inline] {
			display: inline;
		}
		&[data-h='1'] {
			font-size: 33px;
			padding: 21.45px 0;
		}
		&[data-h='2'] {
			font-size: 26px;
			padding: 16.5px 0;
		}
		&[data-h='3'] {
			font-size: 22px;
			padding: 16.5px 0;
		}
		&[data-h='4'] {
			font-size: 18px;
			padding: 11.55px 0;
		}
		&[data-h='5'] {
			font-size: 17px;
			padding: 8.25px 0;
		}
		&[data-h='6'] {
			font-size: 16px;
			padding: 6.6px 0;
		}
		&[data-h='7'] {
			font-size: 14px;
			padding: 4.95px 0;
		}
		&[data-h='8'] {
			font-size: 12px;
			padding: 3.3px 0;
		}
		&[data-h='9'] {
			font-size: 11px;
			padding: 2.475px 0;
		}
	}
</style>
