<script lang="ts">
	import { API } from '@src/lib/api';
	import { BCTypo } from '@src/components/typo';
	import { browser } from '$app/environment';
	import { accessToken } from '@src/lib/api/admin';
	import { ContainerGrid } from '@src/components/container';
	import { CardContentAccentArea } from '@src/components/content/index';
	import { FieldGrid, FieldFlex } from '@src/components/field';
	import { Button } from '@src/components/button';
	import { TypoText } from '@src/components/typo';
	import { BCUnit } from '@src/components/unit/index';
	import { ComponentSizeProps } from '@src/util/component';
	import NavigationFooter from '@src/layout/navigation-footer.svelte';
	import NavigationHeader from '@src/layout/navigation-header.svelte';
	import { ModalGlobal } from '@src/components-global/modal';
	import { Frame } from '@src/components/frame';
	import { get } from 'svelte/store';

	let id: string = '';
	let password: string = '';
	let errorMessage: string = '';

	$: isLogin = get(accessToken);

	async function handleLogin() {
		try {
			await API.Admin.adminLogin(id, password);
			isLogin = get(accessToken);
		} catch (error) {}
	}

	// function checkLoginStatus() {
	// 	const token = get(accessToken);
	// 	if (!token) {
	// 		isLogin.set(false); // 토큰이 없으면 로그아웃 처리
	// 		alert('로그인 세션이 만료되었습니다.');
	// 	} else {
	// 		isLogin.set(true); // 토큰이 있으면 로그인 처리
	// 	}
	// }

	// onMountBrowser(() => {
	// 	checkLoginStatus();
	// 	intervalId = window.setInterval(checkLoginStatus, 60000);
	// });

	// onDestroy(() => {
	// 	// 컴포넌트가 언마운트될 때 타이머 제거
	// 	clearInterval(intervalId);
	// });
</script>

{#if isLogin}
	<!-- 로그인 후 화면 -->
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
{:else}
	<!-- 로그인 화면 -->
	<FieldGrid style={{ background: 'var(--hq-base-0100)' }}>
		<ContainerGrid
			flexAlignCenter
			flexJustifyCenter
			style={{ height: '100vh', minHeight: '32rem' }}
		>
			<FieldGrid column="1fr 32rem 1fr">
				<ContainerGrid />
				<CardContentAccentArea
					border
					backgroundPaint={{ harmonyName: 'base', harmonyShade: 400 }}
					style={{ padding: '3rem 0rem 0rem 0rem ' }}
				>
					<FieldGrid gap={1}>
						<ContainerGrid flexJustifyCenter style={{ marginRight: '1.5rem' }}>
							<ContainerGrid style={{ padding: '0.5rem 0 0.5rem 1.3rem', width: '4rem' }}>
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
									<input
										type="text"
										placeholder="아이디를 입력해주세요."
										bind:value={id}
										style="padding: 0.5rem; width: 100%;"
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
									<input
										type="password"
										placeholder="비밀번호를 입력해주세요."
										bind:value={password}
										style="padding: 0.5rem; width: 100%;"
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
									borderRadius: '0.25rem'
								}}
								size={ComponentSizeProps.LG}
								on:click={handleLogin}
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
					{#if errorMessage}
						<p style="color: red;">{errorMessage}</p>
					{/if}
				</CardContentAccentArea>
				<ContainerGrid />
			</FieldGrid>
		</ContainerGrid>
	</FieldGrid>
{/if}
<ModalGlobal />

<style lang="scss">
	@import './__layout_hub_colors.scss';

	.root {
		width: 100%;
		height: 100%;

		.content {
			height: 100%;
		}
	}
</style>
