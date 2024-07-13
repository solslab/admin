<script lang="ts" context="module">
	export let onClick: (() => void) | undefined = undefined;
	export interface LinkProp {
		href: string;
		outbound?: boolean;
	}
	export function gotoInHouseReplace(href: string) {
		goto(href, { keepFocus: true, replaceState: true });
	}

	export async function gotoInHouseKeepRoute(href: string, evt?: MouseEvent) {
		const target = href;
		const current = window.location.pathname + window.location.search;

		onClick && onClick();
		if (Format.removeEndSlash(target) === Format.removeEndSlash(current)) {
			return;
		}

		goto(href, { keepFocus: true });
		evt && (evt.preventDefault(), evt.stopPropagation());
	}

	export async function gotoInHouse(href: string, evt?: MouseEvent) {
		const target = href;
		const current = window.location.pathname + window.location.search;

		onClick && onClick();

		if (Format.removeEndSlash(target) === Format.removeEndSlash(current)) {
			return;
		}
		// setGlobalPending(true);
		// await wait(200);

		goto(href, { keepFocus: true });

		evt && (evt.preventDefault(), evt.stopPropagation());
	}

	export function gotoOutbound(href: string, evt?: MouseEvent) {
		const target = href;
		const current = window.location.pathname + window.location.search;
		onClick && onClick();

		window.open(target, '_blank');
		evt && (evt.preventDefault(), evt.stopPropagation());
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { Format } from '@src/util/format';
	export let classes: string = '';
	export let href: string | undefined = undefined;
	export let outbound: boolean = false;
	export let ellipse: boolean = false;
	export let width: string | undefined = undefined;
	export let disable: boolean = false;
	export let onClick: (e: MouseEvent) => void = () => {};
</script>

{#if href}
	<a
		class={classes}
		data-ellipse={ellipse}
		data-disable={!href || disable}
		style={`${width ? `width: ${width};` : ''}`}
		{href}
		on:click|preventDefault|stopPropagation={(evt) => {
			evt.stopImmediatePropagation();
			if (!href || disable) {
				return;
			}
			if (!outbound) {
				gotoInHouse(href, evt);
			} else {
				window.open(href, '_blank');
			}
			onClick(evt);
		}}
	>
		<slot />
	</a>
{:else}
	<slot />
{/if}

<style lang="scss">
	a {
		text-decoration: none;
		color: inherit;
		&[data-ellipse='true'] {
			@include text-ellipse();
		}
		&[data-disable='true'] {
			cursor: not-allowed;
		}
	}
	a:visited {
		color: inherit;
	}
</style>
