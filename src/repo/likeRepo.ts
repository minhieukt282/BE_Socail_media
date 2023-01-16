import {AppDataSource} from "../data-source";
import {LikePost} from "../model/like-post";

export class LikeRepo {
    private likeRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.likeRepo = connection.getRepository(LikePost)
        })
    }

    create = async (dataLike: LikeRequest): Promise<string> => {
        console.log(dataLike)
        await this.likeRepo.save(dataLike)
        return "create done"
    }

    save = async (like: LikePost): Promise<string> => {
        await this.likeRepo.save(like)
        return "create done"
    }

    findAll = async () => {
        return await this.likeRepo.find()
    }

    findCountLike = async () => {
        const query = `select postId, count(postId) as countLike
                       from \`like\`
                       group by postId`
        return await this.likeRepo.query(query)
    }

    delete = async (dataLike): Promise<string> => {
        let query
        if (dataLike.accountId !== 'undefined') {
            query = `delete
                     from like_post
                     where accountId = ${dataLike.accountId}
                       and postPostId = ${dataLike.postPostId}`
        } else {
            query = `delete
                     from like_post
                     where postPostId = ${dataLike.postPostId}`
        }
        await this.likeRepo.query(query)
        return "delete done"
    }
}
