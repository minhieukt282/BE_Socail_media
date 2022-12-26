"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const login_service_1 = require("../service/login-service");
class LoginController {
    constructor() {
        this.login = async (req, res) => {
            let status = await this.loginController.login(req.body);
            return res.status(status.code).json({ message: status.message });
        };
        this.register = async (req, res) => {
            let status = await this.loginController.register(req.body);
            return res.status(status.code).json({ message: status.message });
        };
        this.loginController = new login_service_1.LoginService();
    }
}
exports.LoginController = LoginController;
exports.default = new LoginController();
//# sourceMappingURL=login-controller.js.map