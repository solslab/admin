<script lang="ts">
	import { Palette } from '@src/util/color';

	import { Icon, IconSpinProps } from '@src/components/icon';
	import { DefIcons } from '@src/icons/defines';
	import { ComponentSizeProps } from '@src/util/component';
	import { CSSProperties } from '@src/util/style';
	export let size: ComponentSizeProps = ComponentSizeProps.XS;
	export let styleContainer: CSSProperties | undefined = undefined;
	export let paint: Palette.Paint.Prop = { harmonyName: 'selective-yellow', harmonyShade: 1500 };
</script>

<Icon
	color={Palette.Paint.from({ paint })}
	icon={DefIcons.Common.Loading}
	spin={IconSpinProps.CLOCKWISE}
	{size}
	{styleContainer}
/>
