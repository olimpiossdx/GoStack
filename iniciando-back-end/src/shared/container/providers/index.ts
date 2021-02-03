import { container } from 'tsyringe';

import DikStorageProvider from './StorageProvider/implementations/DikStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import mailConfig from '@config/mail';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';


container.registerSingleton<IStorageProvider>('StorageProvider', DikStorageProvider);

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);

container.registerInstance<IMailProvider>('MailProvider',
  mailConfig.driver === 'ethereal' ?
    container.resolve(EtherealMailProvider) :
    container.resolve(SESMailProvider)
);

