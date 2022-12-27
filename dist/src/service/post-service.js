"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const postRepo_1 = require("../repo/postRepo");
const random_id_1 = require("./random-id");
class PostService {
    constructor() {
        this.create = async (data) => {
        };
        this.postRepo = new postRepo_1.PostRepo();
        this.randomId = new random_id_1.RandomId();
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post-service.js.map