"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.validate();
    }
    validate() {
        if (!this.name || !this.email || !this.password) {
            throw new Error("All fields are required");
        }
        // Validations
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    toPrimitives() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
        };
    }
}
exports.User = User;
