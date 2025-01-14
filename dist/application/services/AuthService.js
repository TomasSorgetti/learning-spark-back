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
exports.AuthService = void 0;
const UserService_1 = require("./UserService");
class AuthService {
    constructor() {
        this.userService = new UserService_1.UserService();
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getUserByEmail(userData.email);
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.createUser(userData);
        });
    }
    verify() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    profile() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AuthService = AuthService;
