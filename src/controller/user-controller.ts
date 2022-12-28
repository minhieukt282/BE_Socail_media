import {UserService} from "../service/user-service";
import {Request, Response} from "express";

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    createPost = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.create(req.body)
        return res.status(respBody.code).json(respBody)
    }
    showPost = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.showPost();
        return res.status(respBody.code).json(respBody);
    }
    updatePost = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.userService.updatePost(+req.params.postId, req.body)
        return res.status(respBody.code).json(respBody)
    }
    deletePost = async (req: Request, res: Response): Promise<string | any> => {
        let posts = await this.userService.deletePost(+req.params.postId);
        return res.status(200).json(posts)
    }
}

export default new UserController()