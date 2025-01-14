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
exports.UserService = void 0;
const User_1 = require("../../domain/entities/User");
const UserRepositoryImpl_1 = require("../../infrastructure/database/repositories/UserRepositoryImpl");
const app_errors_1 = require("../../shared/utils/app-errors");
const SecurityService_1 = require("./SecurityService");
class UserService {
    constructor() {
        this.userRepository = new UserRepositoryImpl_1.UserRepositoryImpl();
        this.securityService = new SecurityService_1.SecurityService();
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validar que el email no exista
            const existingUser = yield this.userRepository.findByEmail(userData.email);
            // Si existe, retornar error
            if (existingUser) {
                throw new app_errors_1.BadRequestError("User already exists");
            }
            // Si no existe, Encriptar password
            const hashedPassword = yield this.securityService.hashPassword(userData.password);
            // Guardar user
            const user = new User_1.User(userData.name, userData.email, hashedPassword);
            // Retornar user
            return yield this.userRepository.create(user.toPrimitives());
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findByEmail(email);
        });
    }
}
exports.UserService = UserService;
