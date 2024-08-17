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
				title: 'Member',
				path: '/member',
				icon: DefIcons.Common.Wallet,
				items: [
					{
						title: '회원 조희',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'member/list',
						outbound: false
					}
				]
			},
			{
				disableInMobile: true,
				title: 'Company',
				path: '/company',
				icon: DefIcons.Common.Wallet,
				items: [
					{
						title: '기업 관리',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'company/manage',
						outbound: false
					}
				]
			},
			{
				disableInMobile: true,
				title: 'Position',
				path: '/position',
				icon: DefIcons.Common.Wallet,
				items: [
					{
						title: '직무 전체 조회',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'position/list',
						outbound: false
					}
				]
			},
			{
				disableInMobile: true,
				title: 'Test Review',
				path: '/test-review',
				icon: DefIcons.Common.Wallet,
				items: [
					{
						title: '테스트 리뷰 전체 조회',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'test-review/list',
						outbound: false
					},
					{
						title: '테스트 리뷰 상세 조회',
						icon: { ...DefIcons.Common.All, scale: 1 },
						link: 'test-review/detail',
						outbound: false
					}
				]
			}
		].filter((g) => !!g)
	} as NavProp;
}
