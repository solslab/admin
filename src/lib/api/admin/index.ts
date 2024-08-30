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
}
