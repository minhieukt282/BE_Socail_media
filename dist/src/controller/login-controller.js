"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const login_service_1 = require("../service/login-service");
class LoginController {
    constructor() {
        this.login = async (req, res) => {
            let respBody = await this.loginService.login(req.body);
            return res.status(respBody.code).json(respBody);
        };
        this.register = async (req, res) => {
            let respBody = await this.loginService.register(req.body);
            return res.status(respBody.code).json(respBody);
        };
        this.logout = async (req, res) => {
            let respBody = await this.loginService.logout(req.body);
            return res.status(respBody.code).json(respBody);
        };
        this.loginService = new login_service_1.LoginService();
    }
}
exports.LoginController = LoginController;
exports.default = new LoginController();
//# sourceMappingURL=login-controller.js.map