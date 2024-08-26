import { accessToken } from '../admin/index';
import axios from 'axios';
import { get } from 'svelte/store';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export namespace __Member {
	// 모든 HTTP 요청을 처리하는 fetchData 함수
	async function fetchData(args: {
		url: string;
		method: 'POST' | 'PUT' | 'GET' | 'DELETE';
		body?: any;
		isFormData?: boolean; // FormData 여부를 나타내는 옵션 추가
	}): Promise<any> {
		const token = get(accessToken); // 저장된 토큰을 가져오기

		if (!token) {
			throw new Error('No access token available');
		}

		const headers: Record<string, string> = {
			Authorization: `Bearer ${token}` // Authorization 헤더에 토큰 추가
		};

		if (!args.isFormData) {
			headers['Content-Type'] = 'application/json';
		}

		try {
			const response = await axios({
				url: args.url,
				method: args.method,
				headers,
				data: args.body
			});

			const newToken = response.headers['authorization'];
			const cexToken = response.headers.authorization;
			
			console.log(cexToken);
			console.log(newToken);


			if (newToken) {
				accessToken.set(newToken);
			}

			
			return response.data;

		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(error.response?.data?.message || 'Error executing request');
			} else {
				throw new Error('An unexpected error occurred');
			}
		}
		
	}

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
