<script lang="ts">
	type T = $$Generic;

	import { clickOutside } from '@src/util/actions/clickOutside';
	import { attr } from '@src/util/style';
	import { DropdownItem } from './';

	export let items: DropdownItem<T>[] = [];
	export let selectedId: T;
	export let open: boolean = false;
	export let direction: 'top' | 'bottom' = 'top';

	let selectedItem: DropdownItem<T> | undefined = items.find((item) => item.id === selectedId);

	$: {
		selectedItem = items.find((item) => item.id === selectedId);
	}
</script>

<div
	data-dropdown
	class="root"
	use:clickOutside={{
		callback: () => {
			open = false;
		}
	}}
>
	<div
		class="button-field"
		on:keydown
		on:click={() => {
			open = !open;
		}}
	>
		<div class="text">
			{selectedItem?.text}
		</div>
		<div class="icon">
			<!-- <PathIcon path={mdiMenuDown} /> -->
		</div>
	</div>
	<div class="drop-flag">
		<div class="drop-field" data-open={attr(open)} data-direction={direction}>
			{#if $$slots.default}
				{#each items as item}
					<div
						class="item"
						on:keydown
						data-selected={item.id === selectedId}
						on:click={() => {
							selectedId = item.id;
							open = !open;
						}}
					>
						<slot {item} />
					</div>
				{/each}
			{:else}
				{#each items as item}
					<div
						class="item"
						on:keydown
						on:click={() => {
							selectedId = item.id;
							open = !open;
						}}
					>
						{item.text}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.root {
		width: 100%;
		border: solid 1px var(--hq-base-0100);
		background: var(--hq-base-0200);
		border-radius: 4px;
		height: 36px;

		.button-field {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 0.72rem;
			font-weight: 600;
			padding: 0 0.3rem;
			border-radius: 0.3rem;
			border: solid 1px transparent;
			&:hover {
				background-color: var(--hq-base-0200);
				cursor: pointer;
			}
			.text {
				height: 100%;
				display: flex;

				align-items: center;
				@include text-ellipse();
			}
			.icon {
				// border-left: solid 1px var(--border-color);
				padding-left: 0.2rem;
			}
		}
		.drop-flag {
			width: 100%;
			position: relative;
		}
		.drop-field {
			width: 100%;
			position: relative;

			height: fit-content;
			max-height: 12rem;
			overflow-y: scroll;
			border: solid 1px var(--hq-base-0100);
			position: absolute;
			z-index: 200;
			background: var(--hq-base-0100);

			@include scrollbar-with-bg(var(--base01));
			opacity: 0;
			transition:
				opacity 0.2s,
				height 0.2s;
			top: 0.35rem;
			pointer-events: none;
			&[data-open] {
				opacity: 1;
				pointer-events: all;
			}
			&[data-direction='top'] {
				top: auto;
				bottom: 1.8rem;
			}
			.item {
				text-align: left;
				font-size: 0.72rem;
				padding: 0.5rem 0.4rem;
				border-top: dotted 1px var(--hq-base-0900);
				@include text-ellipse();
			}
		}
	}
</style>
