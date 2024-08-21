import axios from 'axios';

export namespace __Review {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;

	// 코테 후기 전체 목록을 조회하는 함수
	export async function getTestReviews(token: string): Promise<any> {
		const url = `${BASE_URL}/tr/list`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET', token });
	}

	// 코테 후기 상세 정보를 조회하는 함수
	export async function getTestReviewDetails(args: { trId: string; token: string }): Promise<any> {
		const url = `${BASE_URL}/tr/${args.trId}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET', token: args.token });
	}

	// fetchData 함수를 정의하여 모든 HTTP 요청을 처리
	async function fetchData(args: {
		url: string;
		method: 'POST' | 'PUT' | 'GET' | 'DELETE';
		token: string;
		body?: any;
	}): Promise<any> {
		try {
			const response = await axios({
				url: args.url,
				method: args.method,
				headers: {
					Authorization: `Bearer ${args.token}`,
					'Content-Type': 'application/json',
				},
				data: args.body,
			});

			// Check for a new token in the response headers and update the token if present
			const newToken = response.headers['x-refresh-token'];
			if (newToken) {
				// Here you should ideally update the token wherever it's stored
				// For example, if you're using a store or local storage:
				// updateAccessToken(newToken); // Replace with your actual token update logic
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

