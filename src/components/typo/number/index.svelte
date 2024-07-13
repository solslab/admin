<script lang="ts">
	import type { Typo } from '@src/util/typo';

	import { LinkProp } from '@src/components/link/index.svelte';
	import { Palette } from '@src/util/color';
	import { Format } from '@src/util/format';
	import { CSSProperties } from '@src/util/style';
	import { TypoSub, TypoText } from '..';

	export let value: number | string | undefined;
	export let link: LinkProp | undefined = undefined;

	export let prop: Typo.Number = {};
	export let paint: Palette.Paint.Prop = {};
	export let style: CSSProperties = {};

	$: h = prop.h || 6;
	$: formatter = prop.formatter || Format.integer;
	$: smallDecimal = prop.smallDecimal || false;
	$: defaultDisplay = prop.defaultDisplay || undefined;
	$: bold = prop.bold || false;
	$: mid = prop.mid || false;
	$: light = prop.light || false;
	$: boldDecimal = prop.boldDecimal || false;
	$: lightDecimal = prop.lightDecimal || false;
	$: midDecimal = prop.midDecimal || false;
	$: midPrefix = prop.midPrefix || false;
	$: smallSuffix = prop.smallSuffix || prop.smallDecimal || false;
	$: suffix = prop.suffix || '';
	$: prefix = prop.prefix || '';
	$: decimalOpacity = prop.decimalOpacity || 1;
	$: prefixOpacity = prop.prefixOpacity || 1;
	$: suffixOpacity = prop.suffixOpacity || 1;
	$: suffixPaint = prop.suffixPaint || undefined;
	$: suffixColor = prop.suffixColor || undefined;
	$: align = prop.align || undefined;
	$: smallPrefix = prop.smallPrefix || false;

	$: stringfiedValue = (() => {
		if (value === undefined) {
			return {
				integer: defaultDisplay || '-',
				decimal: ''
			};
		}
		const val = formatter(value).split('.');

		return {
			integer: val[0],
			decimal: val[1] ? '.' + val[1] : ''
		};
	})();
	$: decimalH = <Typo.Size>(
		(smallDecimal ? Number(h) + (smallDecimal === true ? 1 : smallDecimal) : Number(h))
	);
	$: prefixH = <Typo.Size>(
		(smallPrefix ? Number(h) + (smallPrefix === true ? 1 : smallPrefix) : Number(h))
	);

	$: suffixH = <Typo.Size>(
		(smallSuffix ? Number(h) + (smallSuffix === true ? 1 : smallSuffix) : Number(h))
	);
</script>

<TypoText {h} mono {bold} {mid} {light} {align} {paint} {link} breakAll style={{ ...style }}>
	{#if prefix && value !== undefined}
		<TypoSub opacity={prefixOpacity}>
			<TypoText h={prefixH} mid={midPrefix}>
				{prefix}
			</TypoText>
		</TypoSub>
	{/if}
	{stringfiedValue.integer}{#if stringfiedValue.decimal}
		<TypoSub style={{ verticalAlign: 'baseline' }} opacity={decimalOpacity}
			><TypoText h={decimalH} bold={boldDecimal} light={lightDecimal} inline mid={midDecimal}
				>{stringfiedValue.decimal}</TypoText
			></TypoSub
		>
	{/if}
	{#if suffix && value !== undefined}
		<TypoSub
			opacity={suffixOpacity}
			style={{
				color: suffixColor || Palette.Paint.from({ paint: suffixPaint })
			}}
		>
			<TypoText h={suffixH} bold={boldDecimal} light={lightDecimal} mid={midDecimal}>
				{suffix}
			</TypoText>
		</TypoSub>
	{/if}
</TypoText>
