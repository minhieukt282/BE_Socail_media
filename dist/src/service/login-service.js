"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const accountRepo_1 = require("../repo/accountRepo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const random_id_1 = require("./random-id");
class LoginService {
    constructor() {
        this.register = async (data) => {
            let findAccount = await this.accountRepo.findByUsername(data.username);
            if (findAccount.length != 0) {
                return {
                    code: 203,
                    message: "Account already exists"
                };
            }
            else {
                data.password = await bcrypt_1.default.hash(data.password, 10);
                data.accountId = this.randomId.random();
                data.img = '../../public/storage/images.jpg';
                data.birthday = this.randomId.today();
                await this.accountRepo.create(data);
                return {
                    code: 201,
                    message: "Register done"
                };
            }
        };
        this.login = async (data) => {
            let account = data;
            let findAccount = await this.accountRepo.findByUsername(account.username);
            if (findAccount.length == 0) {
                return {
                    code: 203,
                    message: "Account is not defined"
                };
            }
            else {
                let comparePassword = await bcrypt_1.default.compare(account.password, findAccount[0].password);
                if (comparePassword) {
                    await this.accountRepo.changeStatus(findAccount[0].username);
                    let payload = {
                        accountId: findAccount[0].accountId,
                        username: findAccount[0].username,
                        status: findAccount[0].status
                    };
                    let token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 7 * 24 * 60 * 60 * 1000
                    });
                    return {
                        code: 200,
                        message: {
                            token: token,
                            accountId: findAccount[0].accountId,
                            display_name: findAccount[0].display_name
                        }
                    };
                }
                else {
                    return {
                        code: 200,
                        message: "Wrong password"
                    };
                }
            }
        };
        this.accountRepo = new accountRepo_1.AccountRepo();
        this.randomId = new random_id_1.RandomId();
    }
}
exports.LoginService = LoginService;
exports.default = new LoginService();
//# sourceMappingURL=login-service.js.map