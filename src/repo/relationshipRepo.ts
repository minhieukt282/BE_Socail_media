import {AppDataSource} from "../data-source";
import {Relationship} from "../model/relationship";

export class RelationshipRepo {
    private relationshipRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.relationshipRepo = connection.getRepository(Relationship)
        })
    }

    findAll = async (id: string) => {
        return await this.relationshipRepo.find({where: {accountIdOne: id}})
    }

}