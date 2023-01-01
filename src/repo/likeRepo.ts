import {AppDataSource} from "../data-source";
import {Like} from "../model/like";

export class LikeRepo {
    private likeRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.likeRepo = connection.getRepository(Like)
        })
    }

    create = async (dataLike: LikeRequest): Promise<string> => {
        await this.likeRepo.save(dataLike)
        return "create done"
    }

    findAll = async () => {
        return await this.likeRepo.find()
    }

    delete = async (dataLike): Promise<string> => {
        const query = `DELETE
                       FROM \`like\` as l
                       WHERE l.accountId = ${dataLike.accountId} && l.postId = ${dataLike.postId}`
        await this.likeRepo.query(query)
        return "delete done"
    }
}