"use strict";
// Este arquivo contém a lógica de negócios relacionada aos usuários. Ele define as funções para criar, ler, atualizar e excluir usuários, fazendo uso do new UserRepository para interagir com o banco de dados. O userService também pode validar dados de entrada, como a senha do usuário e o formato do email, antes de passar esses dados para o new UserRepository.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const HttpException_1 = require("../utils/HttpException");
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.hash(password, 10);
    });
}
function validateEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = user.email;
        if (email === undefined || email === null) {
            throw new HttpException_1.HttpException(400, 'Email is required');
        }
        const userExists = yield UserRepository_1.default.getUserByEmail(email);
        if (userExists) {
            throw new HttpException_1.HttpException(400, 'Email already exists');
        }
        return true; // Retorna true para que o usuário possa ser criado
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.password) {
            throw new HttpException_1.HttpException(400, 'Password is required');
        }
        yield validateEmail(user);
        const hashedPassword = yield hashPassword(user.password);
        user.password = hashedPassword;
        return yield UserRepository_1.default.createUser(user);
    });
}
function authenticateUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield UserRepository_1.default.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found.');
        }
        if (!user.password) {
            throw new Error('Password not found.');
        }
        const isValidPassword = yield bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password.');
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET not found.');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        return { user, token };
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user.email) {
            yield validateEmail(user);
        }
        if (user.password) {
            const hashedPassword = yield hashPassword(user.password);
            user.password = hashedPassword;
        }
        return yield UserRepository_1.default.updateUser(id, user);
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield UserRepository_1.default.deleteUser(id);
    });
}
exports.default = {
    createUser,
    authenticateUser,
    updateUser,
    deleteUser
};
//# sourceMappingURL=UserService.js.map