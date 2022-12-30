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

    findAll = async (): Promise<PostRepo> => {
        let query = `select p.img        as imgPost,
                            a.img        as imgAvt,
                            p.timeUpdate as timePost,
                            p.content    as contentPost,
                            a.username,
                            p.postId,
                            a.accountId
                     from post as p
                              join account a on p.accountId = a.accountId`
        return await this.postRepo.query(query)
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