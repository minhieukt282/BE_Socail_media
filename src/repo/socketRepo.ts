import {AppDataSource} from "../data-source";
import {Socket} from "../model/socket";

export class SocketRepo {
    private socketRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.socketRepo = connection.getRepository(Socket)
        })
    }

    create = async (newData): Promise<string> => {
        await this.socketRepo.save(newData)
        return "Create done"
    }
    findSocketId = async (accountId) => {
        return await this.socketRepo.findOneBy({accountId: accountId + ""})
    }

    delete = async (accountId: number): Promise<string> => {
        const query = `DELETE
                       FROM socket
                       WHERE accountId = ${accountId}`
        await this.socketRepo.query(query)
        return "Delete done"
    }
    updateSocketId = async (accountId, socketId) => {
        let query = `UPDATE socket
                     SET socketId = '${socketId}'
                     WHERE accountId = ${accountId} `
        await this.socketRepo.query(query)
    }
}