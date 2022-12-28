"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipRepo = void 0;
const data_source_1 = require("../data-source");
const relationship_1 = require("../model/relationship");
class RelationshipRepo {
    constructor() {
        this.findById = async (accountId, status) => {
            if (status) {
                return await this.relationshipRepo.find({
                    where: [
                        { accountReq: accountId, isAccept: status },
                        { accountRes: accountId, isAccept: status }
                    ]
                });
            }
            else {
                return await this.relationshipRepo.find({
                    where: {
                        accountRes: accountId,
                        isAccept: status
                    }
                });
            }
        };
        this.create = async (data) => {
            let result = await this.relationshipRepo.save(data);
            return result.relationshipId;
        };
        this.update = async (relationshipId, data) => {
            const relationshipUpdate = await this.relationshipRepo.find({ where: { relationshipId: relationshipId } });
            relationshipUpdate[0].isAccept = data;
            await this.relationshipRepo.save(relationshipUpdate);
            return "Update done";
        };
        this.del = async (relationshipId) => {
            await this.relationshipRepo.delete(relationshipId);
            return "Delete done";
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            this.relationshipRepo = connection.getRepository(relationship_1.Relationship);
        });
    }
}
exports.RelationshipRepo = RelationshipRepo;
//# sourceMappingURL=relationshipRepo.js.map