import { API } from '@src/lib/api';
import { ModalBase } from '../store';

class CompanyListDetailModal extends ModalBase<{
	data: any;
}> {}

export const __CompanyListDetailModal = new CompanyListDetailModal();
