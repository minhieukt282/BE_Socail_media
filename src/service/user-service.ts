import {RandomId} from "./random-id";
import {RelationshipRepo} from "../repo/relationshipRepo";
import {AccountRepo} from "../repo/accountRepo";

export class UserService {
    private randomId: RandomId
    private relationshipService: RelationshipRepo
    private accountService: AccountRepo

    constructor() {
        this.randomId = new RandomId()
        this.relationshipService = new RelationshipRepo()
        this.accountService = new AccountRepo()
    }

    getFriends = async (username: string)=>{
        let account = await this.accountService.findByUsername(username)
        let listFriends = await this.relationshipService.findAll(account[0].accountId)
        console.log(listFriends)
    }

}