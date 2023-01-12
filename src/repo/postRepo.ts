import {AppDataSource} from "../data-source";
import {Post} from "../model/post";
import {Like} from "typeorm";

export class PostRepo {
    private postRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.postRepo = connection.getRepository(Post)
        })
    }

    create = async (newPost: PostRequest): Promise<Post> => {
        const result = await this.postRepo.save(newPost)
        const query = `select p.img        as imgPost,
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
                                join like_posts l on p.postId = l.postPostId
                       where p.postId = ${result.postId}`
        return await this.postRepo.query(query)
    }

    savePost = async (post: Post): Promise<Post> => {
        return await this.postRepo.save(post);
    }

    findAll = async (): Promise<PostRepo> => {
        return await this.postRepo.find({
            order: {
                timeUpdate: "DESC"
            },
            relations: {
                likes: true,
                comments: true,
                account: true
            },
        })
    }

    update = async (postId: number, data: PostRequest): Promise<string> => {
        await this.postRepo.update({postId: postId}, data)
        return "update done"
    }

    findById = async (postId: number): Promise<PostRepo> => {
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
                     where p.postId = ${postId}`
        return await this.postRepo.query(query)
    }

    findOne = async (postId: number): Promise<Post> => {
        return await this.postRepo.findOneBy({postId: postId})
    }

    delete = async (postId: number): Promise<string> => {
        await this.postRepo.delete(postId)
        return "delete done"
    }

    searchPost = async (searchKey: string): Promise<string> => {
        return await this.postRepo.find({
            where: {content: Like(`%${searchKey}%`)},
            relations: {
                likes: true,
                comments: true,
                account: true
            }
        })
    }
}
