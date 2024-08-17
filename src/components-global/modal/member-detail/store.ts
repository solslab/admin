import { API } from '@src/lib/api';
import { ModalBase } from '../store';

class MemberListDetailModal extends ModalBase<{
	data: any;
}> {}

export const __MemberListDetailModal = new MemberListDetailModal();
