"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router_user_1 = require("./router-user");
const router_login_1 = require("./router-login");
exports.router = (0, express_1.Router)();
exports.router.use('/', router_login_1.routerLogin);
exports.router.use('/', router_user_1.routerUser);
//# sourceMappingURL=router.js.map