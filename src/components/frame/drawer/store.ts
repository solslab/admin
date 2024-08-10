import _ from "lodash";
import { StringifiableRecord } from "query-string";
import { writable } from "svelte/store";

export interface BreadCrumbItem {
  title: string;
  pathIcon?: string;
  href?: string;
  query?: StringifiableRecord;
}
export const breadcrumbs = writable<BreadCrumbItem[]>([]);
export function createBreadCrumb(
  title: string,
  href: string,
  query?: StringifiableRecord,
) {
  return {
    title,
    href,
    query,
  };
}

export function setBreadCrumbs(items: BreadCrumbItem[]) {
  const crumbs = _.cloneDeep(items).map((c) => ({
    ...c,
    title: c.title,
  }));

  breadcrumbs.set(crumbs);
}
