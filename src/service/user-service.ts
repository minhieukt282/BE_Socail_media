import {Random} from "./random";
import {RelationshipRepo} from "../repo/relationshipRepo";
import {AccountRepo} from "../repo/accountRepo";

export class UserService {
    private randomId: Random
    private relationshipRepo: RelationshipRepo
    private accountRepo: AccountRepo

    constructor() {
        this.randomId = new Random()
        this.relationshipRepo = new RelationshipRepo()
        this.accountRepo = new AccountRepo()
    }

    getFriends = async (username: string): Promise<ResponseBody> => {
        let account = await this.accountRepo.findByUsername(username)
        let listFriends = await this.relationshipRepo.findAll(account[0].accountId)
        return {
            code: 200,
            message: "Success",
            data: listFriends
        }
    }
}