<script lang="ts">
	import { Palette } from '@src/util/color';
	import { Icon } from '@src/components/icon';
	import { Link } from '@src/components/link';
	import { LinkProp } from '@src/components/link/index.svelte';
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
	import { ComponentSizeProps } from '@src/util/component';
	import { IconProp } from '@src/util/icon';
	import { CSSProperties } from '@src/util/style';
	import { Typo } from '@src/util/typo';
	import { BCTypo, TypoSub } from '..';

	export let prop: Typo.Text = {};
	export let paint: Palette.Paint.Prop = {};
	export let link: LinkProp | undefined = undefined;
	export let style: CSSProperties = {};
	export let textStyle: CSSProperties = {};
	export let subTextStyle: CSSProperties = {};
	export let textContainerStyle: CSSProperties = {};
	export let icon: IconProp | undefined = undefined;
	export let iconScale: number | undefined = undefined;
	export let iconComponentSize: ComponentSizeProps | undefined = undefined;
	export let iconStyle: CSSProperties = {};
	export let gap: string | number = 0.2;
	export let iconPaint: Palette.Paint.Prop = paint || {};
	export let text: string | undefined = undefined;
	export let subText: string | undefined = undefined;
	export let reverse: boolean = false;
	export let iconBorderRadius: string | undefined = undefined;
	export let iconBackgroundHarmonyName: Palette.HarmonyNameType | undefined = undefined;
	export let iconBackgroundHarmonyShade: Palette.ShadeType | undefined = undefined;
	export let column: string | undefined = undefined;

	$: h = prop.h || 6;
	$: link = prop.link || undefined;
	$: iconScale = iconScale || 1 - Number(h) * 0.06;
	$: textProp = { ...prop, tipOption: undefined };
</script>

<Link href={link && link.href} outbound={link && link.outbound}>
	<FieldGrid
		column={column ? column : reverse ? '1fr auto' : 'auto 1fr'}
		style={{ ...style }}
		{gap}
	>
		{#if icon}
			<ContainerGrid startColumn={reverse ? '2' : '1'} startRow="1">
				<Icon
					style={iconStyle}
					size={iconComponentSize}
					borderRadius={iconBorderRadius}
					borderHarmonyName={iconBackgroundHarmonyName}
					borderHarmonyShade={iconBackgroundHarmonyShade}
					icon={{ ...icon, scale: iconScale }}
					paint={iconPaint}
				/>
			</ContainerGrid>
		{/if}
		<ContainerGrid
			flexAlignCenter
			startColumn={reverse ? '1' : '2'}
			startRow="1"
			style={{ ...textContainerStyle }}
		>
			{#if text}
				<BCTypo.Text prop={textProp} {text} {paint} style={textStyle}>
					{#if subText}
						<TypoSub style={{ ...subTextStyle }} opacity={1}>{subText}</TypoSub>
					{/if}
				</BCTypo.Text>
			{/if}
		</ContainerGrid>
	</FieldGrid>
</Link>
