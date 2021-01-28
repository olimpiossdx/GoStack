import { container } from 'tsyringe';

import DikStorageProvider from './StorageProvider/implementations/DiskProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DikStorageProvider);
