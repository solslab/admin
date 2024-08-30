import { accessToken } from '../admin/index';
import axios from 'axios';
import { fetchData } from '../util';
import { get } from 'svelte/store';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export namespace __Member {
	// 회원 전체 조회 함수
	export async function getAllMembers(): Promise<any> {
		const url = `${BASE_URL}/member/list`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({
			url,
			method: 'GET'
		});
	}

	// 회원 상세 조회 함수
	export async function getMemberDetails(args: { memberKey: string }): Promise<any> {
		const url = `${BASE_URL}/member/${args.memberKey}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({
			url,
			method: 'GET'
		});
	}
}
