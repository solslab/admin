<script lang="ts">
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon/index';
	import { IconPropType } from '@src/components/icon';
	import { Link } from '@src/components/link';
	import { SectionDivider } from '@src/components/section';
	import { TypoText } from '@src/components/typo';
	import { BCUnit } from '@src/components/unit/index';
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid } from '@src/components/field';
	import { DefIcons } from '@src/icons/defines/index';
	import { ComponentSizeProps } from '@src/util/component/index';
	import { attr } from '@src/util/style';
	import { onMountBrowser } from '@src/util/svelte';
	import { wait } from '@src/util/util.time';
	import {  NavGroup, NavGroups } from '.';
	import { openDrawer } from '../store';
	import { createNavigationProps } from './navigation';

	let eleList: HTMLDivElement;
	let activeExplorer: boolean = false;
	let hover: boolean = false;

	$: navProps = createNavigationProps();
	$: activeExplorer && eleList.scrollTo({ top: 0, behavior: 'smooth' });

	onMountBrowser(async () => {
		await wait(1000);
	});
</script>

<div class="root" data-open={$openDrawer}>
	<div class="logo-field">
		<div class="link">
			<Link href="/" width="100%">
				<div class="link-item">
					<FieldGrid column="2.7rem 1fr">
						<ContainerGrid style={{ padding: '0.5rem 0 0.5rem 1.3rem' }}>
							<BCUnit.Image src="/assets/icons/solslab.png" />
						</ContainerGrid>

						{#if $openDrawer}
							<ContainerGrid flexAlignCenter>
								<TypoText
									h={5}
									style={{
										padding: '0.15rem 0 0 0.8rem',
										letterSpacing: '0.1rem'
									}}
								color="var(--hq-base-2300)">SOLSLAB</TypoText
								>
							</ContainerGrid>
						{/if}
					</FieldGrid>
				</div>
			</Link>
		</div>
	</div>

	<div class="nav-list" data-hidden={attr(activeExplorer)} bind:this={eleList}>

		<NavGroups groups={navProps.groups}>
			<NavGroup
				slot="forwards"
				group={{
					path: '/',
				 	items: [
				{
					title: 'Portfolio',
					icon: { ...DefIcons.Common.All, scale: 1 },
					link: 'wallet/portfolio',
					outbound: false,
				},
			],
					icon: { src: '', type: IconPropType.PATH },
					title: 'Explorer'
				}}
			>
			</NavGroup>
		</NavGroups>
	</div>


	<SectionDivider line height={0} />
	<div class="nav-footer-item">
		<FieldGrid column=" {$openDrawer ? '1fr' : 'auto'} auto">
			<ContainerGrid />
			<ContainerGrid flexAlignCenter>
				<ButtonIcon
					ghost
					style={{ marginRight: '0.3rem' }}
					size={ComponentSizeProps.SM}
					icon={{
						...($openDrawer ? DefIcons.Common.LeftCheveron : DefIcons.Common.RightCheveron),
						scale: 0.8
					}}
					borderRadius={ButtonIconBorderRadiusProps.MEDIUM}
					on:click={() => ($openDrawer = !$openDrawer)}
				/>
			</ContainerGrid>
		</FieldGrid>
	</div>
</div>

<style lang="scss">

	.root {
		width: $drawer-max-width;
		height: 100%;
		border-right: solid 1px var(--hq-transparent-inverse-0300);
		white-space: nowrap;
		overflow: hidden;
		background: var(--hq-base-0200);

		&[data-open='false'] {
			width: $drawer-min-width;
			.logo-field {
				.image {
					height: 100%;
					width: 2.9rem;
				}
			}
			.nav-list {
				max-height: calc(100% - $frame-header-height - 3rem);
			}
		}

		@include screen-sm() {
			display: none;
		}
		.logo-field {
			height: $frame-header-height;
			display: flex;
			border-bottom: solid 1px var(--hq-transparent-inverse-0300);
			align-items: center;
			.link {
				display: flex;
				flex: 1 0;
				height: 100%;
				.link-item {
					height: 100%;
					display: flex;
					align-items: center;

					.image {
						height: 100%;
						width: 2.9rem;
						background-image: url('/assets/icons/cosmostation.png');
						background-size: 1.3rem;

						background-repeat: no-repeat;
						background-position: center right;
						display: flex;
						align-items: center;
						justify-content: center;
						padding-left: 0.9rem;
						padding-right: 1rem;
					}
				}
			}
		}

		.drawer-icon {
			height: 1.3rem;
			display: flex;
			align-items: center;
			opacity: 0.8;
			border-right: none;
			margin-right: 0.5rem;
			justify-content: center;
			width: 1.5rem;
			border-radius: 0.3rem;
			padding-left: 0.3rem;
			background: var(--component-base02);
			// background: var(--overlay-2x);
			transition: background-color 0.2s;
			&:hover {
				background: var(--overlay-3x);
			}
		}
		.nav-list {
			position: relative;
			height: 100%;
			max-height: calc(100% - $frame-header-height - 3rem );
			flex-direction: column;
			@include scrollbar-hidden(transparent);
			overflow-y: auto;
			overflow-x: hidden;
			padding: 0.2rem 0rem 1rem;
			&[data-hidden] {
				overflow-y: hidden;
			}
			.spacer {
				flex: 1 0;
			}
			.image-field {
				padding: 0 1rem;

				.image {
					transition: transform 0.3s ease-in-out;
					&[data-hover] {
						cursor: pointer;
						transform: scale(1.05);
					}
				}
			}
		}

		.nav-footer-item {
			width: 100%;
			display: flex;
			height: 3rem;
			align-items: center;
			justify-content: center;
			padding: 0 0.5rem;
			.item {
				height: 2rem;
				width: 100%;
				background: var(--hq-lavender-purple-1300);
				border-radius: 0.3rem;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				cursor: pointer;

				&:hover {
					background: var(--hq-lavender-purple-1500);
				}
				.icon {
					max-width: 1.5rem;
				}
			}
		}
	}
</style>
