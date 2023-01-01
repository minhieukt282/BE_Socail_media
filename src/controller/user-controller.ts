import {UserService} from "../service/user-service";
import {Request, Response} from "express";

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService();
    }

    showFriends = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.showFriends(+req.params.accountId)
        return res.status(respBody.code).json(respBody)
    }

    makeFriend = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.makeFriend(req.body)
        return res.status(respBody.code).json(respBody)
    }

    waitingFriends = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.waitingFriends(+req.params.accountRes)
        return res.status(respBody.code).json(respBody)
    }

    acceptFriend = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.acceptFriend(+req.params.relationshipId)
        return res.status(respBody.code).json(respBody)
    }

    declineFriend = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.declineFriend(+req.params.relationshipId)
        return res.status(respBody.code).json(respBody)
    }

    createPost = async (req: Request, res: Response): Promise<string | any> => {
        try {
            let respBody = await this.userService.create(req.body);
            res.status(respBody.code).json(respBody.message)
        }catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
    showPost = async (req: Request, res: Response): Promise<string | any> => {
        try{
            let respBody = await this.userService.showPost();
            return res.status(respBody.code).json(respBody);
        }catch (e){
            res.status(500).json({
                message: e.message
            })
        }
    }
    updatePost = async (req: Request, res: Response): Promise<string | any> => {
        try {
            let respBody = await this.userService.updatePost(+req.params.postId, req.body)
            return res.status(respBody.code).json(respBody)
        }catch (e){
            res.status(500).json({
                message: e.message
            })
        }
    }
    deletePost = async (req: Request, res: Response): Promise<string | any> => {
        try {
            let respBody = await this.userService.deletePost(+req.params.postId);
            return res.status(respBody.code).json(respBody)
        }catch (e){
            res.status(500).json({
                message: e.message
            })
        }
    }
    // showAccount = async (req: Request, res: Response): Promise<string | any> => {
    //     try{
    //         let respBody = await this.userService.showAccount();
    //         return res.status(respBody.code).json(respBody);
    //     }catch (e){
    //         res.status(500).json({
    //             message: e.message
    //         })
    //     }
    // }
}

export default new UserController()