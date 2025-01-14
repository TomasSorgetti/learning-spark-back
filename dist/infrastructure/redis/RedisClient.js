"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
// redisClient.ts
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("../config");
const redisClient = new ioredis_1.default({
    host: config_1.redisConfig.REDIS_HOST,
    port: config_1.redisConfig.REDIS_PORT,
});
exports.redisClient = redisClient;
