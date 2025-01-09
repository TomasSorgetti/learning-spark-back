import { App } from "./src/infrastructure/app";
import { ErrorHandler } from "./src/shared/utils/error-handler";
import { serverConfig } from "./src/infrastructure/config";
import { initRedis } from "./src/infrastructure/redis/redisClient";
import { MongoClient } from "./src/infrastructure/database/mongoClient";

class Server {
  private app: any;

  constructor() {
    this.app = new App().getApp();
  }

  private setupMiddlewares() {
    this.app.use(ErrorHandler);
  }

  private async setupMongoDB() {
    const mongoClient = MongoClient.getInstance();
    await mongoClient.connect();
  }

  private setupRedis() {
    initRedis();
  }

  public start() {
    this.setupMiddlewares();
    this.setupMongoDB();
    // this.setupRedis();

    this.app.listen(serverConfig.SERVER_PORT, () => {
      console.log(
        `Server running on http://localhost:${serverConfig.SERVER_PORT}`
      );
    });
  }
}

// Crear e iniciar el servidor
const server = new Server();
server.start();
