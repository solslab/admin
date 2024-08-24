import { __Model } from './model';
import { accessToken } from '../admin/index';
import axios from 'axios';
import { get } from 'svelte/store';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export namespace __Position {
	// 직무를 생성하는 함수, CreatePositionRequest 인터페이스를 사용
	export async function createPosition(args: __Model.CreatePositionRequest): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}/position`;
		const body = {
			position_name: args.position_name,
			support_languages: args.support_languages,
			test_time: args.test_time || null,
			problem_info: args.problem_info || null,
			permit_ide: args.permit_ide || null,
			permit_search: args.permit_search || null,
			hidden_case: args.hidden_case || null,
			exam_mode: args.exam_mode || null,
			test_place: args.test_place || null,
			note: args.note || null
		};

		return await fetchData({ url, method: 'POST', body });
	}

	// 직무를 수정하는 함수, UpdatePositionRequest 인터페이스를 사용
	export async function updatePosition(args: __Model.UpdatePositionRequest): Promise<any> {
		const url = `${BASE_URL}/position/${args.positionId}`;
		const body = {
			position_name: args.position_name,
			support_languages: args.support_languages,
			test_time: args.test_time ?? null,
			problem_info: args.problem_info ?? null,
			permit_ide: args.permit_ide ?? null,
			permit_search: args.permit_search ?? null,
			hidden_case: args.hidden_case ?? null,
			exam_mode: args.exam_mode ?? null,
			test_place: args.test_place ?? null,
			note: args.note ?? null
		};

		return await fetchData({ url, method: 'PUT', body });
	}

	// 직무를 삭제하는 함수
	export async function deletePosition(args: { positionId: string }): Promise<any> {
		const url = `${BASE_URL}/position/${args.positionId}`;

		// DELETE 요청은 body 없이 보냄
		return await fetchData({
			url,
			method: 'DELETE'
		});
	}

	// 직무 상세 정보를 조회하는 함수
	export async function getPositionDetails(args: { positionId: string }): Promise<any> {
		const url = `${BASE_URL}/position/${args.positionId}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET' });
	}

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
