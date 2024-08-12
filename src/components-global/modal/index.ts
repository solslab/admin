export { default as ModalGlobal } from './index.svelte';

import { __MemberListDetailModal } from './member-detail/store';

export namespace Modal {
	export const MemberListDetailModal = __MemberListDetailModal;
}
