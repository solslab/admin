export { default as ModalGlobal } from './index.svelte';

import { __MemberListDetailModal } from './member-detail/store';
import { __CompanyListDetailModal } from './company-detail/store';
import { __PositionListDetailModal } from './position-detail/store';

export namespace Modal {
	export const MemberListDetailModal = __MemberListDetailModal;
	export const CompanyListDetailModal = __CompanyListDetailModal;
	export const PositionListDetailModal = __PositionListDetailModal;
}
