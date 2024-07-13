import { __Brush } from './brush';
import { __Palette } from './palette';
import { __Util } from './util';

export { __Palette as Palette };

export namespace Color {
	export import Util = __Util;
	export import Palette = __Palette;
	export import Brush = __Brush;
}
