<script lang="ts">
	import { __CompanyListDetailModal } from './store';
	import { Modal } from '@src/components-global/modal';
	import { API } from '@src/lib/api';
	import { exec } from '@src/util/util.function';
	import { BaseModal, ModalPosition } from '@src/components/basemodal';
	import { CardContentAccentArea } from '@src/components/content';
	import { CardModal } from '@src/components/card/modal/index';
	import { SectionDivider } from '@src/components/section';
	import { Screen, screen } from '@src/store/env';
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo, TypoTextWithIcon } from '@src/components/typo';
	import { ValueRow } from '@src/components/value-row';
	import { FieldGrid } from '@src/components/field';
	import { IconPropType } from '@src/util/icon';
	import { ComponentSizeProps } from '@src/util/component';

	let { openStatus, data } = __CompanyListDetailModal;

	$: asyncCompanyDetailData = exec(async () => {
		if ($data) {
			return await API.Company.getCompanyDetails({ companyId: $data.data.company_id });
		}
	});
	$: headerWidth = 10;
</script>

<BaseModal
	modalPosition={Screen.responsive($screen, {
		xs: ModalPosition.BOTTOM,
		sm: ModalPosition.CENTER
	})}
	width={Screen.responsive($screen, {
		xs: '100%',
		sm: '39rem'
	})}
	height={Screen.responsive($screen, {
		xs: '100%',
		sm: '41rem'
	})}
	bind:active={$openStatus}
>
	<CardModal
		titleSize={2}
		title="Company Detail"
		padding="0.5rem"
		closeListener={() => Modal.CompanyListDetailModal.close()}
		scrollShade={300}
		containerHeight={'100%'}
	>
		<CardContentAccentArea disableArea height="100%" style={{ padding: '0 0.8rem' }}>
			<ContainerGrid style={{ paddingBottom: '1rem' }}>
				<SectionDivider height={0.1} line />
			</ContainerGrid>
			{#await asyncCompanyDetailData}
				<div>Loading...</div>
			{:then companyDetailData}
				<ContainerGrid style={{ paddingBottom: '0.5rem' }}>
					<BCTypo.TextWithIcon
						icon={{
							type: IconPropType.IMAGE,
							src: companyDetailData.company_logo || '/assets/icons/default_logo.png'
						}}
						iconComponentSize={ComponentSizeProps.LG}
						prop={{ h: 4 }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text={companyDetailData.company_name || '-'}
					/>
				</ContainerGrid>
				<CardContentAccentArea border contentStyle={{ padding: '0 0.6rem' }} height="fit-content">
					<FieldGrid gap="0rem" full>
						<ContainerGrid style={{ paddingBottom: '0.2rem' }}>
							<FieldGrid gap={0.3}>
								<ValueRow
									{headerWidth}
									titleSans
									name="Industry Type"
									styleRoot={{ alignItems: 'center' }}
									value={companyDetailData.industry_type.join(', ') || '-'}
									titleProp={{ h: 5, mid: true }}
									textProp={{
										h: 5,
										bold: true
									}}
									paint={{
										harmonyName: 'base',
										harmonyShade: 2300
									}}
								/>
								<ValueRow
									{headerWidth}
									titleSans
									name="Position"
									styleRoot={{ alignItems: 'center' }}
									titleProp={{ h: 5, mid: true }}
									textProp={{
										h: 5,
										bold: true
									}}
									paint={{
										harmonyName: 'base',
										harmonyShade: 2300
									}}
								>
									{#if companyDetailData.position && companyDetailData.position.length > 0}
										{#each companyDetailData.position as pos}
											<BCTypo.Text
												prop={{ h: 5, bold: true }}
												paint={{ harmonyName: 'base', harmonyShade: 2300 }}
												text={pos.name}
											/>
										{/each}
									{:else}
										<BCTypo.Text
											prop={{ h: 5, bold: true }}
											paint={{ harmonyName: 'base', harmonyShade: 2300 }}
											text={'-'}
										/>
									{/if}
								</ValueRow>
							</FieldGrid>
						</ContainerGrid>
					</FieldGrid>
				</CardContentAccentArea>
			{/await}
		</CardContentAccentArea>
	</CardModal>
</BaseModal>
