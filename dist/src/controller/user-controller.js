"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
class UserController {
    constructor() {
        this.showFriends = async (req, res) => {
            let respBody = await this.userService.showFriends(+req.params.accountId);
            return res.status(respBody.code).json(respBody);
        };
        this.makeFriend = async (req, res) => {
            let respBody = await this.userService.makeFriend(req.body);
            return res.status(respBody.code).json(respBody);
        };
        this.waitingFriends = async (req, res) => {
            let respBody = await this.userService.waitingFriends(+req.params.accountRes);
            return res.status(respBody.code).json(respBody);
        };
        this.acceptFriend = async (req, res) => {
            let respBody = await this.userService.acceptFriend(+req.params.relationshipId);
            return res.status(respBody.code).json(respBody);
        };
        this.declineFriend = async (req, res) => {
            let respBody = await this.userService.declineFriend(+req.params.relationshipId);
            return res.status(respBody.code).json(respBody);
        };
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map