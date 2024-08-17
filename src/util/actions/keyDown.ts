/**
 * @param {boolean} arg.defaultStopPropagation 조건에 상관없이 keydown 이벤트시 이벤트 전파 방지. 조건에 맞을 때만 이벤트 전파를 방지하고 싶다면 callback 시용
 * @param {boolean} arg.defaultPreventDefault 조건에 상관없이 keydown 이벤트시 기본 동작 방지. 조건에 맞을 때만 기본 동작을 방지하고 싶다면 callback 시용
 */
export function keyDown(
	node: HTMLElement,
	arg: {
		callback: (arg?: KeyboardEvent) => void;
		defaultStopPropagation?: boolean;
		defaultPreventDefault?: boolean;
		key?: string;
		meta?: boolean;
		ctrl?: boolean;
		shift?: boolean;
		escape?: boolean;
	}
): SvelteActionReturnType {
	const keyDown = (event: KeyboardEvent) => {
		arg.defaultStopPropagation && event.stopPropagation();
		arg.defaultPreventDefault && event.preventDefault();

		if (
			(arg.key?.toUpperCase().indexOf('ARROW') !== -1 && event.key === arg.key) ||
			(arg.key?.toUpperCase() === 'ENTER' && event.key === arg.key)
		) {
			arg.callback(event);
			return;
		}

		const code = arg.key
			? isNaN(Number(arg.key))
				? `Key${arg.key.toUpperCase()}`
				: `Digit${arg.key}`
			: undefined;

		const enable =
			(!arg.meta || arg.meta === event.metaKey) &&
			(!arg.ctrl || arg.ctrl === event.ctrlKey) &&
			(!arg.shift || arg.shift === event.shiftKey) &&
			(!code || code === event.code) &&
			(!arg.escape || arg.escape === (event.key === 'Escape'));

		enable && arg.callback(event);
	};

	document.addEventListener('keydown', keyDown, true);

	return {
		destroy() {
			document.removeEventListener('keydown', keyDown, true);
		}
	};
}
