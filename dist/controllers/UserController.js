"use strict";
// Este arquivo é responsável por definir as rotas e os controladores para lidar com as requisições HTTP. Ele utiliza o userService para executar as ações necessárias, como criar um novo usuário ou buscar um usuário existente, e retorna as respostas adequadas ao cliente em formato JSON. O userController também pode lidar com a validação de entrada e autenticação do usuário antes de passar os dados para o userService.
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
const UserService_1 = __importDefault(require("../services/UserService"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserService_1.default.createUser(req.body);
            res.status(201).send(user);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const result = yield UserService_1.default.authenticateUser(email, password);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.id);
            const user = yield UserService_1.default.updateUser(userId, req.body);
            res.status(200).send(user);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.id);
            const user = yield UserService_1.default.deleteUser(userId);
            res.status(200).send(user);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    });
}
const UserController = {
    createUser,
    login,
    updateUser,
    deleteUser
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map