<script lang="ts">
	import { page } from '$app/stores';
	import { mdiChevronRight } from '@mdi/js';
	import { Icon, IconPropType } from '@src/components/icon';
	import { Link } from '@src/components/link';
	import { SectionDivider } from '@src/components/section';
	import { BCTypo } from '@src/components/typo';
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
	import { DefIcons } from '@src/icons/defines/index';
	import { ComponentSizeProps } from '@src/util/component/index';
	import { Enviroment } from '@src/util/enviroment';
	import { Format } from '@src/util/format';
	import { attr } from '@src/util/style';
	import { NavItem } from '..';
	import { openDrawer } from '../../store';
	import { NavPropGroup } from '../navigation';

	export let group: NavPropGroup;
	export let useTopDivider: boolean = false;
	let active: boolean = group.items ? true : false;

	$: selected = Format.removeEndSlash($page.url.pathname) === group.path;
</script>

{#if useTopDivider}
	<SectionDivider line height={0.6} paddingHorizontal="0" />
{/if}
<div
	class="nav-group"
	data-open={$openDrawer}
	data-active={active}
	data-primary={group.primary === undefined ? true : group.primary}
>
	<div class="header" on:keydown={() => {}} data-selected={attr(selected)}>
		<FieldGrid column="1fr 1.5rem" full>
			<Link href={group.path} outbound={false}>
				<ContainerGrid flexAlignCenter style={{ width: '100%', padding: '0.0rem 0.0rem' }}>
					<BCTypo.Text prop={{ h: 7 }} paint={{harmonyName:'base',harmonyShade:2300}} text={group.title.toUpperCase()} />
				</ContainerGrid>
			</Link>
			{#if group.items}
				<ContainerGrid flexAlignCenter>
					<div class="icon">
						<Icon
							onClick={() => (active = !active)}
							size={ComponentSizeProps.SM}
							icon={{
								...(active ? DefIcons.Common.UpCheveron : DefIcons.Common.DownCheveron),
								scale: 0.7
							}}
						/>
					</div>
				</ContainerGrid>
			{:else}
				<ContainerGrid flexAlignCenter>
					<div class="icon">
						<Icon
							size={ComponentSizeProps.SM}
							icon={{
								src: mdiChevronRight,
								type: IconPropType.PATH,
								scale: 0.7
							}}
							style={{ marginTop: '0.1rem' }}
						/>
					</div>
				</ContainerGrid>
			{/if}
		</FieldGrid>
	</div>
	{#if (group.items || []).length > 0}
		<div class="nav-group-content">
			{#each (group.items || []).filter((f) => (Enviroment.isDev ? true : !f.isOnlyDev)) as item}
				<NavItem {item} parent={group.title} />
			{/each}
		</div>
	{:else if !group.items && !$openDrawer}
		<NavItem
			item={{
				icon: group.icon,
				outbound: false,
				title: group.title,
				link: group.path.replace(/^\//, '')
			}}
			parent={group.title}
		/>
	{/if}
	{#if $$slots.default}
		<div class="nav-group-content">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.nav-group {
		overflow: hidden;
		padding-bottom: 0.3rem;

		&:first-child {
			border-top: none;
		}
		.nav-group-content {
			position: relative;
			z-index: 1;
		}
		.icon {
			margin-top: -0.2rem;
			opacity: 0.6;
			&:hover {
				opacity: 0.85;
			}
		}
		.header {
			padding: 0.2rem;
			display: flex;
			align-items: center;
			height: 0rem;
			opacity: 0;
			transition: height 0.2s, opacity 0.2s;
			color: var(--hq-base-1500);
			&:hover {
				color: var(--hq-base-2200);
				&[data-selected] {
					color: var(--hq-prussian-blue-1500);
				}
			}

			&[data-selected] {
				color: var(--hq-prussian-blue-1700);
			}

			.title {
				width: 100%;
				padding: 0.2rem 0.4rem 0.2rem 0.1rem;
				font-weight: 600;
				text-transform: uppercase;
			}
		}

		&[data-open='true'] {
			.header {
				padding: 0.6rem;
				height: 2.5rem;
				opacity: 1;
			}
		}
		&[data-active='false'][data-open='true'] {
			.nav-group-content {
				pointer-events: none;
			}
		}

		&[data-active='false'][data-open='true'] {
			height: 2.5rem !important;
		}

		border-radius: 0.3rem;

		@include hover {
			background: var(--hq-base-0300) !important;
			opacity: 1;
		}
		transition: height 0.2s, opacity 0.2s, color 0.2s, background-color 0.2s;
	}
</style>
