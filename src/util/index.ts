import { browser } from '$app/environment';
import _ from 'lodash';
import { v4 } from 'uuid';

import { __Cache } from './cache';

export namespace Util {
	export function exec<T>(arg: () => T) {
		return arg();
	}

	export namespace Promise {
		export function onlyBrowser<T>(promise: Function, arg?: any) {
			return (browser && promise(arg)) as T;
		}
	}

	export namespace File {
		export function downloadFile(arg: { text: string; fileName: string }) {
			const { text, fileName } = arg;
			const blob = new Blob([text], { type: 'text/plain' });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('hidden', '');
			a.setAttribute('href', url);
			a.setAttribute('download', fileName);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	}

	export function onResize(arg: {
		onMount: (arg: () => void) => void;
		onDestroy: (arg: () => void) => void;
		onResize: (arg: boolean) => void;
		throttle?: number;
	}) {
		const { onMount, onDestroy, throttle = 100 } = arg;
		let resizing = false;
		let timeout: NodeJS.Timeout | null = null;
		function startResize() {
			!resizing && arg.onResize(true);
			resizing = true;
			timeout && clearTimeout(timeout);
			timeout = setTimeout(endResize, 300);
		}
		function endResize() {
			resizing = false;
			arg.onResize(resizing);
		}

		let throttleResize = _.throttle(startResize, throttle);
		onMount(() => window.addEventListener('resize', throttleResize));
		onDestroy(() => window.removeEventListener('resize', throttleResize));
	}
	export const uuid = v4;
	export import Cache = __Cache;
}
