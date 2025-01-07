import { App } from "./src/infrastructure/app";
import { ErrorHandler } from "./src/shared/utils/error-handler";
import { serverConfig } from "./src/infrastructure/config";
import { initRedis } from "./src/infrastructure/redis/redisClient";

const app = new App().getApp();

app.use(ErrorHandler);

initRedis();

app.listen(serverConfig.SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${serverConfig.SERVER_PORT}`);
});
