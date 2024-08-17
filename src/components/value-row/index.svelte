<script lang="ts">
	import { Palette } from '@src/util/color';
	import { ButtonIcon } from '@src/components/buttonicon';
	import { LinkProp } from '@src/components/link/index.svelte';
	import { BCTypo, TypoSub } from '@src/components/typo';
	import { ContainerGrid } from '@src/components/container';
	import { FieldFlex, FieldGrid } from '@src/components/field';
	import { DefIcons } from '@src/icons/defines';
	import { TipOption } from '@src/util/actions/tip';
	import { Clipboard } from '@src/util/clipboard';
	import { ComponentSizeProps } from '@src/util/component';
	import { IconPropType } from '@src/util/icon';
	import {
		CSSProperties,
		css,
		getStyleStringUnit,
		getStyleStringUnitUndefined
	} from '@src/util/style';
	import { Typo } from '@src/util/typo';
	import { URL } from '@src/util/url';
	import { ValueRawAlign } from '.';

	export let name: string;
	export let value: string | number | object | undefined = undefined;
	export let subValue: string | undefined = undefined;
	export let align: ValueRawAlign = 'left';
	export let headerWidth: string | number = 10;
	export let valueWidth: string | number = '1fr';
	export let vertical: boolean = false;
	export let copy: string = '';
	export let gap: string | number = 0;
	export let marginBottom: string | number = '0.7rem';
	export let numberProp: Typo.Number | undefined = undefined;
	export let textProp: Typo.Text | undefined = undefined;
	export let textStyle: CSSProperties = {};
	export let paint: Palette.Paint.Prop = {};
	export let bold = false;
	export let mid = false;
	export let light = false;
	export let link: LinkProp | undefined = undefined;
	export let headerVerticalCenter: boolean = false;
	export let titleSans: boolean = false;
	export let sans: boolean = false;
	export let column = `${getStyleStringUnit(headerWidth)} ${getStyleStringUnit(valueWidth)}`;
	export let valueJustify: CSSProperties['justifyContent'] = 'flex-start';
	export let valueMaxWidth: string | number | undefined = undefined;
	export let tipOption: TipOption | undefined = undefined;
	export let titleProp: Typo.Text | undefined = undefined;
	export let styleValue: CSSProperties = {};
	export let styleRoot: CSSProperties = {};
	export let titleColumn: string | undefined = undefined;

	$: _column = vertical ? '1fr' : column;
</script>

<FieldGrid
	{gap}
	column={_column}
	style={{ marginBottom: getStyleStringUnit(marginBottom), ...styleRoot }}
>
	<ContainerGrid flexAlignCenter={headerVerticalCenter}>
		<FieldFlex alignItems="center" gap="0.1">
			<BCTypo.TextWithIcon
				column={titleColumn}
				paint={{
					harmonyName: 'base',
					harmonyShade: 1600
				}}
				iconPaint={{
					harmonyName: 'base',
					harmonyShade: 1100
				}}
				prop={titleProp
					? titleProp
					: {
							mid: true,
							h: 6
						}}
				reverse
				icon={tipOption ? DefIcons.Common.InfoVariant : undefined}
				iconComponentSize={ComponentSizeProps.XXS}
				iconScale={0.75}
				gap={0}
				style={{ fontWeight: '500 !important' }}
				text={name}
			/>
		</FieldFlex>
	</ContainerGrid>
	<ContainerGrid
		flexAlignCenter
		style={{
			justifyContent: valueJustify,
			maxWidth: getStyleStringUnitUndefined(valueMaxWidth),
			...styleValue
		}}
	>
		{#if numberProp && (typeof value === 'string' || typeof value === 'number')}
			<BCTypo.Number {paint} {value} prop={{ h: 6, ...numberProp, bold, mid, light }} {link} />
		{:else if typeof value === 'string' || typeof value === 'number'}
			<BCTypo.Text
				prop={{
					...{
						opensans: true,
						bold,
						align,
						h: 6,
						mid: true,
						breakAll: true,
						link: link
							? link
							: URL.isValid(value.toString())
								? {
										outbound: true,
										href: value.toString()
									}
								: undefined
					},
					...textProp
				}}
				{textStyle}
				{paint}
			>
				{value}
				{#if subValue}
					<TypoSub style={{ paddingLeft: '0.3rem' }}>{subValue}</TypoSub>
				{/if}
			</BCTypo.Text>
		{:else}
			<slot />
		{/if}
		{#if $$slots.sub}
			<div
				class="sub"
				style={css({
					display: 'flex',
					width: '100%',
					justifyContent: align
				})}
			>
				<slot name="sub" />
			</div>
		{/if}
	</ContainerGrid>
</FieldGrid>
