import { IconProp, IconPropType } from '@src/util/icon';

import { mdiHexagonSlice6 } from '@mdi/js';
import { DefIcons } from '@src/icons/defines/index';
import { URL } from '@src/util/url';
import _ from 'lodash';

export interface NavPropItem {
	icon: IconProp;
	title: string;
	link: string;
	outbound: boolean;
	description?: string;
	tag?: TagStatus;
	isOnlyDev?: boolean;
	isNotUseMobile?: boolean;
}

export interface TagStatus {
	enable: boolean;
	time: number;
	image: imageSource;
}

export interface imageSource {
	dark: string;
	light: string;
}

export interface NavPropGroup {
	disableInMobile?: boolean;
	items?: NavPropItem[];
	title: string;
	primary?: boolean;
	icon: IconProp;
	path: string;
}

export interface NavProp {
	rootTitle: string;
	explorers: NavPropGroup;
	tails: NavPropItem[];
	groups: NavPropGroup[];
}

export function createNavigationProps() {
	return {
		rootTitle: 'Tools',
		groups: [
			{
				disableInMobile: true,
				title: '회원 관리',
				path: '/wallet',
				icon: DefIcons.Common.Wallet,
				items: [
					{
						title: 'Portfolio',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'wallet/portfolio',
						outbound: false,
					},
					{
						title: 'Stake',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'wallet/stake',
						outbound: false,
					},
				],
			},
			{
				disableInMobile: true,
				title: '기업 관리',
				path: '/wallet',
				icon: DefIcons.Common.Wallet,
				items: [
					{
						title: 'Portfolio',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'wallet/portfolio',
						outbound: false,
					},
					{
						title: 'Stake',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'wallet/stake',
						outbound: false,
					},
				],
			},
			{
				disableInMobile: true,
				title: '코딩테스트 리뷰',
				path: '/wallet',
				icon: DefIcons.Common.Wallet,
				items: [
					{
						title: 'Portfolio',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'wallet/portfolio',
						outbound: false,
					},
				],
			},
		].filter((g) => !!g),
	} as NavProp;
}
