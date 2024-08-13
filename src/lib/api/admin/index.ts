import { WritableStorage } from '../../wriable-storage';
import { writable } from 'svelte/store';

export const accessToken = WritableStorage.writable<string | null>('accessToken', null);
export const isLogin = writable<boolean>(false);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export namespace __Admin {
	export async function adminLogin(email: string, password: string): Promise<void> {
		const response = await fetch(`${BASE_URL}/admin/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			const data = await response.json();
			accessToken.set(data.accessToken); // accessToken을 스토어에 저장
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to login');
		}
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
