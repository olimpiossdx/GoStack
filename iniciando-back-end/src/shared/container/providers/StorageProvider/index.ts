import { container } from "tsyringe";
import IStorageProvider from "./models/IStorageProvider";
import DikStorageProvider from "./implementations/DikStorageProvider";

const providers = {
  disk: DikStorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', providers.disk);
