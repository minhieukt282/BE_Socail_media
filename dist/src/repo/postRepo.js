"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepo = void 0;
const data_source_1 = require("../data-source");
const post_1 = require("../model/post");
class PostRepo {
    constructor() {
        this.create = async (newPost) => {
            await this.postRepo.save(newPost);
        };
        this.find = async () => {
            let query = 'select * from posts ';
            let post = await this.postRepo.find(query);
            return post;
        };
        this.update = async (idEdit, post) => {
            await this.postRepo.update({ postId: idEdit }, post);
        };
        this.delete = async (id) => {
            await this.postRepo.delete(id);
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            this.postRepo = connection.getRepository(post_1.Post);
        });
    }
}
exports.PostRepo = PostRepo;
//# sourceMappingURL=postRepo.js.map