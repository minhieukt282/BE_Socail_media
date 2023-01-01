
import {RelationshipRepo} from "../repo/relationshipRepo";
import {AccountRepo} from "../repo/accountRepo";
import {Random} from "./random";
import {PostRepo} from "../repo/postRepo";

export class UserService {
    private random: Random;
    private relationshipRepo: RelationshipRepo;
    private accountRepo: AccountRepo;
    private postRepo: PostRepo;

    constructor() {
        this.random = new Random();
        this.relationshipRepo = new RelationshipRepo();
        this.accountRepo = new AccountRepo();
        this.postRepo = new PostRepo();
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
        return friendsData;
    }

    showFriends = async (accountId: number): Promise<ResponseBody> => {
        let friendsData = await this.getFriends(accountId, true)
        return {
            code: 200,
            message: "Success",
            data: friendsData
        }
    }

    makeFriend = async (data: FriendsRequest): Promise<ResponseBody> => {
        data.accountReq = +data.accountReq
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

    async create(data: PostsRequest): Promise<ResponseBody> {
            data.postId = this.random.randomNumber();
            data.timeUpdate = this.random.randomTime();
            let message = await this.postRepo.create(data)
            return {
                code: 201,
                message: message
            }

    }
    showPost = async (): Promise<ResponseBody> => {
        let posts = await this.postRepo.findAll()
        return {
            code: 200,
            message: "Success",
            data: posts
        }
    }

    updatePost = async (postId: number, data: PostsRequest): Promise<ResponseBody> => {
        let message = await this.postRepo.update(postId, data)
        return {
            code: 200,
            message: message
        }
    }

    deletePost = async (postId): Promise<ResponseBody> => {
        let message = await this.postRepo.delete(postId);
        return {
            code: 200,
            message: message
        }
    }
    // showAccount = async (): Promise<ResponseBody> => {
    //     let accounts = await this.postRepo.findAllAccount()
    //     return {
    //         code: 200,
    //         message: "Success",
    //         data: accounts
    //     }
    // }
}