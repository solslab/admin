import { fetchData } from '../util';
import { get } from 'svelte/store';

export namespace __Suggestion {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;

	// 정보 수정 요청 전체 목록을 조회하는 함수
	export async function getAllSuggestion(): Promise<any> {
		const url = `${BASE_URL}/suggestion`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET' });
	}

	// 정보 수정 요청 상세 정보를 조회하는 함수
	export async function getSuggestionDetails(args: { SuggestionId: string }): Promise<any> {
		const url = `${BASE_URL}/suggestion/${args.SuggestionId}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET' });
	}

	export async function updateSuggestionStatus(args: {
		suggestionId: string;
		status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
	}): Promise<any> {
		const url = `${BASE_URL}/suggestion/${args.suggestionId}?status=${args.status}`;

		return await fetchData({ url, method: 'PUT' });
	}
}
