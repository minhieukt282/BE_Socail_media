import {SocketRepo} from "../repo/socketRepo";
import {Random} from "./random";

export class SocketService {
    private socketRepo: SocketRepo
    private random: Random


    constructor() {
        this.socketRepo = new SocketRepo()
        this.random = new Random()
    }

    createSocket = async (accountId, socketId) => {
        let data = {
            // id: this.random.randomNumber(),
            accountId: +accountId,
            socketId: socketId
        }
        await this.socketRepo.create(data)
    }

    updateSocket = async (accountId, socketId) => {
        await this.socketRepo.updateSocketId(accountId, socketId)
    }

    findSocket = async (accountId) => {
        return await this.socketRepo.findSocketId(accountId)
    }

    deleteSocket = async (accountId) => {
        await this.socketRepo.delete(accountId)
    }

}