import { container } from 'tsyringe';

import DikStorageProvider from './StorageProvider/implementations/DikStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DikStorageProvider);
