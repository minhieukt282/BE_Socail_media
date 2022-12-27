import {AccountRepo} from "../repo/accountRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {SECRET} from "../middleware/auth";
import {Random} from "./random";

export class LoginService {
    private accountRepo: AccountRepo
    private random: Random

    constructor() {
        this.accountRepo = new AccountRepo()
        this.random = new Random()
    }

    register = async (data: AccountRequest): Promise<ResponseBody> => {
        let findAccount = await this.accountRepo.findByUsername(data.username)
        if (findAccount != null) {
            return {
                code: 409,
                message: "Account already exists"
            }
        } else {
            data.password = await bcrypt.hash(data.password, 10)
            data.accountId = this.random.randomNumber()
            data.img = '../../public/storage/images.jpg'
            data.birthday = this.random.randomTime()
            const account = await this.accountRepo.create(data)
            return {
                code: 201,
                message: "Register done",
                data: account
            }
        }

    }

    login = async (account: LoginRequest): Promise<ResponseBody> => {
        let findAccount = await this.accountRepo.findByUsername(account.username)
        if (findAccount[0] == null) {
            return {
                code: 404,
                message: "Account is not defined"
            }
        } else {
            let comparePassword = await bcrypt.compare(account.password, findAccount[0].password)
            if (comparePassword) {
                await this.accountRepo.changeStatus(findAccount[0].username, true)
                let payload = {
                    accountId: findAccount[0].accountId,
                    username: findAccount[0].username,
                    status: findAccount[0].status
                }
                let token = jwt.sign(payload, SECRET, {
                    expiresIn: 7 * 24 * 60 * 60 * 1000
                })
                return {
                    code: 200,
                    message: 'success',
                    data: {
                        token: token,
                        accountId: findAccount[0].accountId,
                        displayName: findAccount[0].displayName
                    }
                }
            } else {
                return {
                    code: 200,
                    message: "Wrong password"
                }
            }
        }
    }

    logout = async (data: AccountRequest): Promise<ResponseBody> => {
        let findAccount = await this.accountRepo.findByUsername(data.username)
        await this.accountRepo.changeStatus(findAccount[0].username, false)
        return {
            code: 200,
            message: "Logout success"
        }
    }

}
