<script lang="ts">
	import { BCTypo } from '@src/components/typo';
	import { Input } from '@src/components/input';	
	import { browser } from '$app/environment';
	import { ContainerGrid } from '@src/components/container';
	import { CardContentAccentArea } from '@src/components/content/index';
	import { FieldGrid,FieldFlex } from '@src/components/field';
	import {Button} from '@src/components/button';
	import { TypoText } from '@src/components/typo';
	import { BCUnit } from '@src/components/unit/index';
	import {ComponentSizeProps	} from '@src/util/component';
	import NavigationFooter from '@src/layout/navigation-footer.svelte';
	import NavigationHeader from '@src/layout/navigation-header.svelte';
	import { Frame } from '@src/components/frame';


	let isLogin = false;
	let id: string = '';
	let password: string = '';
	// support & feedback 은 status 상태로 넘겨줄 거임 company 안에 job들어가고 기업 선택시 tab 나오게 하면 될듯.
</script>

{#if !isLogin}
	<FieldGrid style={{background:'var(--hq-base-0100)'}}>
		<ContainerGrid flexAlignCenter flexJustifyCenter style={{ height: '100vh', minHeight: '32rem' }}>
			<FieldGrid column="1fr 32rem 1fr">
				<ContainerGrid />
				<CardContentAccentArea
					border
					backgroundPaint={{ harmonyName: 'base', harmonyShade: 400 }}
					style={{ padding: '3rem 0rem 0rem 0rem ' }}
				>
					<FieldGrid gap={1}>
						<ContainerGrid flexJustifyCenter style={{marginRight:'1.5rem'}}>
								<ContainerGrid style={{ padding: '0.5rem 0 0.5rem 1.3rem', width:'4rem' }}>
									<BCUnit.Image src="/assets/icons/solslab.png" />
								</ContainerGrid>
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
						</ContainerGrid>
						<ContainerGrid style={{ padding: '0 3rem' }}>
							<FieldFlex direction="column" gap={0.6}>
								<ContainerGrid>
									<BCTypo.Text
										prop={{
											h: 4,
											bold: true
										}}
										paint={{
											harmonyName: 'base',
											harmonyShade: 600
										}}
										text="ID"
									></BCTypo.Text>
									<Input
										fit
										filled
										placeholder="아이디를 입력해주세요."
										style={{ padding: '0.5rem' }}
										bind:value={id}
									/>
								</ContainerGrid>
								<ContainerGrid>
									<BCTypo.Text
										prop={{
											h: 4,
											bold: true
										}}
										paint={{
											harmonyName: 'base',
											harmonyShade: 600
										}}
										text="PASSWORD"
									></BCTypo.Text>
									<Input
										fit
										filled
										type="password"
										placeholder="비밀번호를 입력해주세요."
										style={{ padding: '0.5rem' }}
										bind:value={password}
									/>
								</ContainerGrid>
							</FieldFlex>
						</ContainerGrid>
					</FieldGrid>
					<FieldGrid>
						<ContainerGrid style={{ padding: '2rem 3rem' }}>
							<Button
								style={{
									padding: '1.5rem',
									border: '1px solid var(--hq-base-0200)',
									borderRadius: '0.25rem',
									background:'var(--hq-base-0300)'		
								}}
								size={ComponentSizeProps.LG}
								on:click={() => {
									if (id === 'admin' && password === '1234') {
										isLogin = true;
									} else {
										alert('아이디와 비밀번호를 잘 생각해보십쇼.');
									}
								}}
							>
								<BCTypo.Text
									prop={{
										h: 3,
										bold: true
									}}
									paint={{
										harmonyName: 'base',
										harmonyShade: 1600
									}}
									text="LOGIN"
								></BCTypo.Text></Button
							>
						</ContainerGrid>
					</FieldGrid>
				</CardContentAccentArea>
				<ContainerGrid />
			</FieldGrid>
		</ContainerGrid>
	</FieldGrid>
{:else}
<Frame>
<div class="root">
	<FieldGrid full row="54px 1fr 3rem">
		<ContainerGrid>
			<NavigationHeader></NavigationHeader>
		</ContainerGrid>
		<ContainerGrid>
			<div class="content">
				{#if browser}
					<slot />
				{/if}
			</div>
		</ContainerGrid>
		<ContainerGrid>
			<NavigationFooter></NavigationFooter>
		</ContainerGrid>
	</FieldGrid>
</div>
</Frame>
{/if}

<style lang="scss">
	@import './__layout_hub_colors.scss';

	.root {
		width: 100%;
		height: 100%;
		background: var(--hq-base-1000);
		.content {
			height: 100%;
		}
	}
</style>
