"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
class UserController {
    constructor() {
        this.createPost = async (req, res) => {
            let status = await this.userController.create(req.body);
            return res.status(status.code).json({ message: status.message });
        };
        this.showPost = async (req, res) => {
            let post = await this.userController.showPost();
            return res.status(201).json(post);
        };
        this.updatePost = async (req, res) => {
            let idEdit = +req.params.postId;
            let post = req.body;
            let posts = await this.userController.updatePost(idEdit, post);
            return res.status(201).json(posts);
        };
        this.deletePost = async (req, res) => {
            let posts = await this.userController.deletePost(+req.params.postId);
            return res.status(200).json(posts);
        };
        this.userController = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map