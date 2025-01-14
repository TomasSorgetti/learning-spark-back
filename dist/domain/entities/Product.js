"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor({ name, description, price, }) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.validate();
    }
    validate() {
        if (!this.name || !this.description || !this.price) {
            throw new Error("All fields are required");
        }
        // Validations
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getPrice() {
        return this.price;
    }
    toPrimitives() {
        return {
            name: this.name,
            description: this.description,
            price: this.price,
        };
    }
}
exports.Product = Product;
