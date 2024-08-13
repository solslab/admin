import { WritableStorage } from '@src/lib/wriable-storage';

export const openDrawer = WritableStorage.persisted<boolean>('__solslab_drawer', true);
