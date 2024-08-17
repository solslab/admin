<script lang="ts">
	import { page } from '$app/stores';
	import { Palette } from '@src/util/color';
	import { PortalGlobal } from '@src/components-global/portal';
	import { clickOutside } from '@src/util/actions/clickOutside';
	import { keyDown } from '@src/util/actions/keyDown';
	import { attr, css, CSSProperties, getStyleStringUnit } from '@src/util/style';
	import { onDestroyBrowser } from '@src/util/svelte';
	import { wait } from '@src/util/util.time';
	import _ from 'lodash';
	import { ModalBackDrop, ModalBackdropBlur, ModalPosition } from '.';

	export let modalPosition: ModalPosition = ModalPosition.CENTER;
	export let background: ModalBackDrop = {
		blur: ModalBackdropBlur.NORMAL,
		background: 'rgba(10,18,19,0.55)'
	};
	export let active: boolean = false;

	let _active: boolean;
	let _visible: boolean;

	export let style: CSSProperties = {};
	export let styleBackground: CSSProperties = {};
	export let width: string | number | undefined = undefined;
	export let height: string | number | undefined = undefined;
	export let maxHeight: string | number | undefined = undefined;
	export let disableCloseOuter: boolean = false;
	export let disableRouteChangeClose: boolean = false;

	export let borderTopRightRadius: string = '0.6rem';
	export let borderTopLeftRadius: string = '0.6rem';

	let refModal: HTMLDivElement;

	let _width: string | undefined;
	let _height: string | undefined;

	switch (modalPosition) {
		case ModalPosition.RIGHT:
			_width = '25rem';
			_height = '100%';
			break;

		case ModalPosition.BOTTOM:
			_width = '100%';
			_height = '20rem';
			break;

		case ModalPosition.CENTER:
			_width = '30rem';
			_height = '30rem';
			break;
	}

	let _style: CSSProperties = _.cloneDeep(style);
	let _background: ModalBackDrop = _.cloneDeep(background);
	let _styleBackground: CSSProperties = _.cloneDeep(styleBackground);

	function execClose() {
		if (disableCloseOuter) {
			return;
		}
		active = false;
	}

	let enableWaitGuard = false;

	onDestroyBrowser(() => {
		if (active) {
			refModal.remove();
		}
		active = false;
	});
	let openLocation: string | undefined;

	$: {
		if (!disableRouteChangeClose) {
			if (active && openLocation === undefined) {
				openLocation = $page.url.href;
			}
			if ($page.url.href !== openLocation) {
				openLocation = $page.url.href;
				active = false;
			}
		}
	}

	$: {
		_style.width = width ? getStyleStringUnit(width) : _width;
		_style.height = height ? getStyleStringUnit(height) : _height;
		_style.maxHeight = maxHeight ? getStyleStringUnit(maxHeight) : undefined;

		_styleBackground.background = _background.background;
		modalPosition;

		if (active) {
			_visible = true;
			_active = false;
			enableWaitGuard = true;
			wait().then(() => (_active = true));
		} else {
			_active = false;
			wait(300).then(() => {
				!enableWaitGuard && (_visible = false);
				enableWaitGuard = false;
			});
		}
	}

	$: rootPortal = document.querySelector('.root-portal');
</script>

{#if _visible}
	<PortalGlobal>
		<div
			bind:this={refModal}
			data-base-modal
			class="root"
			data-active={_active}
			data-blur={attr(_background.blur)}
			data-background={attr(_background.background)}
			style={css(_styleBackground, { opacity: _active ? 1 : 0 })}
		>
			<div
				class="container"
				style={css(_style, {
					borderTopRightRadius,
					borderTopLeftRadius
				})}
				data-type={attr(modalPosition)}
				on:keydown
				on:click|stopPropagation
				use:clickOutside={{ callback: execClose, rootNode: rootPortal }}
				use:keyDown={{ callback: execClose, escape: true }}
			>
				<slot />
				<slot name="button" />
			</div>
		</div>
	</PortalGlobal>
{/if}

<style lang="scss">
	.root {
		overflow: hidden;
		pointer-events: none;
		left: 0;
		top: 0;
		position: fixed;
		z-index: 100000;
		height: 100%;
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
		$timing: 0.3s;
		transition:
			opacity 0.2s,
			backdrop-filter 0.2s;
		// animation: fadeOut 0.2s ease-in-out;
		opacity: 0;
		&[data-active='true'] {
			opacity: 1;
			pointer-events: all;
		}
		&[data-active='false'] {
			opacity: 0;
		}

		&[data-blur='none'] {
			backdrop-filter: blur(0);
		}
		&[data-blur='soft'] {
			backdrop-filter: blur(1px);
		}
		&[data-blur='normal'] {
			backdrop-filter: blur(2px);
		}
		&[data-blur='hard'] {
			backdrop-filter: blur(5px);
		}

		.container {
			position: relative;
			@include box-shadow-default(20px);
			z-index: 100000;

			&[data-type='right'] {
				height: 100%;
				right: 0;
				top: 0;
				position: fixed;
			}
			max-width: calc(100% - 8rem);
			max-height: calc(100% - 10rem);
			@include screen-xs() {
				max-width: 100%;
				max-height: 100%;
				border-top-right-radius: #{borderTopRightRadius};
				border-top-left-radius: #{borderTopLeftRadius};
				overflow: hidden;
			}

			&[data-type='bottom'] {
				width: 100%;
				bottom: 0rem;
				position: fixed;
			}

			&[data-type='center'] {
				width: 100%;
				position: fixed;
				// transform: scale(1);
			}
		}
		&[data-active] .container {
			&[data-type='right'] {
				animation: slideInRight $timing ease-in-out forwards;
			}

			&[data-type='bottom'] {
				animation: slideInUp $timing ease-in-out forwards;
			}

			&[data-type='center'] {
				animation: zoomIn06 $timing forwards;
			}
		}

		&[data-active='false'] .container {
			&[data-type='right'] {
				animation: slideOutRight $timing ease-in-out forwards;
			}

			&[data-type='bottom'] {
				animation: slideOutDown $timing ease-in-out forwards;
			}

			&[data-type='center'] {
				animation: zoomOut06 $timing forwards;
			}
		}
	}
</style>
