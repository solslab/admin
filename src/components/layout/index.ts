import { default as BCAbsolute } from './absolute/index.svelte';
import { default as BCContentsCenter } from './contents-center/index.svelte';
import { default as BCFixed } from './fixed/index.svelte';

export namespace BCLayout {
	export const Absolute = BCAbsolute;
	export const Fixed = BCFixed;
	export const ContentsCenter = BCContentsCenter;
}
