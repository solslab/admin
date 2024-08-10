<script lang="ts">
	import _ from 'lodash';

	import { type CSSProperties, attr, css, getStyleStringUnit } from '@src/util/style';
	import { createEventDispatcher } from 'svelte';
	import { Color, Palette } from '@src/util/color';
	import { ComponentSizeProps } from '@src/util/component';
	import { exec } from '@src/util/util.function';
	import { wait } from '@src/util/util.time';

	export let depth: Palette.Depth = Palette.Depth.NORMAL;
	export let harmony: Palette.Harmony | undefined = undefined;
	export let size: ComponentSizeProps = ComponentSizeProps.MD;
	export let border: boolean = false;

	export let fit: boolean = false;
	export let width: number | string | undefined = undefined;

	export let error: boolean = false;
	export let errorColor: string = Palette.scss('dard-red', 1500);
	export let filled: boolean = false;
	export let filledColor: string = Palette.scss('lavender-purple', 1500);

	export let placeholder: string | undefined = 'Input';
	export let debounceTime: number = 200;
	export let value: string | undefined = undefined;
	export let style: CSSProperties = {};
	export let type: 'text' | 'number' | 'password' = 'text';

	let _harmony: Palette.Harmony = Palette.Harmonies.base.Lv1;
	let _style: CSSProperties = _.cloneDeep(style);

	export let focus: boolean = false;

	let eleRoot: HTMLInputElement;

	const dispatch = createEventDispatcher<{
		changedebounce: string;
		change: string;
		submit: string;
		clicklefticon: string;
		clickrighticon: string;
		focus: void;
	}>();

	const debounce = _.debounce(() => dispatch('changedebounce', value), debounceTime);

	let status: Palette.Action = Palette.Action.BASE;

	$: {
		_style.maxWidth = getStyleStringUnit(width);
		width && (_style.width = getStyleStringUnit(width));
		_harmony = harmony ? _.cloneDeep(harmony) : _.cloneDeep(_harmony);
		_style = Object.assign(
			_style,
			Color.Brush.create(_harmony).setProp(depth).setStatus(status).setTransition(false).build()
		);
	}

	$: {
		_style.border =
			border || focus
				? `2px solid ${
						error ? errorColor : filled ? filledColor : _harmony[depth][status].borderColor
					}`
				: '2px solid transparent';
	}

	$: _style.borderColor = error ? errorColor : _harmony[depth][status].borderColor;
	$: _style.borderColor = filled ? filledColor : _harmony[depth][status].borderColor;
	$: exec(() => {
		if (focus) {
			wait(25).then(() => {
				eleRoot?.focus();
			});
		}
	});
</script>

<div
	class="root"
	data-input
	data-size={attr(size)}
	data-isborder={attr(border)}
	data-fit={attr(fit)}
	data-error={attr(error)}
	data-filled={attr(filled)}
	style={css(_style)}
	on:keydown|capture|stopPropagation
	on:click={() => {
		eleRoot?.focus();
	}}
	on:keydown={() => {}}
>
	<!-- left icon -->

	<!-- input -->
	{#if type === 'text'}
		<input
			type="text"
			{placeholder}
			bind:this={eleRoot}
			bind:value
			on:focus={() => {
				focus = true;
				error || filled ? status : (status = Palette.Action.ACTIVE);
				dispatch('focus');
			}}
			on:blur={() => (
				dispatch('submit', value),
				(focus = false),
				error || filled ? status : (status = Palette.Action.BASE)
			)}
			on:keyup={(key) => {
				debounce();
				dispatch('change', value);
				key.code === 'Enter' && dispatch('submit', value);
			}}
			on:keydown|stopPropagation
		/>
	{:else if type === 'number'}
		<input
			type="number"
			{placeholder}
			bind:this={eleRoot}
			bind:value
			on:focus={() => {
				focus = true;
				error || filled ? status : (status = Palette.Action.ACTIVE);
				dispatch('focus');
			}}
			on:blur={() => (
				dispatch('submit', value),
				(focus = false),
				error || filled ? status : (status = Palette.Action.BASE)
			)}
			on:keyup={(key) => {
				debounce();
				dispatch('change', value);
				key.code === 'Enter' && dispatch('submit', value);
			}}
		/>
	{:else if type === 'password'}
		<input
			type="password"
			{placeholder}
			bind:this={eleRoot}
			bind:value
			on:focus={() => {
				focus = true;
				error || filled ? status : (status = Palette.Action.ACTIVE);
				dispatch('focus');
			}}
			on:blur={() => (
				dispatch('submit', value),
				(focus = false),
				error || filled ? status : (status = Palette.Action.BASE)
			)}
			on:keyup={(key) => {
				debounce();
				dispatch('change', value);
				key.code === 'Enter' && dispatch('submit', value);
			}}
		/>
	{/if}
</div>

<style lang="scss">
	.root {
		display: flex;
		justify-content: start;
		align-items: center;
		width: 100%;
		min-width: 1rem;
		min-height: fit-content;
		overflow: hidden;

		border-radius: 0.3rem;
		font-weight: 600;
		cursor: text;

		// size
		&[data-size='xs'] {
			min-height: $component-height-xs;
			max-width: 10rem;
			font-size: $component-font-size-xs;
		}
		&[data-size='sm'] {
			min-height: $component-height-sm;
			max-width: 15rem;
			font-size: $component-font-size-xs;
		}
		&[data-size='md'] {
			min-height: $component-height-md;
			max-width: 20rem;
			font-size: $component-font-size-sm;
		}
		&[data-size='lg'] {
			min-height: $component-height-lg;
			max-width: 30rem;
			font-size: $component-font-size-md;
		}
		&[data-size='xl'] {
			min-height: $component-height-xl;
			max-width: 45rem;
			font-size: $component-font-size-lg;
		}

		// border
		// &[data-isborder] {
		// 	border: 1px solid;
		// }

		//fit
		&[data-fit] {
			max-width: 100%;
		}

		input {
			background-color: transparent;
			border: none;
			outline: none;
			line-height: 1.5;

			font: inherit;
			color: inherit;
			width: calc(100% + 4px);
			height: calc(100% + 4px);
			text-indent: 0.4rem;

			&:active,
			&:focus {
				border: none;
				outline: none;
			}
			&::placeholder {
				color: inherit;
				opacity: 0.5;
				font: inherit;
			}
		}

		.button-icon {
			transform: scale(0.8);
			color: inherit;
		}
	}
</style>
