import { CSSProperties } from '@src/util/style';
import { IconProp } from '../icon';

import { default as BCUnitImage } from './image.svelte';
import { default as UIScrollArea } from './scroll-area.svelte';

export namespace BCUnit {
	export const Image = BCUnitImage;

	export const ScrollArea = UIScrollArea;
}

export interface EmptyProps {
	backgroundSrc?: string;
	style?: CSSProperties;
	transparent?: boolean;
	title: string;
	message: string;
	icon?: IconProp;
	minHeight?: string | number;
	border?: boolean;
}
