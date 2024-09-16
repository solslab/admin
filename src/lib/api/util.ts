import { accessToken } from './admin/index';
import axios from 'axios';
import { get } from 'svelte/store';

export async function fetchData(args: {
	url: string;
	method: 'POST' | 'PUT' | 'GET' | 'DELETE';
	body?: any;
	isFormData?: boolean;
	includeToken?: boolean;
}): Promise<any> {
	let headers: Record<string, string> = {};
	let token = get(accessToken);

	if (args.includeToken !== false) {
		if (!token) {
			throw new Error('No access token available');
		}

		headers['Authorization'] = `Bearer ${token}`;
	}

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
			headers['Authorization'] = `Bearer ${token}`;

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
				alert('세션이 만료되었습니다. 홈 페이지로 이동합니다.');
				accessToken.set(null);
				window.location.href = '/';
			}
			throw new Error(error.response?.data?.message || 'Error executing request');
		} else {
			throw new Error('An unexpected error occurred');
		}
	}
}
