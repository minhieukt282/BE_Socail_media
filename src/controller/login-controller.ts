import {LoginService} from "../service/login-service";
import {Request, Response} from "express";

export class LoginController {
    private loginService: LoginService

    constructor() {
        this.loginService = new LoginService()
    }

    login = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.loginService.login(req.body)
        return res.status(respBody.code).json(respBody)
    }

    register = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.loginService.register(req.body)
        return res.status(respBody.code).json(respBody)
    }

    logout = async (req: Request, res: Response): Promise<string | any> => {
        let respBody = await this.loginService.logout(req.body)
        return res.status(respBody.code).json(respBody)
    }
}

export default new LoginController()
