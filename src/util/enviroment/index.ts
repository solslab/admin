export namespace Enviroment {
	export const isBrowser = typeof window !== 'undefined';
	export const isDev = import.meta.env.VITE_RUN_MODE === 'development';
	export const isPreview =
		typeof window !== 'undefined' && window?.location.host.includes('web.app');
	export const isProd =
		typeof window !== 'undefined' && window?.location.host.includes('mintscan.io');
	export const isFirebaseEmulator = import.meta.env.VITE_FIREBASE_EMULATOR === 'true';

	export const isSafari =
		typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	export const isMac =
		typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
	export const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
	export const forceProd: boolean = true;
}
