import {Random} from "./random";
import {RelationshipRepo} from "../repo/relationshipRepo";
import {AccountRepo} from "../repo/accountRepo";

export class UserService {
    private random: Random
    private relationshipRepo: RelationshipRepo
    private accountRepo: AccountRepo

    constructor() {
        this.random = new Random()
        this.relationshipRepo = new RelationshipRepo()
        this.accountRepo = new AccountRepo()
    }

    getFriends = async (accountId: number, status: boolean): Promise<any> => {
        let listAccount = await this.relationshipRepo.findById(accountId, status)
        let friendsData = []
        for (let i = 0; i < listAccount.length; i++) {
            let account = await this.accountRepo.findById(listAccount[i].accountReq)
            let friends = {
                ...account,
                relationshipId: listAccount[i].relationshipId
            }
            friendsData.push(friends)
        }
        return friendsData
    }

    showFriends = async (accountId: number): Promise<ResponseBody> => {
        let friendsData = await this.getFriends(accountId, true)
        return {
            code: 200,
            message: "Success",
            data: friendsData
        }
    }

    makeFriend = async (accountId: number, data: FriendsRequest): Promise<ResponseBody> => {
        data.accountReq = accountId
        data.accountRes = +data.accountRes
        data.relationshipId = this.random.randomNumber()
        data.isAccept = false
        let relationshipId = await this.relationshipRepo.create(data)
        return {
            code: 201,
            message: "Success",
            data: relationshipId
        }
    }

    waitingFriends = async (accountId: number): Promise<ResponseBody> => {
        let friendsData = await this.getFriends(accountId, false)
        return {
            code: 200,
            message: "Success",
            data: friendsData
        }
    }

    acceptFriend = async (relationshipId: number): Promise<ResponseBody> => {
        await this.relationshipRepo.update(relationshipId, true)
        return {
            code: 201,
            message: "Accept done"
        }
    }

    declineFriend = async (relationshipId: number): Promise<ResponseBody> => {
        await this.relationshipRepo.del(relationshipId)
        return {
            code: 201,
            message: "Decline done"
        }
    }
}