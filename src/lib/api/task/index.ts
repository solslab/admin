import { __Model } from './model';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export namespace __Task {
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
			note: args.note || null,
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
			note: args.note ?? null,
		};

		return await fetchData({ url, method: 'PUT', body });
	}

	// 직무를 삭제하는 함수
	export async function deletePosition(args: { positionId: string; token: string }): Promise<any> {
		const url = `${BASE_URL}/position/${args.positionId}`;

		// DELETE 요청은 body 없이 보냄
		return await fetchData({
			url,
			method: 'DELETE',
			body: { token: args.token },
		});
	}

	// 직무 상세 정보를 조회하는 함수
	export async function getPositionDetails(args: {
		positionId: string;
		token: string;
	}): Promise<any> {
		const url = `${BASE_URL}/position/${args.positionId}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET', body: { token: args.token } });
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
