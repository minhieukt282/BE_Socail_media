import {LoginService} from "../service/login-service";
import {Request, Response} from "express";

export class LoginController {
    private loginService: LoginService

    constructor() {
        this.loginService = new LoginService()
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.loginService.login(req.body)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            let respBody = await this.loginService.register(req.body)
            res.status(respBody.code).json(respBody)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}

export default new LoginController()
