"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
// src/interfaces/http/routes/UserRoutes.ts
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new UserController_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use("/", (req, res, next) => {
            this.userController.createUser(req, res, next);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRouter = UserRouter;
