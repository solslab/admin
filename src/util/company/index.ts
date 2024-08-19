import { writable } from 'svelte/store';

export const companyDetailData = writable<any>(null);
export const companyPositionData = writable<any[]>([]);
