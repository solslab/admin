<script lang="ts">
	import { mdiCheck, mdiContentCopy } from '@mdi/js';
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
	import { Icon, IconPropType } from '@src/components/icon';
	import { Clipboard } from '@src/util/clipboard';
	import { Palette } from '@src/util/color';
	import { ComponentSizeProps } from '@src/util/size';
	import { attr, css, type CSSProperties } from '@src/util/style';
	import { Typo } from '@src/util/typo';

	import { TypoText } from '..';

	export let prop: Typo.Text = {};
	export let paint: Palette.Paint.Prop = {};
	export let style: CSSProperties = {};
	export let textStyle: CSSProperties = {};
	export let text: string | undefined = undefined;
	export let copyContainerStyle: CSSProperties = {};

	let copied: boolean = false;

	$: h = prop.h || 6;
	$: bold = prop.bold || false;
	$: mid = prop.mid || false;
	$: light = prop.light || false;
	$: align = prop.align || undefined;
	$: mono = prop.mono || undefined;
	$: link = prop.link || undefined;
	$: opensans = prop.opensans || undefined;
	$: ellipsis = prop.ellipsis || undefined;
	$: copy = prop.copy || undefined;
	$: pad = prop.pad || undefined;
	$: copyText = prop.copyText || undefined;
	$: breakAll = prop.breakAll || undefined;
	$: breakWord = prop.breakWord || undefined;
</script>

<div
	class="wrapped-text"
	data-copy={attr(copy)}
	style={css(style)}
	on:keydown
	on:click={(e) => {
		if (!copy || !text) return;
		Clipboard.copy(copyText || text);
		copied = true;
		setTimeout(() => (copied = false), 2000);
		e.stopImmediatePropagation();
		e.stopPropagation();
	}}
>
	<FieldGrid column={copy ? 'auto 16px 1fr' : '1fr'}>
		<ContainerGrid>
			<TypoText
				userSelect="all"
				style={textStyle}
				{pad}
				{h}
				{bold}
				{mid}
				{light}
				{align}
				{paint}
				{mono}
				{link}
				{opensans}
				{ellipsis}
				{breakAll}
				{breakWord}
			>
				{#if text}
					{text}
				{/if}
				<slot />
			</TypoText>
		</ContainerGrid>
		{#if copy}
			<ContainerGrid flexAlignCenter style={copyContainerStyle}>
				{#if copied}
					<Icon
						size={ComponentSizeProps.XXS}
						paint={{ harmonyName: 'light-green', harmonyShade: 1700 }}
						icon={{ type: IconPropType.PATH, src: mdiCheck, scale: 0.7 }}
					/>
				{:else}
					<Icon
						size={ComponentSizeProps.XXS}
						icon={{ type: IconPropType.PATH, src: mdiContentCopy, scale: 0.7 }}
					/>
				{/if}
			</ContainerGrid>
		{/if}
	</FieldGrid>
</div>

<style lang="scss">
	.wrapped-text {
		display: flex;
		&[data-copy] {
			cursor: pointer;
			color: var(--hq-base-1700);
			&:hover {
				color: var(--hq-base-2300);
			}
		}
	}
</style>
