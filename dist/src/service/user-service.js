"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const random_id_1 = require("./random-id");
const relationshipRepo_1 = require("../repo/relationshipRepo");
const accountRepo_1 = require("../repo/accountRepo");
class UserService {
    constructor() {
        this.getFriends = async (username) => {
            let account = await this.accountService.findByUsername(username);
            let listFriends = await this.relationshipService.findAll(account[0].accountId);
            console.log(listFriends);
        };
        this.randomId = new random_id_1.RandomId();
        this.relationshipService = new relationshipRepo_1.RelationshipRepo();
        this.accountService = new accountRepo_1.AccountRepo();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map