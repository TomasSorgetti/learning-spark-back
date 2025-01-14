"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.BadRequestError = exports.APIError = exports.AppError = exports.STATUS_CODES = void 0;
exports.STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};
class AppError extends Error {
    constructor(name, statusCode, description, isOperational = true, errorStack) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
class APIError extends AppError {
    constructor(description = "Internal Server Error", statusCode = exports.STATUS_CODES.INTERNAL_ERROR) {
        super("API_ERROR", statusCode, description);
    }
}
exports.APIError = APIError;
class BadRequestError extends AppError {
    constructor(description = "Bad request") {
        super("BAD_REQUEST", exports.STATUS_CODES.BAD_REQUEST, description);
    }
}
exports.BadRequestError = BadRequestError;
class ValidationError extends AppError {
    constructor(description = "Validation error", errorStack) {
        super("VALIDATION_ERROR", exports.STATUS_CODES.BAD_REQUEST, description, true, errorStack);
    }
}
exports.ValidationError = ValidationError;
