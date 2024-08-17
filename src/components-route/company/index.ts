import { default as CompanyManage } from './manage/index.svelte';
import { default as CompanyRootLite } from './root/lite/index.svelte';

export namespace RCCompany {
	export const Manage = CompanyManage;
	export const RootLite = CompanyRootLite;
}
