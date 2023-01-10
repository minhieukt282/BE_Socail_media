import {AppDataSource} from "../data-source";
import {Comment} from "../model/comment";

export class CommentRepo {
    private commentRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.commentRepo = connection.getRepository(Comment)
        })
    }

    save = async (comment: Comment): Promise<string> => {
        await this.commentRepo.save(comment)
        return "create done"
    }

    delete = async (dataComment): Promise<string> => {
        let query
        if (dataComment.accountId !== 'undefined' && dataComment.commentId !== "undefined") {
            query = `delete
                     from comment
                     where accountId = ${dataComment.accountId}
                       and commentId = ${dataComment.commentId}`
        } else {
            query = `delete
                     from comment
                     where postPostId = ${dataComment.postPostId}`
        }
        await this.commentRepo.query(query)
        return "delete done"
    }
}