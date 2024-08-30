<script lang="ts">
	import { TypoText, TypoTextWithIcon, BCTypo } from '@src/components/typo';
	import { BCUnit, EmptyProps } from '@src/components/unit';
	import { CardContentAccentArea } from '@src/components/content';
	import { ContainerGrid } from '@src/components/container';
	import { CSSProperties, getStyleStringUnit } from '@src/util/style';
	import { Typo } from '@src/util/typo';

	export let style: CSSProperties = {};
	export let prop: EmptyProps;
	export let h: Typo.Size = 4;
	export let flexCenter: boolean = false;

	const titleH = <Typo.Size>Number(h);
	const messageH = <Typo.Size>(Number(h) + 1);
</script>

<CardContentAccentArea
	transparent={prop.transparent}
	style={{
		padding: '1.5rem',
		opacity: 0.7,
		minHeight: getStyleStringUnit(prop.minHeight),
		...style
	}}
	border={prop.border}
>
	{#if prop.backgroundSrc}
		<BCUnit.Image
			src={prop.backgroundSrc}
			style={{
				width: '11rem',
				height: '11rem',
				position: 'absolute',
				right: '-2.2rem',
				bottom: '-2rem',
				opacity: 0.1,
				filter: 'grayscale(1)',
				...prop.style
			}}
		/>
	{/if}
	<ContainerGrid {flexCenter}>
		<BCTypo.TextWithIcon
			prop={{ h: titleH }}
			icon={prop.icon}
			paint={{ harmonyName: 'base', harmonyShade: 1600 }}
			text={prop.title}
		/>
	</ContainerGrid>
	<ContainerGrid {flexCenter}>
		<BCTypo.Text
			prop={{ h: messageH }}
			paint={{ harmonyName: 'base', harmonyShade: 1600 }}
			text={prop.message}
		/>
	</ContainerGrid>
</CardContentAccentArea>
