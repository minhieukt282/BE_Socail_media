import {UserService} from "../service/user-service";
import {Request, Response} from "express";

export class UserController {
    private userController: UserService

    constructor() {
        this.userController = new UserService()
    }

    showFriends = async (req: Request, res: Response) => {
        let listFriends = await this.userController.getFriends(req.params.username)
    }
}

export default new UserController()