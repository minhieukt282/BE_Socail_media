"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const random_id_1 = require("./random-id");
const postRepo_1 = require("../repo/postRepo");
class UserService {
    constructor() {
        this.create = async (data) => {
            data.postId = this.randomId.random();
            data.timeUpdate = this.randomId.today();
            await this.postRepo.create(data);
            return {
                code: 201,
                message: "create ok"
            };
        };
        this.showPost = async () => {
            let post = await this.postRepo.find();
            return post;
        };
        this.updatePost = async (idEdit, post) => {
            let posts = await this.postRepo.update(idEdit, post);
            return {
                message: "edit ok",
                posts
            };
        };
        this.deletePost = async (postId) => {
            console.log(postId);
            let posts = await this.postRepo.delete(postId);
            return {
                message: "delete ok",
                posts
            };
        };
        this.randomId = new random_id_1.RandomId();
        this.postRepo = new postRepo_1.PostRepo();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map