import { __Model } from './model';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export namespace __Company {
	// 기업을 생성하는 함수
	export async function createCompany(args: {
		company_name: string;
		industry_type: __Model.IndustryType[];
		token: string;
	}): Promise<any> {
		const url = `${BASE_URL}/company`;
		const body = {
			company_name: args.company_name,
			industry_type: args.industry_type
		};

		return await fetchData({ url, method: 'POST', body, token: args.token });
	}

	// 기업 로고를 등록하거나 변경하는 함수
	export async function uploadCompanyLogo(args: {
		companyId: string;
		file: File;
		fileName: string;
		token: string;
	}): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}/logo`;

		// FormData를 사용하여 파일 및 기타 데이터 전송
		const formData = new FormData();
		formData.append('file', args.file, args.fileName);

		return await fetchData({
			url,
			method: 'POST',
			token: args.token,
			body: formData,
			isFormData: true // FormData 사용 여부를 true로 설정
		});
	}

	// 기업 로고를 삭제하는 함수
	export async function deleteCompanyLogo(args: {
		companyId: string;
		token: string;
	}): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}/logo`;

		// DELETE 요청은 body 없이 보냄
		return await fetchData({
			url,
			method: 'DELETE',
			token: args.token
		});
	}

	// 기업 정보를 수정하는 함수
	export async function updateCompany(args: {
		companyId: string;
		company_name: string;
		industry_type: __Model.IndustryType[]; // 변경된 부분
		token: string;
	}): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}`;
		const body = {
			company_name: args.company_name,
			industry_type: args.industry_type
		};

		return await fetchData({
			url,
			method: 'PUT',
			token: args.token,
			body
		});
	}

	// 기업을 삭제하는 함수
	export async function deleteCompany(args: {
		companyId: number; // companyId의 타입을 number로 변경
		token: string;
	}): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}`;

		// DELETE 요청은 body 없이 보냄
		return await fetchData({
			url,
			method: 'DELETE',
			token: args.token
		});
	}

	async function fetchData(args: {
		url: string;
		method: 'POST' | 'PUT' | 'GET' | 'DELETE';
		token: string; // Token을 인자로 받음
		body?: any;
		isFormData?: boolean; // FormData 여부를 나타내는 옵션 추가
	}): Promise<any> {
		const headers: Record<string, string> = {
			Authorization: `Bearer ${args.token}` // Authorization 헤더 추가
		};

		if (!args.isFormData) {
			headers['Content-Type'] = 'application/json';
		}

		const response = await fetch(args.url, {
			method: args.method,
			headers,
			body: args.isFormData ? args.body : JSON.stringify(args.body)
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Error executing request');
		}

		return await response.json(); // POST 요청은 응답 데이터를 반환할 수 있음
	}
}
