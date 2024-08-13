import { __Model } from './model';
import { get } from 'svelte/store';
import { accessToken } from '../admin/index';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export namespace __Company {
	// 기업 전체 조회 함수
	export async function getAllCompanies(): Promise<any> {
		const url = `${BASE_URL}/company`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({ url, method: 'GET' });
	}

	// 회원 상세 조회 함수
	export async function getCompanyDetails(args: { companyId: string }): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}`;

		// GET 요청이므로 body는 필요 없음
		return await fetchData({
			url,
			method: 'GET'
		});
	}

	// 기업을 생성하는 함수
	export async function createCompany(args: {
		company_name: string;
		industry_type: __Model.IndustryType[];
	}): Promise<any> {
		const url = `${BASE_URL}/company`;
		const body = {
			company_name: args.company_name,
			industry_type: args.industry_type
		};

		return await fetchData({ url, method: 'POST', body });
	}

	// 기업 로고를 등록하거나 변경하는 함수
	export async function uploadCompanyLogo(args: {
		companyId: string;
		file: File;
		fileName: string;
	}): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}/logo`;

		// FormData를 사용하여 파일 및 기타 데이터 전송
		const formData = new FormData();
		formData.append('file', args.file, args.fileName);

		return await fetchData({
			url,
			method: 'POST',
			body: formData,
			isFormData: true // FormData 사용 여부를 true로 설정
		});
	}

	// 기업 로고를 삭제하는 함수
	export async function deleteCompanyLogo(args: { companyId: string }): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}/logo`;

		// DELETE 요청은 body 없이 보냄
		return await fetchData({
			url,
			method: 'DELETE'
		});
	}

	// 기업 정보를 수정하는 함수
	export async function updateCompany(args: {
		companyId: string;
		company_name: string;
		industry_type: __Model.IndustryType[];
	}): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}`;
		const body = {
			company_name: args.company_name,
			industry_type: args.industry_type
		};

		return await fetchData({
			url,
			method: 'PUT',
			body
		});
	}

	// 기업을 삭제하는 함수
	export async function deleteCompany(args: { companyId: number }): Promise<any> {
		const url = `${BASE_URL}/company/${args.companyId}`;

		// DELETE 요청은 body 없이 보냄
		return await fetchData({
			url,
			method: 'DELETE'
		});
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
