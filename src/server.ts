import { App } from "./interfaces/app";
import { ErrorHandler } from "./shared/utils/error-handler";
import { serverConfig } from "./infrastructure/config";
import { MongoClient } from "./infrastructure/database/mongoClient";
import { redisClient } from "./infrastructure/redis/RedisClient";
import { RoleInitializer } from "./infrastructure/services/RoleInitializer";

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

  private async setupRedis() {
    return new Promise<void>((resolve, reject) => {
      redisClient
        .ping()
        .then(() => {
          console.log("Redis connection successful");
          resolve();
        })
        .catch((err) => {
          console.error("Error connecting to Redis:", err);
          reject(err);
        });

      redisClient.on("connect", () => {
        console.log("Connected to Redis");
      });

      redisClient.on("error", (err) => {
        console.error("Error connecting to Redis:", err);
        reject(err);
      });
    });
  }

  public async start() {
    this.setupMiddlewares();
    await this.setupMongoDB();
    await this.setupRedis();

    await RoleInitializer.initializeRoles();

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
