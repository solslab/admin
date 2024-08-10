export namespace __Company {
	// fetchData 함수를 정의하여 모든 HTTP 요청을 처리
	async function fetchData(args: {
		url: string;
		method: 'POST' | 'GET';
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
