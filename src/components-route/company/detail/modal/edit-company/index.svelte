<script lang="ts">
	import { ButtonIcon, ButtonIconBorderRadiusProps } from '@src/components/buttonicon';
	import { CardContentAccentArea } from '@src/components/content';
	import { ContainerGrid } from '@src/components/container';
	import { FieldFlex, FieldGrid } from '@src/components/field';
	import { Input } from '@src/components/input';
	import { SectionDivider } from '@src/components/section';
	import { BCTypo } from '@src/components/typo';
	import { IconPropType } from '@src/util/icon';
	import { mdiCloseThick } from '@mdi/js';
	import { Button } from '@src/components/button';
	import { Companies } from '@src/util/company';
	import { __Model } from '@src/lib/api/company/model';
	import { ComponentSizeProps } from '@src/util/component';
	import { BaseModal } from '@src/components/basemodal';

	export let active: boolean;
	export let companyName: string;
	export let searchTerms: string;
	export let industryTypes: Set<__Model.IndustryType>;
	export let toggleIndustryType: (type: __Model.IndustryType) => void;

	export let updateCompany: () => void;

	function closeModal() {
		active = false;
	}
</script>

<BaseModal bind:active height="34rem">
	<CardContentAccentArea
		style={{ padding: '1.5rem 1rem' }}
		backgroundPaint={{
			harmonyName: 'base',
			harmonyShade: 200
		}}
		overflow="scroll"
	>
		<FieldGrid row="auto 1fr" full gap={0.5}>
			<ContainerGrid style={{ padding: '0.5 0rem' }}>
				<FieldGrid column="1fr auto">
					<ContainerGrid>
						<BCTypo.Text text="회사 정보 수정" prop={{ bold: true, h: 4 }} />
					</ContainerGrid>
					<ContainerGrid>
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
							on:click={closeModal}
						/>
					</ContainerGrid>
				</FieldGrid>
				<ContainerGrid style={{ padding: '0.5rem 0rem' }}>
					<SectionDivider height={0.1} line lineColor="var(--hq-base-0400)" />
				</ContainerGrid>
			</ContainerGrid>
			<CardContentAccentArea border contentStyle={{ padding: '0 0.6rem' }} height="fit-content">
				<FieldGrid column="1fr" gap={1}>
					<!-- Company Name -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="회사 이름" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="회사 이름 입력"
								width="100%"
								bind:value={companyName}
							/>
						</FieldFlex>
					</ContainerGrid>

					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="검색어 추가" prop={{ bold: true }} />
							<Input
								type="text"
								bind:value={searchTerms}
								size={ComponentSizeProps.MD}
								placeholder="Enter Search Terms (comma separated)"
								width="100%"
							/>
						</FieldFlex>
					</ContainerGrid>

					<!-- Industry Types -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="업종" prop={{ bold: true }} />
							<FieldGrid gap={0.5} column="1fr 1fr 1fr">
								{#each Companies.industryOptions as type}
									<div
										class="industry-tag {industryTypes.has(type) ? 'selected' : ''}"
										on:click={() => toggleIndustryType(type)}
									>
										{type}
									</div>
								{/each}
							</FieldGrid>
						</FieldFlex>
					</ContainerGrid>
				</FieldGrid>

				<ContainerGrid style={{ paddingTop: '1rem' }}>
					<Button on:click={updateCompany}>Update Company</Button>
				</ContainerGrid>
			</CardContentAccentArea>
		</FieldGrid>
	</CardContentAccentArea>
</BaseModal>

<style lang="scss">
	.industry-tag {
		display: inline-block;
		padding: 0.4rem 0.8rem;
		border-radius: 0.25rem;
		background-color: var(--hq-base-0300);
		color: var(--hq-base-2300);
		cursor: pointer;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.industry-tag:hover {
		background-color: var(--hq-base-0400);
	}

	.industry-tag.selected {
		background-color: var(--hq-base-2300);
		color: var(--hq-light-0000);
	}
</style>
