import {AppDataSource} from "../data-source";
import {Post} from "../model/post";

export class PostRepo {
    private postRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.postRepo = connection.getRepository(Post)
        }).catch(e => {
            console.log('err')
        })
    }

    async create(newPost: PostsRequest): Promise<string> {
        return await this.postRepo.save(newPost)
    }

    async findAll() {
        let query = `select p.img        as imgPost,
                            a.img        as imgAvt,
                            p.timeUpdate as timePost,
                            p.content    as contentPost,
                            a.username   as nameAccount,
                            p.status as statusPost,
                            a.status as statusAccount
                     from post as p
                              join account a on p.accountId = a.accountId
                     order by p.timeUpdate desc`
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