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
exports.ProductController = void 0;
const ProductService_1 = require("../../../application/services/ProductService");
class ProductController {
    constructor() {
        this.productService = new ProductService_1.ProductService();
    }
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, price } = req.body;
                const response = yield this.productService.create({
                    name,
                    description,
                    price,
                });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const response = yield this.productService.getOne(productId);
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.productService.getAll();
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ProductController = ProductController;
