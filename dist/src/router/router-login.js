"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerLogin = void 0;
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controller/login-controller"));
const auth_1 = require("../middleware/auth");
exports.routerLogin = (0, express_1.Router)();
exports.routerLogin.post('/login', login_controller_1.default.login);
exports.routerLogin.post('/register', login_controller_1.default.register);
exports.routerLogin.use(auth_1.auth);
//# sourceMappingURL=router-login.js.map