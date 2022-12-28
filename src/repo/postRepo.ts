import {AppDataSource} from "../data-source";
import {Post} from "../model/post";

export class PostRepo {
    private postRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.postRepo = connection.getRepository(Post)
        })
    }

    create = async (newPost: PostsRequest): Promise<string> => {
        await this.postRepo.save(newPost)
        return "Create done"
    }

    find = async (): Promise<PostRepo> => {
        return await this.postRepo.find()
    }

    update = async (postId: number, data: PostsRequest): Promise<string> => {
        await this.postRepo.update({postId: postId}, data)
        return "Update done"
    }

    delete = async (postId: number): Promise<string> => {
        await this.postRepo.delete(postId)
        return "Delete done"
    }
}