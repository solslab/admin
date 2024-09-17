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
	import { ComponentSizeProps } from '@src/util/component';
	import { BaseModal } from '@src/components/basemodal';

	export let active: boolean;
	export let positionName = '';
	export let supportLanguages = '';
	export let testTime = '';
	export let problemInfo = '';
	export let permitIDE = '';
	export let permitSearch = '';
	export let hiddenCase = '';
	export let examMode = '';
	export let testPlace = '';
	export let note = '';

	export let createPosition: () => void;

	function closeModal() {
		active = false;
	}

	// Toggle helper function
	function toggleOption(option: string, value: string) {
		return option === value ? '' : value; // If already selected, deselect; otherwise, select
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
						<BCTypo.Text text="직무 생성" prop={{ bold: true, h: 4 }} />
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
				<FieldGrid column="1fr 1fr" gap={1}>
					<!-- Position Name -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="시험 정보" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="시험정보 입력"
								width="100%"
								bind:value={positionName}
							/>
						</FieldFlex>
					</ContainerGrid>

					<!-- Support Languages -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="지원언어" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="지원 언어 입력"
								width="100%"
								bind:value={supportLanguages}
							/>
						</FieldFlex>
					</ContainerGrid>

					<!-- Test Time -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="시험시간" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="시험시간 입력"
								width="100%"
								bind:value={testTime}
							/>
						</FieldFlex>
					</ContainerGrid>

					<!-- Problem Info -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="문제유형 / 문제 수" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="문제 정보 입력"
								width="100%"
								bind:value={problemInfo}
							/>
						</FieldFlex>
					</ContainerGrid>

					<!-- Permit IDE -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="IDE 허용여부" prop={{ bold: true }} />
							<FieldFlex direction="row" gap={0.5} full>
								<Button
									size="sm"
									selected={permitIDE === '가능'}
									on:click={() => (permitIDE = toggleOption(permitIDE, '가능'))}
									style={{ flex: '1' }}
								>
									가능
								</Button>
								<Button
									size="sm"
									selected={permitIDE === '불가능'}
									on:click={() => (permitIDE = toggleOption(permitIDE, '불가능'))}
									style={{ flex: '1' }}
								>
									불가능
								</Button>
							</FieldFlex>
						</FieldFlex>
					</ContainerGrid>

					<!-- Permit Search -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="구글링 허용여부" prop={{ bold: true }} />
							<FieldFlex direction="row" gap={0.5} full>
								<Button
									size="sm"
									selected={permitSearch === '가능'}
									on:click={() => (permitSearch = toggleOption(permitSearch, '가능'))}
									style={{ flex: '1' }}
								>
									가능
								</Button>
								<Button
									size="sm"
									selected={permitSearch === '불가능'}
									on:click={() => (permitSearch = toggleOption(permitSearch, '불가능'))}
									style={{ flex: '1' }}
								>
									불가능
								</Button>
							</FieldFlex>
						</FieldFlex>
					</ContainerGrid>

					<!-- Hidden Case -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="히든케이스 존재여부" prop={{ bold: true }} />
							<FieldFlex direction="row" gap={0.5} full>
								<Button
									selected={hiddenCase === '있음'}
									on:click={() => (hiddenCase = toggleOption(hiddenCase, '있음'))}
									style={{ flex: '1' }}
								>
									있음
								</Button>
								<Button
									selected={hiddenCase === '없음'}
									on:click={() => (hiddenCase = toggleOption(hiddenCase, '없음'))}
									style={{ flex: '1' }}
								>
									없음
								</Button>
							</FieldFlex>
						</FieldFlex>
					</ContainerGrid>

					<!-- Exam Mode -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="시험방식" prop={{ bold: true }} />
							<FieldFlex direction="row" gap={0.5} full>
								<Button
									selected={examMode === '대면'}
									on:click={() => (examMode = toggleOption(examMode, '대면'))}
									style={{ flex: '1' }}
								>
									대면
								</Button>
								<Button
									selected={examMode === '비대면'}
									on:click={() => (examMode = toggleOption(examMode, '비대면'))}
									style={{ flex: '1' }}
								>
									비대면
								</Button>
							</FieldFlex>
						</FieldFlex>
					</ContainerGrid>

					<!-- Test Place -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="시험장소 / 플랫폼" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="시험장소 입력"
								width="100%"
								bind:value={testPlace}
							/>
						</FieldFlex>
					</ContainerGrid>

					<!-- Note -->
					<ContainerGrid>
						<FieldFlex direction="column" gap={0.5}>
							<BCTypo.Text text="참고사항" prop={{ bold: true }} />
							<Input
								type="text"
								size={ComponentSizeProps.MD}
								placeholder="참고사항 입력"
								width="100%"
								bind:value={note}
							/>
						</FieldFlex>
					</ContainerGrid>
				</FieldGrid>

				<ContainerGrid style={{ paddingTop: '1rem' }}>
					<Button on:click={createPosition}>Create Test Information</Button>
				</ContainerGrid>
			</CardContentAccentArea>
		</FieldGrid>
	</CardContentAccentArea>
</BaseModal>
