<script lang="ts">
	import { Icon } from '@src/components/icon';
	import { BCLayout } from '@src/components/layout';
	import { SectionDivider } from '@src/components/section';
	import { TypoText, BCTypo } from '@src/components/typo';
	import { CardContentAccentArea } from '@src/components/content/index';
	import { ContainerGrid } from '@src/components/container';
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { FrameContent } from '@src/components/frame';
	import { DefIcons } from '@src/icons/defines';
	import { Screen, screen } from '@src/store/env';
	import { ComponentSizeProps } from '@src/util/component';
	import { URL } from '@src/util/url';
</script>

<FrameContent>
	<BCLayout.ContentsCenter
		rootStyle={{
			paddingTop: Screen.responsive($screen, { md: '1.5rem', sm: '1rem' })
		}}
		transparent
		fit
	>
		<FieldGrid full row={'auto auto 1fr'} gap={0.5}>
			<ContainerGrid style={{ padding: '0' }}>
				<FieldFlex alignItems="center" gap={0.3}>
					<BCTypo.Text
						prop={{ h: 4, bold: true }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text="어드민 관리"
					/>
				</FieldFlex>
			</ContainerGrid>
		</FieldGrid>
		<CardContentAccentArea
			link={URL.member()}
			style={{ paddingLeft: '1.3rem' }}
			backgroundColor="var(--hq-base-0300)"
		>
			<FieldGrid column="1fr auto">
				<ContainerGrid>
					<BCTypo.Text
						prop={{ h: 5, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text="회원 관리"
					/>
					<BCTypo.Text
						prop={{ h: 7, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 1600 }}
						text="시원하게 합시다."
					/>
					<SectionDivider height={0.4} />
				</ContainerGrid>
				<ContainerGrid flexAlignCenter>
					<Icon icon={DefIcons.Common.RightCheveron} size={ComponentSizeProps.XS} />
				</ContainerGrid>
			</FieldGrid>
		</CardContentAccentArea>
		<SectionDivider height={0.5} />
		<CardContentAccentArea
			link={URL.company()}
			style={{ paddingLeft: '1.3rem' }}
			backgroundColor="var(--hq-base-0300)"
		>
			<FieldGrid column="1fr auto">
				<ContainerGrid>
					<BCTypo.Text
						prop={{ h: 5, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text="기업 관리"
					/>
					<BCTypo.Text
						prop={{ h: 7, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 1600 }}
						text="시원하게 합시다."
					/>
					<SectionDivider height={0.4} />
				</ContainerGrid>
				<ContainerGrid flexAlignCenter>
					<Icon icon={DefIcons.Common.RightCheveron} size={ComponentSizeProps.XS} />
				</ContainerGrid>
			</FieldGrid>
		</CardContentAccentArea>
		<SectionDivider height={0.5} />
		<CardContentAccentArea
			link={URL.testReview()}
			style={{ paddingLeft: '1.3rem' }}
			backgroundColor="var(--hq-base-0300)"
		>
			<FieldGrid column="1fr auto">
				<ContainerGrid>
					<BCTypo.Text
						prop={{ h: 5, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text="테스트 리뷰 관리"
					/>
					<BCTypo.Text
						prop={{ h: 7, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 1600 }}
						text="시원하게 합시다."
					/>
					<SectionDivider height={0.4} />
				</ContainerGrid>
				<ContainerGrid flexAlignCenter>
					<Icon icon={DefIcons.Common.RightCheveron} size={ComponentSizeProps.XS} />
				</ContainerGrid>
			</FieldGrid>
		</CardContentAccentArea>
		<SectionDivider height={0.5} />
		<CardContentAccentArea
			link={URL.suggestion()}
			style={{ paddingLeft: '1.3rem' }}
			backgroundColor="var(--hq-base-0300)"
		>
			<FieldGrid column="1fr auto">
				<ContainerGrid>
					<BCTypo.Text
						prop={{ h: 5, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text="정보 수정 요청 관리"
					/>
					<BCTypo.Text
						prop={{ h: 7, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 1600 }}
						text="시원하게 합시다."
					/>
					<SectionDivider height={0.4} />
				</ContainerGrid>
				<ContainerGrid flexAlignCenter>
					<Icon icon={DefIcons.Common.RightCheveron} size={ComponentSizeProps.XS} />
				</ContainerGrid>
			</FieldGrid>
		</CardContentAccentArea>
		<SectionDivider height={0.5} />
		<CardContentAccentArea
			link={URL.feedback()}
			style={{ paddingLeft: '1.3rem' }}
			backgroundColor="var(--hq-base-0300)"
		>
			<FieldGrid column="1fr auto">
				<ContainerGrid>
					<BCTypo.Text
						prop={{ h: 5, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 2300 }}
						text="피드백 관리"
					/>
					<BCTypo.Text
						prop={{ h: 7, mid: true }}
						paint={{ harmonyName: 'base', harmonyShade: 1600 }}
						text="시원하게 합시다."
					/>
					<SectionDivider height={0.4} />
				</ContainerGrid>
				<ContainerGrid flexAlignCenter>
					<Icon icon={DefIcons.Common.RightCheveron} size={ComponentSizeProps.XS} />
				</ContainerGrid>
			</FieldGrid>
		</CardContentAccentArea>
		<SectionDivider height={0.5} />
	</BCLayout.ContentsCenter>
</FrameContent>
