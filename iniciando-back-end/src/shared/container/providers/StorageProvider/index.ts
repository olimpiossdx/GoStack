import { container } from "tsyringe";
import IStorageProvider from "./models/IStorageProvider";
import DikStorageProvider from "./implementations/DikStorageProvider";
import S3StorageProvider from "./implementations/S3StorageProvider";

import uploadConfig from '@config/upload';

const providers = {
  disk: DikStorageProvider,
  s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>('StorageProvider', providers[uploadConfig.driver]);
