<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from '@src/components/icon';
	import { Link } from '@src/components/link';
	import { tip, TipPosition } from '@src/util/actions/tip';
	import { ComponentSizeProps } from '@src/util/component/index';
	import { Format } from '@src/util/format';
	import { IconPropType } from '@src/components/icon';
	import { attr } from '@src/util/style';
	import { onMountBrowser } from '@src/util/svelte';
	import { createEventDispatcher } from 'svelte';
	import { openDrawer } from '../../store';
	import { NavPropItem } from '../navigation';

	export let item: NavPropItem;
	export let root: boolean = false;
	export let parent: string | undefined = undefined;
	let { title, link, outbound, icon, tag } = item;

	const dispatch = createEventDispatcher<{ click: void }>();
	let titleKey: string;
	$: selected = Format.removeEndSlash($page.url.pathname).includes(link);

	$: {
		title = item.title;
		link = item.link;
		outbound = item.outbound;
		icon = item.icon;
		tag = item.tag;
		titleKey = title.toLowerCase();
	}

	let showTag: boolean = false;

	function updateTag() {
		const currentTime = Math.floor(Date.now() / 1000);
		showTag = !!tag?.enable && currentTime < (tag?.time ?? 0);
	}

	onMountBrowser(() => {
		updateTag();
	});

	$: lightImage = item.tag?.image?.light ?? '/assets/badge/new_light.png';
	$: darkImage = item.tag?.image?.dark ?? '/assets/badge/new_dark.png';
</script>

{#if $openDrawer}
	<div class="root" data-close-drawer={attr(!$openDrawer)} data-selected={attr(selected)}>
		<Link href={outbound ? link : '/' + link} {outbound} onClick={() => dispatch('click')}>
			<div class="nav-item" data-root={root}>
				<div class="icon">
					{#if icon}
						<Icon {icon} size={ComponentSizeProps.XS} />
					{/if}
				</div>
				<div class="text-open-active">{title}</div>
				{#if showTag && tag}
					<Icon
						icon={{
							type: IconPropType.IMAGE,
							src: lightImage
						}}
						size={ComponentSizeProps.MD}
					/>
				{/if}
			</div>
		</Link>
	</div>
{:else}
	<div
		class="root"
		data-close-drawer={attr(!$openDrawer)}
		use:tip={{
			html: parent ? parent + ' / ' + title : title,
			position: TipPosition.Right,
			enable: true
		}}
	>
		<Link href={'/' + link} {outbound} onClick={() => dispatch('click')}>
			<div class="nav-item" data-root={root}>
				<div class="icon">
					{#if icon}
						<Icon {icon} size={ComponentSizeProps.XS} />
					{/if}
				</div>
			</div>
		</Link>
	</div>
{/if}

<style lang="scss">
	.root {
		padding: 0 0.3rem;
		&[data-close-drawer] {
			.nav-item {
				padding-right: 0rem;
				justify-content: center;
			}
		}
		color: var(--hq-base-2300);
		&[data-selected] {
			position: relative;
			color: var(--hq-sapphire-blue-1700);
			.icon {
				opacity: 1;
			}
			&::after {
				content: '';
				position: absolute;
				left: 0px;
				height: 50%;
				top: 25%;
				width: 4px;
				background: var(--hq-sapphire-blue-1500);
			}
		}
	}
	.nav-item {
		border-radius: 0.3rem;
		position: relative;
		height: 2.1rem;
		display: flex;
		align-items: center;
		padding-right: 0.4rem;

		@include hover {
			background: var(--hq-transparent-inverse-0200) !important;
			opacity: 1;
		}

		.icon {
			min-width: 2rem;
			opacity: 0.6;
			display: flex;
			align-items: center;
			justify-content: center;

			transition: color 0.2s ease-in-out;
		}

		.text-open-active {
			padding-left: 0.5rem;
			flex: 1 0 1;
			margin-left: -0.4rem;
			font-weight: 600;
			transition: opacity 0.2s;
			font-size: 0.76rem;
		}
	}
</style>
