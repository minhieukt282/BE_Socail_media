import { Request, Response } from "express";
export declare class UserController {
    private userService;
    constructor();
    showFriends: (req: Request, res: Response) => Promise<string | any>;
    makeFriend: (req: Request, res: Response) => Promise<string | any>;
    waitingFriends: (req: Request, res: Response) => Promise<string | any>;
    acceptFriend: (req: Request, res: Response) => Promise<string | any>;
    declineFriend: (req: Request, res: Response) => Promise<string | any>;
}
declare const _default: UserController;
export default _default;
