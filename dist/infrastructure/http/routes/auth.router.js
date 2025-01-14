"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
// src/interfaces/http/routes/UserRoutes.ts
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new AuthController_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/signin", (req, res, next) => {
            this.authController.login(req, res, next);
        });
        this.router.post("/signup", (req, res, next) => {
            this.authController.register(req, res, next);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.AuthRouter = AuthRouter;
