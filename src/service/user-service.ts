import {RandomId} from "./random-id";
import {PostRepo} from "../repo/postRepo";

export class UserService {
    private randomId: RandomId
    private postRepo: PostRepo

    constructor() {
        this.randomId = new RandomId()
        this.postRepo = new PostRepo()
    }

    create = async (data: PostsRequest): Promise<ResponseBody> => {
        data.postId = this.randomId.random();
        data.timeUpdate = this.randomId.today()
        let message = await this.postRepo.create(data)
        return {
            code: 201,
            message: message
        }
    }

    showPost = async (): Promise<ResponseBody> => {
        let posts = await this.postRepo.find()
        return {
            code: 200,
            message: "Success",
            data: posts
        }
    }

    updatePost = async (postId: number, data: PostsRequest): Promise<ResponseBody> => {
        let message = await this.postRepo.update(postId, data)
        return {
            code: 200,
            message: message
        }
    }

    deletePost = async (postId): Promise<ResponseBody> => {
        let message = await this.postRepo.delete(postId);
        return {
            code: 200,
            message: message
        }
    }
}