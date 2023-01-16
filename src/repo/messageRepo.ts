import {AppDataSource} from "../data-source";
import {Message} from "../model/message";
import {query} from "express";


export class MessageRepo {
    private messageRepo: any;

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.messageRepo = connection.getRepository(Message)
        })
    }

    create = async (dataMessage) => {
        await this.messageRepo.save(dataMessage)
    }

    findAll = async () => {
        return this.messageRepo.find({
            order: {
                timeSent: "ASC"
            }
        })
    }

    findByAccountId = async (accountId, timeSent) => {
        return this.messageRepo.find({
            where: {
                accountId: accountId,
                timeSent: timeSent
            }
        })
    }

    findByRoomId = async (roomId) => {
        return this.messageRepo.find({
            where: {
                roomId: roomId
            }
        })
    }

}