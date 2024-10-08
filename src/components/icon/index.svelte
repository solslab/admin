<script lang="ts">
	import { ImageIcon } from './image';
	import { PathIcon } from './path';
	import { SVGIcon } from './svg';

	import { Palette } from '@src/util/color';

	import { ComponentSizeProps, Size } from '@src/util/size';
	import { CSSProperties, css } from '@src/util/style';
	import _ from 'lodash';
	import { IconFlipProps, IconProp, IconPropType, IconSpinProps } from '.';

	export let size: ComponentSizeProps = ComponentSizeProps.MD;
	export let color: string | undefined = undefined;
	export let flip: IconFlipProps | undefined | true = undefined;
	export let rotate: number = 0;
	export let spin: IconSpinProps | undefined = undefined;
	export let backgroundColor: string | undefined = undefined;
	export let borderRadius: string | undefined = undefined;
	export let margin: string | undefined = undefined;
	export let borderHarmonyName: Palette.HarmonyNameType = 'base';
	export let borderHarmonyShade: Palette.ShadeType | undefined = undefined;
	export let paint: Palette.Paint.Prop | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;

	export let styleContainer: CSSProperties = {};
	export let style: CSSProperties = {};
	export let icon: IconProp;

	let _style = _.cloneDeep(style);
	let _icon: IconProp = _.cloneDeep(icon);

	$: {
		_style = _.cloneDeep(style);
		_icon = _.cloneDeep(icon);
	}
	//TODO 예외 처리 확인 필요
	$: paint && (_style.color = Palette.Paint.from({ paint }));
	$: iconColor = color ? color : paint ? Palette.Paint.from({ paint }) : 'currentColor';
</script>

<div
	class="icon-container"
	on:click={() => onClick && onClick()}
	on:keydown
	style={css(
		{
			backgroundColor,
			borderRadius,
			border:
				borderHarmonyName && borderHarmonyShade
					? `1px solid ${Palette.scss(borderHarmonyName, borderHarmonyShade)}`
					: `1px solid transparent`,
			margin,
			transform: icon.scale ? `scale(${icon.scale})` : undefined
		},
		styleContainer
	)}
>
	{#if icon.type === IconPropType.IMAGE}
		<ImageIcon
			url={_icon.src}
			size={Size.Number[size]}
			{flip}
			{rotate}
			{spin}
			style={_style}
			defaultSize={size}
			defaultSrc={_icon.defaultSrc}
		/>
	{:else if icon.type === IconPropType.SVG}
		<SVGIcon
			svg={_icon.src}
			size={Size.Number[size]}
			color={iconColor}
			{flip}
			{rotate}
			{spin}
			style={_style}
		/>
	{:else if icon.type === IconPropType.PATH}
		<PathIcon
			path={_icon.src}
			size={Size.Number[size]}
			color={iconColor}
			{flip}
			{rotate}
			{spin}
			style={_style}
		/>{/if}
</div>

<style lang="scss">
	.icon-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		height: fit-content;
		overflow: hidden;
		//Icon 크기 조정
		transform: scale(0.8);
	}
</style>
