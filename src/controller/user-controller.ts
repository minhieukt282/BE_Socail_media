import {UserService} from "../service/user-service";
import {Request, Response} from "express";

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    showFriends = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.getFriends(req.params.username)
        return res.status(respBody.code).json(respBody)
    }
}

export default new UserController()