import { WritableStorage } from '../../wriable-storage';
import { writable } from 'svelte/store';

export const accessToken = WritableStorage.writable<string | null>('accessToken', null);
export const isLogin = writable<boolean>(false);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
let logoutTimeout: ReturnType<typeof setTimeout> | null = null;

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
			isLogin.set(true);

			// 설정된 타이머가 있다면 먼저 제거
			if (logoutTimeout) {
				clearTimeout(logoutTimeout);
			}

			logoutTimeout = setTimeout(() => {
				accessToken.set(null);
				isLogin.set(false);
				alert('로그인 세션이 만료되었습니다.');
			}, 600000);
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to login');
		}
	}

	// Other functions like fetchData remain the same...
	async function fetchData(args: {
		url: string;
		method: 'POST' | 'PUT' | 'GET' | 'DELETE';
		token: string;
		body?: any;
		isFormData?: boolean;
	}): Promise<any> {
		const headers: Record<string, string> = {
			Authorization: `Bearer ${args.token}`
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

		return await response.json();
	}
}
