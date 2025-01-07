import { App } from "./src/infrastructure/app";
import { ErrorHandler } from "./src/shared/utils/error-handler";
import { serverConfig } from "./src/infrastructure/config";

const app = new App().getApp();

app.use(ErrorHandler);

app.listen(serverConfig.SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${serverConfig.SERVER_PORT}`);
});
