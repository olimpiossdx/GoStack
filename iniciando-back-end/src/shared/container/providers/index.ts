import { container } from 'tsyringe';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import DikStorageProvider from './StorageProvider/implementations/DikStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DikStorageProvider);
container.registerInstance<IMailProvider>('MailProvider', new EtherealMailProvider());
