"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipRepo = void 0;
const data_source_1 = require("../data-source");
const relationship_1 = require("../model/relationship");
class RelationshipRepo {
    constructor() {
        this.findAll = async (id) => {
            return await this.relationshipRepo.find({ where: { accountIdOne: id } });
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            this.relationshipRepo = connection.getRepository(relationship_1.Relationship);
        });
    }
}
exports.RelationshipRepo = RelationshipRepo;
//# sourceMappingURL=relationshipRepo.js.map