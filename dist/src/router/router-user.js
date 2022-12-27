"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
exports.routerUser = (0, express_1.Router)();
exports.routerUser.post('/posts', user_controller_1.default.createPost);
exports.routerUser.get('/posts', user_controller_1.default.showPost);
exports.routerUser.patch('/posts/:postId', user_controller_1.default.updatePost);
exports.routerUser.delete('/posts/:postId', user_controller_1.default.deletePost);
//# sourceMappingURL=router-user.js.map