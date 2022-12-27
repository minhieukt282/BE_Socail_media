import {UserService} from "../service/user-service";
import {Request, Response} from "express";

export class UserController {
    private userController: UserService

    constructor() {
        this.userController = new UserService()
    }
    createPost= async (req:Request,res:Response)=>{
        let status = await this.userController.create(req.body)
        return res.status(status.code).json({message: status.message})
    }
    showPost = async (req:Request,res:Response)=>{
        let post = await this.userController.showPost();
        return res.status(201).json(post);
    }
    updatePost = async (req:Request,res:Response)=>{
        let idEdit= +req.params.postId;
        let post = req.body;
        let posts = await this.userController.updatePost(idEdit,post)
        return res.status(201).json(posts)
    }
    deletePost = async (req:Request,res:Response)=>{
        let posts =await this.userController.deletePost(+req.params.postId);
        return res.status(200).json(posts)
    }
}

export default new UserController()