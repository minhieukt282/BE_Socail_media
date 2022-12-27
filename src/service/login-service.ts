import {AccountRepo} from "../repo/accountRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {SECRET} from "../middleware/auth";
import {RandomId} from "./random-id";
import {Account} from "../model/account";

export class LoginService {
    private accountRepo: AccountRepo
    private randomId: RandomId

    constructor() {
        this.accountRepo = new AccountRepo()
        this.randomId = new RandomId()
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
            data.accountId = this.randomId.random()
            data.img = '../../public/storage/images.jpg'
            data.birthday = this.randomId.today()
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
        if (findAccount == null) {
            return {
                code: 404,
                message: "Account is not defined"
            }
        } else {
            let comparePassword = await bcrypt.compare(account.password, findAccount.password)
            if (comparePassword) {
                await this.accountRepo.changeStatus(findAccount.username, true)
                let payload = {
                    accountId: findAccount.accountId,
                    username: findAccount.username,
                    status: findAccount.status
                }
                let token = jwt.sign(payload, SECRET, {
                    expiresIn: 7 * 24 * 60 * 60 * 1000
                })
                return {
                    code: 200,
                    message: 'success',
                    data: {
                        token: token,
                        accountId: findAccount.accountId,
                        displayName: findAccount.displayName
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

    logout = async (data: AccountRequest)=>{
        let findAccount = await this.accountRepo.findByUsername(data.username)
        await this.accountRepo.changeStatus(findAccount.username, false)
        return {
            code: 200,
            message: "Logout success"
        }
    }

}
