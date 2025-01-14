"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrastructure/app");
const error_handler_1 = require("./shared/utils/error-handler");
const config_1 = require("./infrastructure/config");
const mongoClient_1 = require("./infrastructure/database/mongoClient");
const RedisClient_1 = require("./infrastructure/redis/RedisClient");
class Server {
    constructor() {
        this.app = new app_1.App().getApp();
    }
    setupMiddlewares() {
        this.app.use(error_handler_1.ErrorHandler);
    }
    setupMongoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoClient = mongoClient_1.MongoClient.getInstance();
            yield mongoClient.connect();
        });
    }
    setupRedis() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                RedisClient_1.redisClient
                    .ping()
                    .then(() => {
                    console.log("Conexión a Redis exitosa");
                    resolve();
                })
                    .catch((err) => {
                    console.error("Error al conectar a Redis:", err);
                    reject(err);
                });
                RedisClient_1.redisClient.on("connect", () => {
                    console.log("Conectado a Redis");
                });
                RedisClient_1.redisClient.on("error", (err) => {
                    console.error("Error de Redis:", err);
                    reject(err);
                });
            });
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setupMiddlewares();
            yield this.setupMongoDB();
            yield this.setupRedis();
            this.app.listen(config_1.serverConfig.SERVER_PORT, () => {
                console.log(`Server running on http://localhost:${config_1.serverConfig.SERVER_PORT}`);
            });
        });
    }
}
// Crear e iniciar el servidor
const server = new Server();
server.start();
