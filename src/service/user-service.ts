import {PostRepo} from "../repo/postRepo";
import {Random} from "./random";
import {RelationshipRepo} from "../repo/relationshipRepo";
import {AccountRepo} from "../repo/accountRepo";
import {NotificationRepo} from "../repo/notificationRepo";
import {LikeRepo} from "../repo/likeRepo";
import {LikePost} from "../model/like-post";
import {Post} from "../model/post";
import {Comment} from "../model/comment";
import {CommentRepo} from "../repo/commentRepo";

export class UserService {
    private random: Random
    private relationshipRepo: RelationshipRepo
    private accountRepo: AccountRepo
    private postRepo: PostRepo
    private notificationRepo: NotificationRepo
    private likeRepo: LikeRepo
    private commentRepo: CommentRepo

    constructor() {
        this.random = new Random()
        this.relationshipRepo = new RelationshipRepo()
        this.accountRepo = new AccountRepo()
        this.postRepo = new PostRepo()
        this.notificationRepo = new NotificationRepo()
        this.likeRepo = new LikeRepo()
        this.commentRepo = new CommentRepo()
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
        const friendsData = await this.relationshipRepo.findByAccount(accountId)
        return {
            code: 200,
            message: "success",
            data: friendsData
        }
    }

    makeFriend = async (accountId: number, data: FriendsRequest): Promise<ResponseBody> => {
        data.accountReq = accountId
        data.accountRes = +data.accountRes
        const relationshipId = await this.relationshipRepo.create(data)
        return {
            code: 201,
            message: "success",
            data: relationshipId
        }
    }

    waitingFriends = async (accountId: number): Promise<ResponseBody> => {
        const friendsData = await this.getFriends(accountId, false)
        return {
            code: 200,
            message: "success",
            data: friendsData
        }
    }

    acceptFriend = async (relationshipId: number): Promise<ResponseBody> => {
        const message = await this.relationshipRepo.update(relationshipId, true)
        return {
            code: 200,
            message: message
        }
    }

    declineFriend = async (relationshipId: number): Promise<ResponseBody> => {
        const message = await this.relationshipRepo.deleteByRelationshipId(relationshipId)
        return {
            code: 200,
            message: message
        }
    }

    unfriend = async (accountReq: number, accountRes: number): Promise<ResponseBody> => {
        const message = await this.relationshipRepo.deleteByAccountReq(accountReq, accountRes)
        return {
            code: 200,
            message: message
        }
    }

    showRelationship = async (): Promise<ResponseBody> => {
        const relationships = await this.relationshipRepo.findAll()
        return {
            code: 200,
            message: "success",
            data: relationships
        }
    }

    createPost = async (data: PostRequest): Promise<ResponseBody> => {
        if (!data.accountId) {
            throw new Error('Account ID is required!');
        }
        const account = await this.accountRepo.findById(data.accountId);
        if (account == null) {
            throw new Error('Account not found');
        }
        const post = new Post();
        post.account = account;
        post.status = data.status;
        post.content = data.content;
        post.img = data.img;
        await this.postRepo.savePost(post)
        const listPost = await this.postRepo.findAll()
        return {
            code: 201,
            message: "success",
            data: listPost[0]
        }
    }

    showPost = async (): Promise<ResponseBody> => {
        const posts = await this.postRepo.findAll()
        return {
            code: 200,
            message: "success",
            data: posts
        }
    }

    updatePost = async (postId: number, data: PostRequest): Promise<ResponseBody> => {
        const message = await this.postRepo.update(postId, data)
        const dataUpdate = await this.postRepo.findById(postId)
        return {
            code: 200,
            message: message,
            data: dataUpdate
        }
    }

    deletePost = async (postId): Promise<ResponseBody> => {
        let message = await this.postRepo.delete(postId);
        return {
            code: 200,
            message: message
        }
    }

    createNotification = async (dataNotice: NoticeRequest): Promise<ResponseBody> => {
        if (dataNotice.type === "liked") {
            dataNotice.content = `${dataNotice.type} your status`
        }
        if (dataNotice.type === "commented") {
            dataNotice.content = `${dataNotice.type} on your status`
        }
        if (dataNotice.type === "friends") {
            dataNotice.content = ` has accepted your friend request`
        }
        if (dataNotice.type === "addFriends") {
            dataNotice.content = ` sent a friend request`
        }
        const message = await this.notificationRepo.create(dataNotice)
        return {
            code: 201,
            message: message
        }
    }

    showNotification = async (): Promise<ResponseBody> => {
        const listNotification = await this.notificationRepo.findAll()
        return {
            code: 200,
            message: "success",
            data: listNotification
        }
    }
    deleteNotification = async (data: any): Promise<ResponseBody> => {
        const message = await this.notificationRepo.delete(data)
        return {
            code: 200,
            message: message
        }
    }

    createLike = async (dataLike: LikeRequest): Promise<ResponseBody> => {
        const post: Post = await this.postRepo.findOne(dataLike.postPostId);
        const like = new LikePost();
        like.accountId = dataLike.accountId;
        like.displayName = dataLike.displayName;
        like.post = post;
        const message = await this.likeRepo.save(like)
        return {
            code: 201,
            message: message
        }
    }
    showLike = async (): Promise<ResponseBody> => {
        const data = await this.likeRepo.findAll()
        return {
            code: 200,
            message: "success",
            data: data
        }
    }

    showCountLike = async (): Promise<ResponseBody> => {
        const countLike = await this.likeRepo.findCountLike()
        return {
            code: 200,
            message: "success",
            data: countLike
        }
    }

    deleteLike = async (dataLike: any): Promise<ResponseBody> => {
        const message = await this.likeRepo.delete(dataLike)
        return {
            code: 200,
            message: message
        }
    }

    createComment = async (dataComment: CommentRequest): Promise<ResponseBody> => {
        const post: Post = await this.postRepo.findOne(dataComment.postPostId);
        const comment = new Comment();
        comment.accountId = dataComment.accountId;
        comment.displayName = dataComment.displayName;
        comment.img = dataComment.img;
        comment.comment = dataComment.comment;
        comment.post = post;
        const message = await this.commentRepo.save(comment)
        return {
            code: 201,
            message: message
        }
    }

    deleteComment = async (dataComment: any): Promise<ResponseBody> => {
        const message = await this.commentRepo.delete(dataComment)
        return {
            code: 200,
            message: message
        }
    }


    showAccount = async (accountId: number): Promise<ResponseBody> => {
        const accountInfo = await this.accountRepo.findById(accountId)
        return {
            code: 200,
            message: "success",
            data: accountInfo
        }
    }

    updateAccount = async (accountId, data: AccountRequest): Promise<ResponseBody> => {
        const message = await this.accountRepo.update(accountId, data)
        const dataUpdate = await this.accountRepo.findByIdUpdate(accountId)
        return {
            code: 200,
            message: message,
            data: dataUpdate
        }
    }


    search = async (searchKey: string): Promise<ResponseBody> => {
        const accounts = await this.accountRepo.searchAccount(searchKey)
        const posts = await this.postRepo.searchPost(searchKey)
        return {
            code: 200,
            message: "success",
            data: {
                listAccount: accounts,
                listPost: posts
            }
        }
    }
}
