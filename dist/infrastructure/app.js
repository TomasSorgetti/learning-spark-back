"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const main_router_1 = require("./http/routes/main.router");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.mainRouter = new main_router_1.MainRouter();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
    }
    initializeRoutes() {
        this.app.use("/", this.mainRouter.getRouter());
        this.app.use("/ping", (req, res) => {
            return res.status(200).json({
                message: "PONG",
            });
        });
    }
    getApp() {
        return this.app;
    }
}
exports.App = App;
