"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const user_router_1 = require("./user.router");
const auth_router_1 = require("./auth.router");
const product_router_1 = require("./product.router");
class MainRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const userRouter = new user_router_1.UserRouter();
        const authRouter = new auth_router_1.AuthRouter();
        const productRouter = new product_router_1.ProductRouter();
        this.router.use("/users", userRouter.getRouter());
        this.router.use("/auth", authRouter.getRouter());
        this.router.use("/products", productRouter.getRouter());
    }
    getRouter() {
        return this.router;
    }
}
exports.MainRouter = MainRouter;
