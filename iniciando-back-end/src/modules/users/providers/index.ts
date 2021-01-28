import { container } from "tsyringe";

import BCryptHashProvider from "./implementations/BCryptHasProvider";
import IHashProvider from "./models/IHashProvider";

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
