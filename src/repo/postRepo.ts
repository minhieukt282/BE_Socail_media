import {AppDataSource} from "../data-source";
import {Post} from "../model/post";

export class PostRepo {
    private postRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.postRepo = connection.getRepository(Post)
        })
    }

    create = async (newPost: PostsRequest): Promise<Post> => {
        let result = await this.postRepo.save(newPost)
        let query = `select p.img        as imgPost,
                            a.img        as imgAvt,
                            p.timeUpdate as timePost,
                            p.content    as contentPost,
                            a.username,
                            p.postId,
                            a.accountId,
                            p.status,
                            a.displayName
                     from post as p
                              join account a on p.accountId = a.accountId
                     where p.postId = ${result.postId}`
        return await this.postRepo.query(query)
    }

    findAll = async (): Promise<PostRepo> => {
        let query = `select p.img        as imgPost,
                            a.img        as imgAvt,
                            p.timeUpdate as timePost,
                            p.content    as contentPost,
                            a.username,
                            p.postId,
                            a.accountId,
                            p.status,
                            a.displayName
                     from post as p
                              join account a on p.accountId = a.accountId
                     order by timePost desc `
        return await this.postRepo.query(query)
    }

    update = async (postId: number, data: PostsRequest): Promise<string> => {
        await this.postRepo.update({postId: postId}, data)
        return "update done"
    }

    delete = async (postId: number): Promise<string> => {
        await this.postRepo.delete(postId)
        return "delete done"
    }

    searchPost = async (searchKey: string): Promise<string> => {
        const query = `select *
                       from post
                       where content like '%${searchKey}%'`
        return this.postRepo.query(query)
    }
}