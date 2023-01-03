import {AppDataSource} from "../data-source";
import {Relationship} from "../model/relationship";

export class RelationshipRepo {
    private relationshipRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.relationshipRepo = connection.getRepository(Relationship)
        })
    }

    findById = async (accountId: number, status: boolean) => {
        if (status) {
            return await this.relationshipRepo.find({
                where: [
                    {accountReq: accountId, isAccept: status},
                    {accountRes: accountId, isAccept: status}
                ]
            })
        } else {
            return await this.relationshipRepo.find({
                where: {
                    accountRes: accountId,
                    isAccept: status
                }
            })
        }
    }

    create = async (data: any): Promise<number> => {
        let result = await this.relationshipRepo.save(data)
        return result.relationshipId
    }

    update = async (relationshipId: number, data: any): Promise<string> => {
        const relationshipUpdate = await this.relationshipRepo.find({where: {relationshipId: relationshipId}})
        relationshipUpdate[0].isAccept = data
        await this.relationshipRepo.save(relationshipUpdate)
        return "Update done"
    }

    del = async (relationshipId: number): Promise<string> => {
        await this.relationshipRepo.delete(relationshipId)
        return "Delete done"
    }


}