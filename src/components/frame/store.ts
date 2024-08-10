import { WritableStorage } from '@src/lib/wriable-storage';

export const openDrawer = WritableStorage.persisted<boolean>('__mintscan_drawer', true);
