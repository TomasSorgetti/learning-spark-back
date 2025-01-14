"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redisConfig = {
    REDIS_HOST: process.env.REDIS_HOST || "redis",
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};
