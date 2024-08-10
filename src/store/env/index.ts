import { browser } from "$app/environment";
import { writable } from "svelte/store";

import { Debug } from "@src/util/debug";

const debug = new Debug("store-env", Debug.Color.darkOrange);
export type ScreenType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "fxl";
export const isMobile = writable<boolean>(false);
export const screenWidth = writable<number>(1200);
export const screen = writable<ScreenType>("lg");

let currentScreen: ScreenType = "lg";
screen.subscribe((s) => (currentScreen = s));

export interface ScreenStatus {
  isUnderSM: boolean;
  isUnderMD: boolean;
  isUnderLG: boolean;
  isUnderXL: boolean;
  isUnder2XL: boolean;
  isUnderFXL: boolean;
}
const screenSizeOrder: { [key in ScreenType]: number } = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 5,
  fxl: 6,
};

function checkScreen() {
  if (window.innerWidth < 1081) {
    isMobile.set(true);
  } else {
    isMobile.set(false);
  }
  if (window.innerWidth < 641) {
    screen.set("xs");
  } else if (window.innerWidth < 1081) {
    screen.set("sm");
  } else if (window.innerWidth < 1281) {
    screen.set("md");
  } else if (window.innerWidth < 1441) {
    screen.set("lg");
  } else if (window.innerWidth < 1681) {
    screen.set("xl");
  } else if (window.innerWidth < 1921) {
    screen.set("xxl");
  } else {
    screen.set("fxl");
  }
}
export function isUnderScreen(standard: ScreenType, current?: ScreenType) {
  const _currentScreen = current || currentScreen;
  return screenSizeOrder[standard] > screenSizeOrder[_currentScreen];
}

export function isUnderScreenAndContain(
  standard: ScreenType,
  current?: ScreenType,
) {
  const _currentScreen = current || currentScreen;
  return screenSizeOrder[standard] >= screenSizeOrder[_currentScreen];
}

export function isOverScreen(standard: ScreenType, current?: ScreenType) {
  const _currentScreen = current || currentScreen;
  return screenSizeOrder[standard] < screenSizeOrder[_currentScreen];
}

export function isOverScreenAndContain(
  standard: ScreenType,
  current?: ScreenType,
) {
  const _currentScreen = current || currentScreen;
  return screenSizeOrder[standard] <= screenSizeOrder[_currentScreen];
}

export function isScreenContains(
  current: ScreenType,
  ...standard: ScreenType[]
) {
  const _currentScreen = current;

  return standard.some(
    (s) => screenSizeOrder[s] === screenSizeOrder[_currentScreen],
  );
}

export function getScreenStatus(current?: ScreenType) {
  return {
    isUnderSM: isUnderScreen("sm", current),
    isUnderMD: isUnderScreen("md", current),
    isUnderLG: isUnderScreen("lg", current),
    isUnderXL: isUnderScreen("xl", current),
    isUnder2XL: isUnderScreen("xxl", current),
    isUnderFXL: isUnderScreen("fxl", current),
  };
}
if (browser) {
  checkScreen();
  window.addEventListener("resize", checkScreen);
}

export namespace Screen {
  export const scroll = writable({ y: 0 });
  export type Type = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "fxl";
  export interface ResponseType<T> {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    xxl?: T;
    fxl?: T;
  }

  export function isUnderScreen(standard: ScreenType, current?: ScreenType) {
    const _currentScreen = current || currentScreen;
    return screenSizeOrder[standard] > screenSizeOrder[_currentScreen];
  }

  export function isUnderScreenAndContain(
    standard: ScreenType,
    current?: ScreenType,
  ) {
    const _currentScreen = current || currentScreen;
    return screenSizeOrder[standard] >= screenSizeOrder[_currentScreen];
  }

  export function isOverScreen(standard: ScreenType, current?: ScreenType) {
    const _currentScreen = current || currentScreen;
    return screenSizeOrder[standard] < screenSizeOrder[_currentScreen];
  }

  export function isOverScreenAndContain(
    standard: ScreenType,
    current?: ScreenType,
  ) {
    const _currentScreen = current || currentScreen;
    return screenSizeOrder[standard] <= screenSizeOrder[_currentScreen];
  }

  export function isScreenContains(
    current: ScreenType,
    ...standard: ScreenType[]
  ) {
    const _currentScreen = current;

    return standard.some(
      (s) => screenSizeOrder[s] === screenSizeOrder[_currentScreen],
    );
  }

  export function getStatus(current?: ScreenType) {
    return {
      isUnderSM: isUnderScreen("sm", current),
      isUnderMD: isUnderScreen("md", current),
      isUnderLG: isUnderScreen("lg", current),
      isUnderXL: isUnderScreen("xl", current),
      isUnder2XL: isUnderScreen("xxl", current),
      isUnderFXL: isUnderScreen("fxl", current),
    };
  }

  export function responsive<T>(
    screen: ScreenType,
    arg: {
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      xxl?: T;
      fxl?: T;
    },
    log: boolean = false,
  ): T {
    log && debug.d("createByScreenStatus", screen, arg);

    const {
      xs = null,
      sm = null,
      md = null,
      lg = null,
      xl = null,
      xxl = null,
      fxl = null,
    } = arg;
    switch (screen) {
      case "xs":
        return (
          xs !== null
            ? xs
            : sm !== null
              ? sm
              : md !== null
                ? md
                : lg !== null
                  ? lg
                  : xl !== null
                    ? xl
                    : xxl !== null
                      ? xxl
                      : fxl
        ) as T;
      case "sm":
        return (
          sm !== null
            ? sm
            : md !== null
              ? md
              : lg !== null
                ? lg
                : xl !== null
                  ? xl
                  : xxl !== null
                    ? xxl
                    : fxl !== null
                      ? fxl
                      : xs
        ) as T;
      case "md":
        return (
          md !== null
            ? md
            : lg !== null
              ? lg
              : xl !== null
                ? xl
                : xxl !== null
                  ? xxl
                  : fxl !== null
                    ? fxl
                    : sm !== null
                      ? sm
                      : xs
        ) as T;
      case "lg":
        return (
          lg !== null
            ? lg
            : xl !== null
              ? xl
              : xxl !== null
                ? xxl
                : fxl !== null
                  ? fxl
                  : md !== null
                    ? md
                    : sm !== null
                      ? sm
                      : xs
        ) as T;
      case "xl":
        return (
          xl !== null
            ? xl
            : xxl !== null
              ? xxl
              : fxl !== null
                ? fxl
                : lg !== null
                  ? lg
                  : md !== null
                    ? md
                    : sm !== null
                      ? sm
                      : xs
        ) as T;
      case "xxl":
        return (
          xxl !== null
            ? xxl
            : fxl !== null
              ? fxl
              : xl !== null
                ? xl
                : lg !== null
                  ? lg
                  : md !== null
                    ? md
                    : sm !== null
                      ? sm
                      : xs
        ) as T;
      case "fxl":
      default:
        return (
          fxl !== null
            ? fxl
            : xxl !== null
              ? xxl
              : xl !== null
                ? xl
                : lg !== null
                  ? lg
                  : md !== null
                    ? md
                    : sm !== null
                      ? sm
                      : xs
        ) as T;
    }
  }
}
