"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const app_errors_1 = require("./app-errors");
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof app_errors_1.AppError) {
        res.status(err.statusCode).json(Object.assign(Object.assign({ message: err.message }, (err.errorStack && { details: err.errorStack })), { statusCode: err.statusCode, errorName: err.name }));
    }
    else {
        console.error("Unhandled Error:", err);
        res.status(500).json({
            message: "An unexpected error occurred. Please try again later.",
        });
    }
};
exports.ErrorHandler = ErrorHandler;
