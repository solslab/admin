export namespace __Cache {
	const store: Record<string, { duration: number; timestamp: number; data: any }> = {};

	export function createStoreKey(arg: { group: string; path: string; options?: string }) {
		const { group, path, options } = arg;

		return `${group}/${path}${options ? `/${options}` : ''}`;
	}
	export function set<T = any>(arg: { key: string; data: T; duration: number }) {
		const { key, data, duration } = arg;

		store[key] = {
			duration,
			timestamp: Date.now(),
			data
		};
	}

	export function get<T = any>(arg: { key: string }) {
		const { key } = arg;

		const { duration, timestamp, data } = store[key] || {};
		const now = Date.now();
		if (now - timestamp > duration) {
			delete store[key];
			return null;
		}
		return <T>data;
	}
}
