import { IconProp, IconPropType } from '@src/util/icon';

import { DefIcons } from '@src/icons/defines/index';
import { URL } from '@src/util/url';
import _ from 'lodash';
import { mdiHexagonSlice6 } from '@mdi/js';

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
				title: '회원',
				path: '/member/manage',
				icon: DefIcons.Common.Account,
				items: [
					{
						title: '회원 관리',
						icon: { ...DefIcons.Common.Account, scale: 1 },
						link: 'member/manage',
						outbound: false
					}
				]
			},
			{
				disableInMobile: true,
				title: '기업',
				path: '/company/manage',
				icon: DefIcons.Common.Company,
				items: [
					{
						title: '기업 관리',
						icon: { ...DefIcons.Common.Company, scale: 1 },
						link: 'company/manage',
						outbound: false
					}
				]
			},
			{
				disableInMobile: true,
				title: '테스트 리뷰',
				path: '/test-review/manage',
				icon: DefIcons.Common.TestReview,
				items: [
					{
						title: '테스트 리뷰 관리',
						icon: { ...DefIcons.Common.TestReview, scale: 1 },
						link: 'test-review/manage',
						outbound: false
					}
				]
			},
			{
				disableInMobile: true,
				title: '정보 수정 요청',
				path: '/suggestion/manage',
				icon: DefIcons.Common.Edit,
				items: [
					{
						title: '정보 수정 요청 관리',
						icon: { ...DefIcons.Common.Edit, scale: 1 },
						link: 'suggestion/manage',
						outbound: false
					}
				]
			},
			{
				disableInMobile: true,
				title: '피드백',
				path: '/feedback/manage',
				icon: DefIcons.Common.Feedback,
				items: [
					{
						title: '피드백 관리',
						icon: { ...DefIcons.Common.Feedback, scale: 1 },
						link: 'feedback/manage',
						outbound: false
					}
				]
			}
		].filter((g) => !!g)
	} as NavProp;
}
