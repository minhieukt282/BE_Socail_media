import { Request, Response } from "express";
export declare class LoginController {
    private loginController;
    constructor();
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: LoginController;
export default _default;
