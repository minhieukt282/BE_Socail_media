import {AppDataSource} from "../data-source";
import {Relationship} from "../model/relationship";

export class RelationshipRepo {
    private relationshipRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.relationshipRepo = connection.getRepository(Relationship)
        })
    }

    findAll = async (): Promise<Relationship> => {
        return await this.relationshipRepo.find()
    }

    findByRelationshipId = async (relationshipId: number) => {
        return await this.relationshipRepo.find({
            where: {relationshipId: relationshipId}
        })
    }

    findByAccount = async (accountId: number) => {
        const query = `select a.accountId,
                              a.username,
                              a.displayName,
                              a.img,
                              a.birthday,
                              a.location,
                              a.status,
                              r.relationshipId,
                              r.isFriend
                       from relationship as r
                                join account a on a.accountId = r.accountReq or a.accountId = r.accountRes
                       where isFriend = true
                         and (r.accountRes = ${accountId} or r.accountReq = ${accountId})
                       group by a.accountId`
        return await this.relationshipRepo.query(query)
    }

    findById = async (accountId: number, status: boolean) => {
        if (status) {
            return await this.relationshipRepo.find({
                where: [
                    {accountReq: accountId, isFriend: status},
                    {accountRes: accountId, isFriend: status}
                ]
            })
        } else {
            return await this.relationshipRepo.find({
                where: {
                    accountRes: accountId,
                    isFriend: status
                }
            })
        }
    }

    create = async (data: FriendsRequest): Promise<number> => {
        let result = await this.relationshipRepo.save(data)
        return result.relationshipId
    }

    update = async (relationshipId: number, isFriend: boolean): Promise<string> => {
        const relationshipUpdate = await this.relationshipRepo.find({where: {relationshipId: relationshipId}})
        relationshipUpdate[0].isFriend = isFriend
        await this.relationshipRepo.save(relationshipUpdate)
        return "update done"
    }

    deleteByRelationshipId = async (relationshipId: number): Promise<string> => {
        await this.relationshipRepo.delete(relationshipId)
        return "delete done"
    }

    deleteByAccountReq = async (accountReq: number, accountRes: number): Promise<string> => {
        const query = `delete
                       from relationship
                       where (accountReq = ${accountReq} && accountRes = ${accountRes}) ||
                             (accountReq = ${accountRes} && accountRes = ${accountReq})`
        await this.relationshipRepo.query(query)
        return "delete done"
    }
}