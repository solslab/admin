export { default as BaseModal } from './index.svelte';

export enum ModalBackdropBlur {
	NONE = 'none',
	SOFT = 'soft',
	NORMAL = 'normal',
	HARD = 'hard'
}

export enum ModalPosition {
	RIGHT = 'right',
	BOTTOM = 'bottom',
	CENTER = 'center'
}

export interface ModalBackDrop {
	blur: ModalBackdropBlur;
	background: string;
}
