<script lang="ts">
	import { CSSProperties, attr, css } from '@src/util/style';

	let mouseHover: boolean = false;
	let mouseDown: boolean = false;

	export let padding: string | undefined = '0.6rem 1.2rem 0.6rem';
	export let style: CSSProperties = {};
	export let zebra: boolean = false;
	export let dark: boolean = false;
</script>

<div
	class="w-p-i"
	data-zebra={attr(zebra)}
	data-dark={attr(dark)}
	on:click
	on:keydown
	on:mouseenter={() => (mouseHover = true)}
	on:mouseleave={() => ((mouseHover = false), (mouseDown = false))}
	on:mouseover={() => (mouseHover = true)}
	on:mouseout={() => ((mouseHover = false), (mouseDown = false))}
	on:focus={() => (mouseHover = true)}
	on:blur={() => ((mouseHover = false), (mouseDown = false))}
	on:mousedown={() => (mouseDown = true)}
	on:mouseup={() => (mouseDown = false)}
	style={css({ padding }, style)}
>
	<div class="container">
		<slot {mouseHover} {mouseDown} />
	</div>
</div>

<style lang="scss">
	.w-p-i {
		border-top: solid 1px var(--hq-transparent-inverse-0300);
		cursor: pointer;

		padding: 0.6rem 1.2rem 0.8rem;
		transition: background-color 0.15s;
		position: relative;
		background-color: var(--hq-base-0300);
		&:hover {
			cursor: pointer;
			background: var(--hq-transparent-inverse-0200);
		}
		&[data-dark='true'] {
			background-color: var(--hq-base-0200);
			&:hover {
				background-color: var(--hq-base-0300);
			}
		}

		&[data-zebra] {
			&:nth-child(odd) {
				&::before {
					content: '';
					background-color: var(--hq-transparent-inverse-0100);
					z-index: 0;
					opacity: 0.6;
					pointer-events: none;
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
				}
			}
		}
	}
</style>
