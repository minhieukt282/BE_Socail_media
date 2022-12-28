import {UserService} from "../service/user-service";
import {Request, Response} from "express";

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
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
}

export default new UserController()