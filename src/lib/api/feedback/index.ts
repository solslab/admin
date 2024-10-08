import { fetchData } from '../util';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export namespace __Feedback {
	// 회원 전체 조회 함수
	export async function getAllFeedbacks(args: { page: number; size: number }): Promise<any> {
		const url = `${BASE_URL}/feedback?page=${args.page}&size=${args.size}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({
			url,
			method: 'GET'
		});
	}
}
