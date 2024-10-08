import { accessToken } from '../admin/index';
import axios from 'axios';
import { fetchData } from '../util';
import { get } from 'svelte/store';

export namespace __Review {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;

	// 코테 후기 전체 목록을 조회하는 함수
	export async function getTestReviews(args: { page: number; size: number }): Promise<any> {
		const url = `${BASE_URL}/tr?page=${args.page}&size=${args.size}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET' });
	}

	// 코테 후기 상세 정보를 조회하는 함수
	export async function getTestReviewDetails(args: { trId: string }): Promise<any> {
		const url = `${BASE_URL}/tr/${args.trId}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET' });
	}
}
