<script lang="ts">
	import { ContainerGrid } from '@src/components/container';
	import { BCTypo, TypoTextWithIcon } from '@src/components/typo';
	import { ClickableListItem } from '@src/components/clickable-list-item';
	import { IconPropType } from '@src/util/icon';
	import { FieldGrid } from '@src/components/field';
	import { Modal } from '@src/components-global/modal';
	import { SectionDivider } from '@src/components/section';
	import { ComponentSizeProps } from '@src/util/component';
	import { ButtonIcon } from '@src/components/buttonicon';
	import { gotoInHouse } from '@src/components/link/index.svelte';
	import { mdiDelete } from '@mdi/js';
	import { API } from '@src/lib/api';
	import { createEventDispatcher } from 'svelte';

	export let company: {
		company_id: string;
		company_logo: string | null;
		company_name: string;
		industry_type: string[]; // 산업 유형 배열
	};

	const dispatch = createEventDispatcher();

	// industry_type이 undefined나 null이면 빈 배열로 처리
	const industryTypes = (company.industry_type || []).join(', ');

	// 회사 삭제 함수
	async function deleteCompany(companyId: string) {
		if (confirm('삭제하시겠습니까?')) {
			await API.Company.deleteCompany({ companyId: companyId });
			alert('삭제되었습니다.');
			dispatch('companyDeleted'); // Dispatch an event to notify the parent
		}
	}
</script>

<ClickableListItem
	padding="0.5rem"
	dark
	style={{
		border: 'solid 1px var(--hq-base-0400)',
		borderRadius: '0.3rem'
	}}
	on:click={(event) => gotoInHouse(`/company/manage/${company.company_id}`, event)}
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
						iconBorderRadius="0.25rem"
						prop={{ h: 4 }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text={company.company_name || '-'}
					/>
				</ContainerGrid>
				<div on:click|stopPropagation on:keydown>
					<ContainerGrid>
						<ButtonIcon
							icon={{
								type: IconPropType.PATH,
								src: mdiDelete,
								scale: 1.2
							}}
							size={ComponentSizeProps.SM}
							ghost
							on:click={async () => await deleteCompany(company.company_id)}
						/>
					</ContainerGrid>
				</div>
			</FieldGrid>
			<ContainerGrid style={{ padding: '0 0.5rem' }}>
				<SectionDivider line height={1} />
				<SectionDivider height={0.5} />
			</ContainerGrid>
		</ContainerGrid>
	</FieldGrid>
</ClickableListItem>
