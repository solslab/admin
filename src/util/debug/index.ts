import { Color } from '../color';
import { Enviroment } from '../enviroment';
import { Format } from '../format';

export class Debug {
	public static Color = {
		black: Color.Palette.Color.ValueRaw.base_1000,
		yellow: Color.Palette.Color.ValueRaw.indian_yellow_1200,
		orange: Color.Palette.Color.ValueRaw.vermilion_orange_1200,
		red: Color.Palette.Color.ValueRaw.rossa_red_1200,
		cyan: Color.Palette.Color.ValueRaw.powder_blue_1200,
		purple: Color.Palette.Color.ValueRaw.prussian_blue_1200,
		dardRed: Color.Palette.Color.ValueRaw.dard_red_1200,
		darkOrange: Color.Palette.Color.ValueRaw.vermilion_orange_1200,
		darkBlue: Color.Palette.Color.ValueRaw.prussian_blue_1200
	};

	private tick: number = new Date().getTime();
	public static create(namespace: string, color: string) {
		return new Debug(namespace, color);
	}
	constructor(
		private readonly namespace: string,
		private readonly color: string = Debug.Color.cyan
	) {}
	public d(...arg: any[]) {
		if (!Enviroment.isDev) {
			return this;
		}
		//@ts-ignore
		// eslint-disable-next-line
		console.debug(`%c[${this.namespace}]`, `color:${this.color}`, ...arg);
		return this;
	}
	public w(...arg: any[]) {
		if (!Enviroment.isDev) {
			return this;
		}
		//@ts-ignore
		// eslint-disable-next-line
		console.warn(`%c[${this.namespace}]`, `color:${this.color}`, ...arg);
		return this;
	}
	public e(...arg: any[]) {
		if (!Enviroment.isDev) {
			return this;
		}
		//@ts-ignore
		// eslint-disable-next-line
		console.error(`%c[${this.namespace}]`, `color:${this.color}`, ...arg);
		return this;
	}
	public start() {
		if (!Enviroment.isDev) {
			return this;
		}
		this.tick = new Date().getTime();
		return this;
	}
	public end(...arg: any[]) {
		if (!Enviroment.isDev) {
			return this;
		}
		arg[0] === undefined && (arg[0] = '');
		//@ts-ignore
		// eslint-disable-next-line
		console.info(
			`%c[${this.namespace}] Duration : %c${Format.integer(
				new Date().getTime() - this.tick
			)}ms %c%s`,
			`color:${this.color};`,
			`font-style:italic;font-size:10px;color:${this.color}`,
			`font-style:italic;font-size:10px;`,
			...arg
		);
		return this;
	}
}
export const Log = new Debug('Log', Debug.Color.cyan);
