<script lang="ts">
	import { page } from '$app/stores';
	import { mdiChevronLeft, mdiCloseThick } from '@mdi/js';
	import { Palette } from '@src/util/color';
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon';
	import { IconPropType } from '@src/components/icon';
	import { TypoSub, TypoText, TypoTextWithIcon } from '@src/components/typo';
	import { BCUnit } from '@src/components/unit/index';
	import { ContainerFlex, ContainerGrid } from '@src/components/container';
	import { FieldFlex, FieldGrid } from '@src/components/field';
	import { ComponentSizeProps } from '@src/util/component';

	import { IconProp } from '@src/util/icon';
	import { Typo } from '@src/util/typo';
	import { CardContentAccentArea } from '@src/components/content/index';

	export let scrollShade: Palette.ShadeType = 200;
	export let title: string | number = '';
	export let description: string | undefined = undefined;
	export let titleSize: Typo.Size = 5;
	export let titleBold: boolean = false;
	export let subTitle: string | number = '';
	export let headerIcon: IconProp | undefined = undefined;
	export let containerHeight: string = '100%';
	export let headerIconPaint: Palette.Paint.Prop = {};
	export let backgroundHarmonyName: Palette.HarmonyNameType = 'base';
	export let disableShade: boolean = false;
	export let zIndex: number = 200;
	export let padding: string = '0';

	export let backListener: (() => void) | undefined = undefined;
	export let closeListener: (() => void) | undefined = undefined;
</script>

<CardContentAccentArea
	backgroundPaint={{ harmonyShade: 200, harmonyName: backgroundHarmonyName }}
	height={containerHeight}
	style={{ padding: padding, zIndex, position: 'relative' }}
>
	<FieldGrid row={description || $$slots.description ? 'auto auto auto 1fr' : 'auto auto 1fr'} full>
		<ContainerGrid
			style={{
				padding: '0.75rem 1rem 0.75rem 1rem'
			}}
			overflow="visible"
		>
			<FieldGrid column="1fr auto auto" gap="0.5">
				<ContainerGrid>
					<FieldFlex alignItems="center" full>
						<ContainerFlex>
							{#if backListener}
								<ButtonIcon
									ghost
									icon={{
										type: IconPropType.PATH,
										src: mdiChevronLeft,
										scale: 0.85
									}}
									size={ComponentSizeProps.SM}
									borderRadius={ButtonIconBorderRadiusProps.MEDIUM}
									style={{ marginRight: '0.4rem' }}
									on:click={backListener}
								/>
							{/if}
						</ContainerFlex>
						<ContainerFlex style={{ paddingTop: '0.1rem' }}>
							<TypoTextWithIcon
								h={titleSize}
								bold={titleBold}
								icon={headerIcon}
								iconScale={headerIcon?.scale ? headerIcon?.scale : 0.65}
								iconPaint={headerIconPaint}
								>{title}
								{#if subTitle}
									<TypoSub>{subTitle}</TypoSub>
								{/if}
							</TypoTextWithIcon>
						</ContainerFlex>
					</FieldFlex>
				</ContainerGrid>
				<ContainerGrid overflow="visible">
					<slot name="command" />
				</ContainerGrid>
				<ContainerGrid>
					{#if closeListener}
						<ButtonIcon
							ghost
							icon={{
								type: IconPropType.PATH,
								src: mdiCloseThick,
								scale: 1.2
							}}
							size={ComponentSizeProps.SM}
							style={{ paddingTop: '0.3rem' }}
							borderRadius={ButtonIconBorderRadiusProps.MEDIUM}
							on:click={closeListener}
						/>
					{/if}
				</ContainerGrid>
			</FieldGrid>
		</ContainerGrid>
		{#if description || $$slots.description}
			<ContainerGrid overflow="visible" style={{ padding: '0 1rem 0.5rem' }}>
				{#if description}
					<TypoText mid breakWord h={6} harmonyShade={1600}>{description}</TypoText>
				{/if}
				<slot name="description" />
			</ContainerGrid>
		{/if}
		<ContainerGrid>
			<slot name="content-header" />
		</ContainerGrid>
		<ContainerGrid full>
			<BCUnit.ScrollArea shade={scrollShade} {disableShade} maxHeight="80vh">
				<slot />
			</BCUnit.ScrollArea>
		</ContainerGrid>
	</FieldGrid>
</CardContentAccentArea>
