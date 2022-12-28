"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const random_1 = require("./random");
const relationshipRepo_1 = require("../repo/relationshipRepo");
const accountRepo_1 = require("../repo/accountRepo");
class UserService {
    constructor() {
        this.getFriends = async (accountId, status) => {
            let listAccount = await this.relationshipRepo.findById(accountId, status);
            let friendsData = [];
            for (let i = 0; i < listAccount.length; i++) {
                let account = await this.accountRepo.findById(listAccount[i].accountReq);
                let friends = Object.assign(Object.assign({}, account), { relationshipId: listAccount[i].relationshipId });
                friendsData.push(friends);
            }
            return friendsData;
        };
        this.showFriends = async (accountId) => {
            let friendsData = await this.getFriends(accountId, true);
            return {
                code: 200,
                message: "Success",
                data: friendsData
            };
        };
        this.makeFriend = async (data) => {
            data.accountReq = +data.accountReq;
            data.accountRes = +data.accountRes;
            data.relationshipId = this.random.randomNumber();
            data.isAccept = false;
            let relationshipId = await this.relationshipRepo.create(data);
            return {
                code: 201,
                message: "Success",
                data: relationshipId
            };
        };
        this.waitingFriends = async (accountId) => {
            let friendsData = await this.getFriends(accountId, false);
            return {
                code: 200,
                message: "Success",
                data: friendsData
            };
        };
        this.acceptFriend = async (relationshipId) => {
            await this.relationshipRepo.update(relationshipId, true);
            return {
                code: 201,
                message: "Accept done"
            };
        };
        this.declineFriend = async (relationshipId) => {
            await this.relationshipRepo.del(relationshipId);
            return {
                code: 201,
                message: "Decline done"
            };
        };
        this.random = new random_1.Random();
        this.relationshipRepo = new relationshipRepo_1.RelationshipRepo();
        this.accountRepo = new accountRepo_1.AccountRepo();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map