<script lang="ts">
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo, TypoTextWithIcon } from '@src/components/typo';
	import { ClickableListItem } from '@src/components/clickable-list-item';
	import { IconPropType } from '@src/util/icon';
	import { FieldGrid } from '@src/components/field';
	import { Modal } from '@src/components-global/modal';
	import { SectionDivider } from '@src/components/section';
	import { ComponentSizeProps } from '@src/util/component';

	export let company: {
		company_id: string;
		company_logo: string | null;
		company_name: string;
		industry_type: string[]; // 산업 유형 배열
	};

	// industry_type이 undefined나 null이면 빈 배열로 처리
	const industryTypes = (company.industry_type || []).join(', ');

	$: console.log(company);
</script>

<ClickableListItem
	padding="0.5rem"
	dark
	style={{
		border: 'solid 1px var(--hq-base-0400)',
		borderRadius: '0.3rem'
	}}
	on:click={() => Modal.CompanyListDetailModal.set({ data: company }).open()}
>
	<FieldGrid>
		<ContainerGrid>
			<FieldGrid column="1fr auto" gap={0.2}>
				<ContainerGrid flexAlignCenter>
					<BCTypo.TextWithIcon
						icon={{
							type: IconPropType.IMAGE,
							src: company.company_logo || '/assets/icons/default_logo.png'
						}}
						iconComponentSize={ComponentSizeProps.LG}
						prop={{ h: 4 }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text={company.company_name || '-'}
					/>
				</ContainerGrid>
			</FieldGrid>
			<ContainerGrid style={{ padding: '0 0.5rem' }}>
				<SectionDivider line height={1} />
				<FieldGrid column="1fr auto">
					<ContainerGrid>
						<FieldGrid>
							<BCTypo.Text
								prop={{
									h: 4,
									mid: true
								}}
								text="ID"
								paint={{
									harmonyName: 'base',
									harmonyShade: 1500
								}}
							/>
						</FieldGrid>
					</ContainerGrid>
					<ContainerGrid>
						<FieldGrid>
							<BCTypo.Text
								prop={{
									h: 4,
									mid: true
								}}
								text={company.company_id}
								paint={{
									harmonyName: 'base',
									harmonyShade: 1500
								}}
							/>
						</FieldGrid>
					</ContainerGrid>
				</FieldGrid>
				<SectionDivider height={0.2} />
				<FieldGrid column="1fr auto">
					<ContainerGrid>
						<FieldGrid>
							<BCTypo.Text
								prop={{
									h: 4,
									mid: true
								}}
								text="Type"
								paint={{
									harmonyName: 'base',
									harmonyShade: 1500
								}}
							/>
						</FieldGrid>
					</ContainerGrid>
					<ContainerGrid>
						<FieldGrid>
							<BCTypo.Text
								prop={{
									h: 4,
									mid: true
								}}
								text={industryTypes || '-'}
								paint={{
									harmonyName: 'base',
									harmonyShade: 1500
								}}
							/>
						</FieldGrid>
					</ContainerGrid>
				</FieldGrid>
			</ContainerGrid>
		</ContainerGrid>
	</FieldGrid>
</ClickableListItem>
