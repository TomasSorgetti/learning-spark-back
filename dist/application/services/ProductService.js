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
exports.ProductService = void 0;
const Product_1 = require("../../domain/entities/Product");
const ProductRepositoryImpl_1 = require("../../infrastructure/database/repositories/ProductRepositoryImpl");
const RedisCache_1 = require("../../infrastructure/redis/RedisCache");
class ProductService {
    constructor() {
        this.productRepository = new ProductRepositoryImpl_1.ProductRepositoryImpl();
    }
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new Product_1.Product(productData);
            const product = newProduct.toPrimitives();
            return yield this.productRepository.create(product);
        });
    }
    getOne(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = `product-${productId}`;
            const cachedProduct = yield RedisCache_1.RedisCache.get(cacheKey);
            if (cachedProduct && typeof cachedProduct === "string") {
                return JSON.parse(cachedProduct);
            }
            const product = yield this.productRepository.getById(productId);
            yield RedisCache_1.RedisCache.set(cacheKey, JSON.stringify(product), 3600);
            return product;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = "products";
            const cachedProducts = yield RedisCache_1.RedisCache.get(cacheKey);
            if (cachedProducts && typeof cachedProducts === "string") {
                return JSON.parse(cachedProducts);
            }
            const products = yield this.productRepository.getAll();
            yield RedisCache_1.RedisCache.set(cacheKey, JSON.stringify(products), 3600);
            return products;
        });
    }
}
exports.ProductService = ProductService;
