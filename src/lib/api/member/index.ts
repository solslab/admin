const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export namespace __Member {
	// 모든 HTTP 요청을 처리하는 fetchData 함수
	async function fetchData(args: {
		url: string;
		method: 'POST' | 'PUT' | 'GET' | 'DELETE';

		body?: any;
	}): Promise<any> {
		const response = await fetch(args.url, {
			method: args.method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: args.body ? JSON.stringify(args.body) : null
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Error executing request');
		}

		return await response.json(); // GET 요청은 응답 데이터를 반환할 수 있음
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
