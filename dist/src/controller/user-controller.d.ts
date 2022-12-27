import { Request, Response } from "express";
export declare class UserController {
    private userController;
    constructor();
    createPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updatePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deletePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: UserController;
export default _default;
