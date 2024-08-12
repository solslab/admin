import _ from 'lodash';
import { get, Writable, writable } from 'svelte/store';

export abstract class ModalBase<T, K = T> {
	public readonly openStatus: Writable<boolean> = writable(false);
	public data: Writable<K> = writable();
	protected converter: (data: T) => K = (data) => data as unknown as K;

	protected get _data() {
		return get(this.data);
	}

	public open() {
		this.openStatus.set(true);
		return this;
	}

	public close() {
		this.openStatus.set(false);
		return this;
	}

	public set(data: T) {
		this.data.set(_.cloneDeep(this.converter(data)));
		return this;
	}
	public update(data: Partial<K>) {
		this.data.update((v) => _.assign(v, data));
		return this;
	}
}
