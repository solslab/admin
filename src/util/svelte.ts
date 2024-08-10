import { browser } from "$app/environment";
import { onDestroy, onMount } from "svelte";

import {
  BreadCrumbItem,
  breadcrumbs,
} from "@src/components/frame/drawer/store";

import { wait } from "./util.time";

import type { Unsubscriber } from "svelte/store";
export function onDestroyPage(fn: () => void, ...unsubs: Unsubscriber[]) {
  onDestroy(() => {
    for (const unsub of unsubs) {
      unsub();
    }
    fn();
    // browser && breadcrumbs.set([]);
  });
}

export function onDestroyBrowser(
  fn: () => void,
  options?: {
    onlyBrowser?: boolean;
  },
) {
  const { onlyBrowser = true } = options || {};
  onDestroy(() => {
    if (onlyBrowser && !browser) {
      return;
    }
    fn();
  });
}

export function onMountPage(
  fn: () => void,
  breadcrumbItems?: BreadCrumbItem[],
) {
  onMount(async () => {
    fn();

    browser && breadcrumbItems && breadcrumbs.set(breadcrumbItems);
  });
}

export function onMountBrowser(
  fn: () => void,
  options?: {
    onlyBrowser?: boolean;
    breadcrumbItems?: BreadCrumbItem[];
  },
) {
  const { onlyBrowser = true, breadcrumbItems } = options || {};
  onMount(async () => {
    if (onlyBrowser && !browser) {
      return;
    }
    fn();
    await wait(200);

    browser && breadcrumbItems && breadcrumbs.set(breadcrumbItems);
  });
}
