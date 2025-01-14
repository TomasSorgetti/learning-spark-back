"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
// src/interfaces/http/routes/UserRoutes.ts
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
class ProductRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.productController = new ProductController_1.ProductController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", (req, res, next) => {
            this.productController.createProduct(req, res, next);
        });
        this.router.get("/:productId", (req, res, next) => {
            this.productController.getProductById(req, res, next);
        });
        this.router.get("/", (req, res, next) => {
            this.productController.getAllProducts(req, res, next);
        });
        this.router.put("/:productId", (req, res, next) => {
            this.productController.updateProduct(req, res, next);
        });
        this.router.delete("/:productId", (req, res, next) => {
            this.productController.deleteProduct(req, res, next);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.ProductRouter = ProductRouter;
