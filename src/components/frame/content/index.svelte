<script lang="ts">
	import { css, CSSProperties } from '@src/util/style';
	import { onDestroy, onMount } from 'svelte';
	import { openDrawer } from '../store';

	export let padding: string | undefined = undefined;
	export let backgroundColor: string | undefined = undefined;
	export let style: CSSProperties = {};
	export let styleContent: CSSProperties = {};

	export let backgroundImage: string | undefined = undefined;

	export let ele: HTMLDivElement | undefined = undefined;
	export let scrollTop: number = 0;
	export let disableFooter: boolean = false;

	$: {
		padding && (style.padding = padding);
		backgroundColor && (style.backgroundColor = backgroundColor);
	}

	function onScrollTop() {
		scrollTop = ele?.scrollTop || 0;
	}

	onMount(() => {
		ele?.addEventListener('scroll', onScrollTop);
	});
	onDestroy(() => {
		ele?.removeEventListener('scroll', onScrollTop);
	});
</script>

<div
	class="root"
	data-frame-content
	style={css(style)}
	data-open-drawer={$openDrawer}
	bind:this={ele}
>
	{#if backgroundImage}
		<div class="background-image" style={`background-image: url(${backgroundImage})`} />
	{/if}

	<div class="content-root" id="content-root" style={css(styleContent)}>
		<slot />
	</div>
</div>

<style lang="scss">
	.outer {
		position: absolute;
		background: #f0f;
		width: 100%;
		height: 100%;
	}
	.root {
		position: relative;
		height: 100%;
		background-color: var(--hq-base-0200);
		@include scrollbar-with-bg(var(--hq-base-0300));
		overflow-y: scroll;

		.content-root {
			z-index: 2;
			position: relative;
			width: 100%;
		}

		.background-image {
			pointer-events: none;
			position: absolute;
			height: 100%;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 1;
			background-position: right top;
			background-size: 40%;
			background-repeat: no-repeat;
			opacity: 0.2;
		}
	}
</style>
