import { App } from "./src/infrastructure/app";
import { ErrorHandler } from "./src/shared/utils/error-handler";
import { serverConfig } from "./src/infrastructure/config";
import { MongoClient } from "./src/infrastructure/database/mongoClient";
import { redisClient } from "./src/infrastructure/redis/RedisClient";

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
          console.log("Conexión a Redis exitosa");
          resolve();
        })
        .catch((err) => {
          console.error("Error al conectar a Redis:", err);
          reject(err);
        });

      redisClient.on("connect", () => {
        console.log("Conectado a Redis");
      });

      redisClient.on("error", (err) => {
        console.error("Error de Redis:", err);
        reject(err);
      });
    });
  }

  public async start() {
    this.setupMiddlewares();
    await this.setupMongoDB();
    await this.setupRedis();

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
