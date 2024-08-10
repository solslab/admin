import { get, writable as internal, Writable } from 'svelte/store';

// Svelte Custom store + Web storage를 합친 형태.
export namespace WritableStorage {
	declare type Updater<T> = (value: T) => T;
	declare type StoreDict<T> = { [key: string]: Writable<T> };

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const stores: StoreDict<any> = {};

	interface Serializer<T> {
		parse(text: string): T;
		stringify(object: T): string;
	}

	type StorageType = 'local' | 'session';

	interface Options<T> {
		serializer?: Serializer<T>;
		storage?: StorageType;
	}

	function getStorage(type: StorageType) {
		return type === 'local' ? localStorage : sessionStorage;
	}

	export function writable<T>(key: string, initialValue: T, options?: Options<T>): Writable<T> {
		return persisted<T>(key, initialValue, options);
	}
	export function persisted<T>(key: string, initialValue: T, options?: Options<T>): Writable<T> {
		const serializer = options?.serializer ?? JSON;
		const storageType = options?.storage ?? 'local';
		const browser = typeof window !== 'undefined' && typeof document !== 'undefined';

		function updateStorage(key: string, value: T) {
			if (!browser) return;

			// 신규 값이 undefined나 null이면 그냥 'undefined' string으로 할당.
			const newValue = serializer.stringify(value) ? serializer.stringify(value) : 'undefined';

			// 기존 값과 동일하면 update하지 않음.
			if (getStorage(storageType).getItem(key) === newValue) return;

			getStorage(storageType).setItem(key, newValue);
		}

		if (!stores[key]) {
			const store = internal(initialValue, (set) => {
				const json = browser ? getStorage(storageType).getItem(key) : null;
				if (json && json !== 'null' && json !== 'undefined') {
					try {
						set(<T>serializer.parse(json));
					} catch (e) {
						set(<T>json);
					}
				} else {
					set(initialValue);
				}

				if (browser) {
					const handleStorage = (event: StorageEvent) => {
						if (event.key === key) {
							// storageEvent가 잘 작동하지 않았을 경우에는 기본적으로 Null값이 반환됨.
							const value =
								event.newValue === 'undefined' || event.newValue === null
									? undefined
									: serializer.parse(event.newValue);
							set(value);
						}
					};

					window.addEventListener('storage', handleStorage);

					return () => window.removeEventListener('storage', handleStorage);
				}
			});

			const { subscribe, set } = store;

			stores[key] = {
				set(value: T) {
					updateStorage(key, value);
					set(value);
				},
				update(updater: Updater<T>) {
					const value = updater(get(store));

					updateStorage(key, value);
					set(value);
				},
				subscribe,
			};
		}

		return stores[key];
	}
}
