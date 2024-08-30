import { accessToken } from './admin/index';
import axios from 'axios';
import { get } from 'svelte/store';

export async function fetchData(args: {
	url: string;
	method: 'POST' | 'PUT' | 'GET' | 'DELETE';
	body?: any;
	isFormData?: boolean;
}): Promise<any> {
	let token = get(accessToken); // 저장된 토큰을 가져옴

	if (!token) {
		throw new Error('No access token available');
	}

	const headers: Record<string, string> = {
		Authorization: `Bearer ${token}`
	};

	if (!args.isFormData) {
		headers['Content-Type'] = 'application/json';
	}

	try {
		let response = await axios({
			url: args.url,
			method: args.method,
			headers,
			data: args.body
		});

		let newToken = response.headers['authorization'];

		if (newToken) {
			newToken = newToken.replace('Bearer ', '');
			accessToken.set(newToken);
			token = get(accessToken);
			const headers: Record<string, string> = {
				Authorization: `Bearer ${token}`
			};

			if (!args.isFormData) {
				headers['Content-Type'] = 'application/json';
			}

			response = await axios({
				url: args.url,
				method: args.method,
				headers,
				data: args.body
			});
		}

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				throw new Error('Unauthorized access - Token may be expired');
			}
			throw new Error(error.response?.data?.message || 'Error executing request');
		} else {
			throw new Error('An unexpected error occurred');
		}
	}
}
