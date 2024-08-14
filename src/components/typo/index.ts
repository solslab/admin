export { default as TypoNumber } from './number/index.svelte';
export { default as TypoSub } from './sub/index.svelte';
export { default as TypoText } from './text/index.svelte';
export { default as TypoTextWithIcon } from './text-with-icon/index.svelte';

import { default as TypoNumber } from './number/index.svelte';
import { default as WrappedTypoText } from './wrapped-text/index.svelte';
import { default as WrappedTextWithIcon } from './wrapped-text-with-icon/index.svelte';

export namespace BCTypo {
	export const Number = TypoNumber;
	export const Text = WrappedTypoText;
	export const TextWithIcon = WrappedTextWithIcon;
}
