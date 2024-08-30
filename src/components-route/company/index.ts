import { default as CompanyDetail } from './detail/index.svelte';
import { default as CompanyRootLite } from './root/lite/index.svelte';

export namespace RCCompany {
	export const RootLite = CompanyRootLite;
	export const Detail = CompanyDetail;
}
