import { get, writable } from 'svelte/store';

import { WritableStorage } from '../../wriable-storage';
import axios from 'axios';

export const accessToken = WritableStorage.writable<string | null>('accessToken', null);
export const isLogin = writable<boolean>(false);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

	export async function adminLogout(email: string): Promise<void> {
		const token = get(accessToken);

		if (!token) {
			throw new Error('No access token available');
		}

		try {
			const response = await axios.delete(`${BASE_URL}/admin/logout`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					email
				}
			});

			accessToken.set(null);
			isLogin.set(false);

			console.log('Logout successful', response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(error.response?.data?.message || 'Failed to logout');
			} else {
				throw new Error('An unexpected error occurred during logout');
			}
		}
	}
}
