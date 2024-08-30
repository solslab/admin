import { API } from '@src/lib/api';
import { ModalBase } from '../store';

class PositionListDetailModal extends ModalBase<{
	data: any;
}> {}

export const __PositionListDetailModal = new PositionListDetailModal();
