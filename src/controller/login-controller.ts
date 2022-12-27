import {LoginService} from "../service/login-service";
import {Request, Response} from "express";

export class LoginController {
    private loginController: LoginService

    constructor() {
        this.loginController = new LoginService()
    }

    login = async (req: Request, res: Response) => {
        let status = await this.loginController.login(req.body)
        return res.status(status.code).json({message: status.message})
    }

    register = async (req: Request, res: Response) => {
        let status = await this.loginController.register(req.body)
        return res.status(status.code).json({message: status.message})
    }
    logout = async (req: Request, res: Response) => {
        let status = await this.loginController.logout(req.body)
        return res.status(status.code).json({message: status.message})
    }
}

export default new LoginController()