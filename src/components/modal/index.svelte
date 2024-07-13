<script lang="ts">
	import type { CSSProperties } from '@src/util/style';

	import { mdiClose } from '@mdi/js';
	import { Util } from '@src/util';
	import { clickOutside } from '@src/util/actions/clickOutside';
	import { attr, css, getStyleStringUnit } from '@src/util/style';
	import { wait } from '@src/util/time';
	import { ModalPosition } from '.';
	import { ContainerGrid } from '../container';
	import { Icon, IconPropType } from '../icon';
	import { Portal } from '../portal';

	export let position: ModalPosition = ModalPosition.CENTER;
	export let active: boolean = true;
	export let height: number | string = '';
	export let width: number | string = '';

	let _width: number | string;
	let _height: number | string;
	let _contentStyle: CSSProperties = {};
	let _visible = false;
	let _active = false;

	switch (position) {
		case ModalPosition.BOTTOM:
			_width = '100%';
			_height = 'fit-content';
			break;

		case ModalPosition.CENTER:
			_width = '640px';
			_height = '640px';
			break;
	}

	$: _contentStyle = {
		width: getStyleStringUnit(width || _width),
		height: getStyleStringUnit(height || _height)
	};
	$: rootPortal = document.querySelector('.root-portal');

	$: Util.exec(async () => {
		if (active) {
			_visible = active;
			await wait();
			_active = _visible;
		} else if (!active) {
			_active = active;
			await wait(300);
			_visible = active;
		}
	});
</script>

{#if _visible}
	<Portal>
		<div class="root" data-active={attr(_active)}>
			<div
				class="content"
				style={css(_contentStyle)}
				data-position={position}
				use:clickOutside={{
					callback: () => (active = false),
					rootNode: rootPortal
				}}
			>
				<div class="close-btn" on:click={() => (active = false)}>
					<ContainerGrid>
						<Icon
							icon={{
								type: IconPropType.PATH,
								src: mdiClose,
								scale: 0.78
							}}
							paint={{ harmonyName: 'base', harmonyShade: 1000 }}
						></Icon>
					</ContainerGrid>
				</div>
				<slot />
			</div>
		</div>
	</Portal>
{/if}

<style lang="scss">
	.root {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1000;
		width: 100%;
		height: 100%;
		background-color: transparent;
		backdrop-filter: blur(0px);
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background-color 0.25s,
			backdrop-filter 0.25s;

		.content {
			opacity: 0;

			&[data-position='bottom'] {
				transition:
					bottom 0.3s,
					opacity 0.5s;
				position: absolute;
				bottom: -80px;
			}

			&[data-position='center'] {
				transform: scale(0.9);
				transition:
					transform 0.15s,
					opacity 0.2s;
			}

			.close-btn {
				z-index: 10;
				cursor: pointer;
				width: fit-content;
				height: fit-content;
				position: absolute;
				top: 20px;
				right: 20px;
			}
		}

		&[data-active] {
			background-color: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(3px);

			.content {
				opacity: 1;
				transform: scale(1);

				&[data-position='bottom'] {
					bottom: 0;
				}
			}
		}
	}
</style>
