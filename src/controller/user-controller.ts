import {UserService} from "../service/user-service";
import {Request, Response} from "express";

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    showFriends = async (req: Request | any, res: Response): Promise<void> => {
        try {
            let accountId
            if (+req.params.accountId !== +req.decode.accountId) {
                accountId = +req.params.accountId
            } else {
                accountId = +req.decode.accountId
            }
            let respBody = await this.userService.showFriends(accountId)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    makeFriend = async (req: Request | any, res: Response): Promise<void> => {
        try {
            let accountId = req.decode.accountId
            let respBody = await this.userService.makeFriend(accountId, req.body)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    waitingFriends = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.waitingFriends(+req.params.accountRes)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    acceptFriend = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.acceptFriend(+req.params.relationshipId)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    declineFriend = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.declineFriend(+req.params.relationshipId)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    unfriend = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.unfriend(+req.params.accountReq, +req.params.accountRes)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    showRelationship = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.showRelationship()
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    createPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const post: PostRequest = req.body;
            res.status(201).json(await this.userService.createPost(post))
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    showPost = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.showPost();
            res.status(respBody.code).json(respBody);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    updatePost = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.updatePost(+req.params.postId, req.body)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    deletePost = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.deletePost(+req.params.postId);
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    createNotification = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.createNotification(req.body);
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    showNotification = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.showNotification();
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    deleteNotification = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.deleteNotification(req.params);
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    createLike = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.createLike(req.body);
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    showLike = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.showLike();
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    showCountLike = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.showCountLike();
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    deleteLike = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.deleteLike(req.params);
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    createComment = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.createComment(req.body);
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
    deleteComment = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.userService.deleteComment(req.params);
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    showAccount = async (req: Request, res: Response): Promise<string | any> => {
        try {
            let respBody = await this.userService.showAccount(+req.params.accountId);
            return res.status(respBody.code).json(respBody);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    search = async (req: Request, res: Response): Promise<string | any> => {
        try {
            let respBody = await this.userService.search(req.params.search);
            return res.status(respBody.code).json(respBody);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    createMessage = async (req: Request, res: Response): Promise<string | any> => {
        try {
            let respBody = await this.userService.createMessage(req.body);
            return res.status(respBody.code).json(respBody);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    showMessage = async (req: Request, res: Response): Promise<string | any> => {
        try {
            let respBody = await this.userService.showMessage();
            return res.status(respBody.code).json(respBody);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}

export default new UserController()
