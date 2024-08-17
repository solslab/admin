import { default as MemberDetail } from './detail/index.svelte';
import { default as MemberList } from './list/index.svelte';
import { default as MemberRootLite } from './root/lite/index.svelte';

export namespace RCMember {
	export const Detail = MemberDetail;
	export const List = MemberList;
	export const RootLite = MemberRootLite;
}
