export namespace __Review {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	// 코테 후기 전체 목록을 조회하는 함수
	export async function getTestReviews(token: string): Promise<any> {
		const url = `${BASE_URL}//tr/list`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET', body: { token } });
	}

	// 코테 후기 상세 정보를 조회하는 함수
	export async function getTestReviewDetails(args: { trId: string; token: string }): Promise<any> {
		const url = `${BASE_URL}//tr/${args.trId}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET', body: args.token });
	}

	// fetchData 함수를 정의하여 모든 HTTP 요청을 처리
	async function fetchData(args: {
		url: string;
		method: 'POST' | 'PUT' | 'GET' | 'DELETE';
		body?: any;
	}): Promise<any> {
		const response = await fetch(args.url, {
			method: args.method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(args.body),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Error executing request');
		}

		return await response.json();
	}
}
