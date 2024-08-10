export namespace Clipboard {
  export function copy(
    clipboardText: number | string,
    displayText?: number | string,
  ) {
    window.navigator.clipboard.writeText(String(clipboardText));
  }
}
