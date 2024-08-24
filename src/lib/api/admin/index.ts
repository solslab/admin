import { WritableStorage } from '../../wriable-storage';
import axios from 'axios';
import { writable } from 'svelte/store';

export const accessToken = WritableStorage.writable<string | null>('accessToken', null);
export const isLogin = writable<boolean>(false);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// let logoutTimeout: ReturnType<typeof setTimeout> | null = null;

export namespace __Admin {
	export async function adminLogin(email: string, password: string): Promise<void> {
		try {
			const response = await axios.post(`${BASE_URL}/admin/login`, {
				email,
				password
			});

			const data = response.data;
			accessToken.set(data.accessToken);
			isLogin.set(true);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(error.response?.data?.message || 'Failed to login');
			} else {
				throw new Error('An unexpected error occurred');
			}
		}
	}

	async function fetchData(args: {
		url: string;
		method: 'POST' | 'PUT' | 'GET' | 'DELETE';
		token: string;
		body?: any;
		isFormData?: boolean;
	}): Promise<any> {
		try {
			const headers: Record<string, string> = {
				Authorization: `Bearer ${args.token}`
			};

			if (!args.isFormData) {
				headers['Content-Type'] = 'application/json';
			}

			const response = await axios({
				url: args.url,
				method: args.method,
				headers,
				data: args.isFormData ? args.body : JSON.stringify(args.body)
			});

			// Check for a new token in the response headers and update the store if present
			const newToken = response.headers['x-refresh-token'];
			if (newToken) {
				accessToken.set(newToken);
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
