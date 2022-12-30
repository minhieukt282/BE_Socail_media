import {AppDataSource} from "../data-source";
import {Notification} from "../model/notification";

export class NotificationRepo {
    private notificationRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.notificationRepo = connection.getRepository(Notification)
        })
    }

    create = async (data): Promise<string> => {
        await this.notificationRepo.save(data)
        return "Create done"
    }

    findAll = async (): Promise<Notification> => {
        return await this.notificationRepo.find({order:{time: "DESC"}})
    }

    selectByAccount = async (accountSent, contentId, type): Promise<Notification> => {
        const query = `select *
                       from notification
                       where accountSent = ${accountSent} && contentId = ${contentId} && type = '${type}'`
        return await this.notificationRepo.query(query)
        // return await this.notificationRepo.find({
        //     where: {
        //         accountSent: accountSent,
        //         contentId: contentId,
        //         type: type
        //     }
        // })
    }

    update = async (notificationId: number, data): Promise<string> => {
        await this.notificationRepo.update({notificationId: notificationId}, data)
        return "Update done"
    }

}