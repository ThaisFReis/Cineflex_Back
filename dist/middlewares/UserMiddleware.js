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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const HttpException_1 = require("../utils/HttpException");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const UserSchema_1 = require("../schemas/UserSchema");
function validateCreateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield UserSchema_1.createUserSchema.validateAsync(req.body);
            next();
        }
        catch (error) {
            next(new HttpException_1.HttpException(400, error.message));
        }
    });
}
function validateLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield UserSchema_1.loginSchema.validateAsync(req.body);
            next();
        }
        catch (error) {
            next(new HttpException_1.HttpException(400, error.message));
        }
    });
}
function validateUpdateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield UserSchema_1.updateUserSchema.validateAsync(req.body);
            next();
        }
        catch (error) {
            next(new HttpException_1.HttpException(400, error.message));
        }
    });
}
function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new HttpException_1.HttpException(401, 'Unauthorized');
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                throw new HttpException_1.HttpException(401, 'Unauthorized');
            }
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new HttpException_1.HttpException(500, 'Internal server error');
            }
            const decoded = (0, jsonwebtoken_1.verify)(token, secret);
            const user = yield UserRepository_1.default.getUserById(decoded.id);
            if (!user) {
                next(new HttpException_1.HttpException(401, 'Unauthorized'));
            }
            req.body.user = user;
            next();
        }
        catch (error) {
            next(new HttpException_1.HttpException(401, 'Unauthorized'));
        }
    });
}
const UserMiddleware = {
    validateCreateUser,
    validateUpdateUser,
    validateToken,
    validateLogin
};
exports.default = UserMiddleware;
//# sourceMappingURL=UserMiddleware.js.map