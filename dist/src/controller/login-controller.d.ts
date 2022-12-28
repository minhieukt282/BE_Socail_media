import { Request, Response } from "express";
export declare class LoginController {
    private loginService;
    constructor();
    login: (req: Request, res: Response) => Promise<string | any>;
    register: (req: Request, res: Response) => Promise<string | any>;
    logout: (req: Request, res: Response) => Promise<string | any>;
}
declare const _default: LoginController;
export default _default;
