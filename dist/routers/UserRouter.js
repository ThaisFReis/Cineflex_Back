"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserMiddleware_1 = __importDefault(require("../middlewares/UserMiddleware"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter
    .post('/signup', UserMiddleware_1.default.validateCreateUser, UserController_1.default.createUser)
    .post('/login', UserMiddleware_1.default.validateLogin, UserController_1.default.login, UserMiddleware_1.default.validateToken)
    .put('/:id', UserMiddleware_1.default.validateUpdateUser, UserController_1.default.updateUser)
    .delete('/:id', UserController_1.default.deleteUser, UserMiddleware_1.default.validateToken);
//# sourceMappingURL=UserRouter.js.map