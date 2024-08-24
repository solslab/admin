import { accessToken } from '../admin/index';
import axios from 'axios';
import { get } from 'svelte/store';

export namespace __Review {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;

	// 코테 후기 전체 목록을 조회하는 함수
	export async function getTestReviews(): Promise<any> {
		const url = `${BASE_URL}/tr`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET' });
	}

	// 코테 후기 상세 정보를 조회하는 함수
	export async function getTestReviewDetails(args: { trId: string }): Promise<any> {
		const url = `${BASE_URL}/tr/${args.trId}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET' });
	}

	// fetchData 함수를 정의하여 모든 HTTP 요청을 처리
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

			// Check for a new token in the response headers and update the store if present
			const newToken = response.headers['x-refresh-token'];
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
}
