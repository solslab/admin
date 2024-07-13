import _, { Dictionary } from 'lodash';
import qs from 'query-string';

export namespace URL {
	export type PARAM = Dictionary<string | number | any> | undefined;
	export type QUERY = Dictionary<string | number | any> | undefined;

	export function isValid(url: string) {
		return /^https?:\/\/(.*)/.test(url) || /^http?:\/\/(.*)/.test(url);
	}
	export function mapping(url: string, params?: PARAM) {
		let _url = url;
		if (params) {
			_(params).forIn((value, key) => {
				_url = _url.replace(`{${key}}`, value as string);
			});
		}
		return _url;
	}

	export function build(option: { url: string; param?: PARAM; query?: QUERY }) {
		const { url, param, query } = option;
		let _url = mapping(url, param);
		if (query) {
			_url = `${_url}?${qs.stringify(query)}`;
		}

		return _url;
	}
}
