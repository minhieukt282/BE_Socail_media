import {AppDataSource} from "../data-source";
import {Notification} from "../model/notification";

export class NotificationRepo {
    private notificationRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.notificationRepo = connection.getRepository(Notification)
        })
    }

    create = async (dataNotice: NoticeRequest): Promise<string> => {
        await this.notificationRepo.save(dataNotice)
        return "create done"
    }

    findAll = async (): Promise<Notification> => {
        return await this.notificationRepo.find({order: {time: "DESC"}})
    }

    delete = async (data: any): Promise<string> => {
        const query = `DELETE
                       FROM notification
                       WHERE accountSent = ${data.accountSent} && postId = ${data.postId}
                           && type = '${data.type}'`
        await this.notificationRepo.query(query)
        return "delete done"
    }

}