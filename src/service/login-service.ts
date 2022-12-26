import {AccountRepo} from "../repo/accountRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {SECRET} from "../middleware/auth";
import {RandomId} from "./random-id";

export class LoginService {
    private accountRepo: AccountRepo
    private randomId: RandomId

    constructor() {
        this.accountRepo = new AccountRepo()
        this.randomId = new RandomId()
    }

    register = async (data: any) => {
        let findAccount = await this.accountRepo.findByUsername(data.username)
        if (findAccount.length != 0) {
            return {
                code: 203,
                message: "Account already exists"
            }
        } else {
            data.password = await bcrypt.hash(data.password, 10)
            data.accountId = this.randomId.random()
            data.img = '../../public/storage/images.jpg'
            data.birthday = this.randomId.today()
            await this.accountRepo.create(data)
            return {
                code: 201,
                message: "Register done"
            }
        }

    }

    login = async (data: any) => {
        let account = data
        let findAccount = await this.accountRepo.findByUsername(account.username)
        if (findAccount.length == 0) {
            return {
                code: 203,
                message: "Account is not defined"
            }
        } else {
            let comparePassword = await bcrypt.compare(account.password, findAccount[0].password)
            if (comparePassword) {
                await this.accountRepo.changeStatus(findAccount[0].username, "true")
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
                    message: {
                        token: token,
                        accountId: findAccount[0].accountId,
                        display_name: findAccount[0].display_name
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

    logout = async (data: any)=>{
        let findAccount = await this.accountRepo.findByUsername(data.username)
        await this.accountRepo.changeStatus(findAccount[0].username, "false")
        return {
            code: 200,
            message: "Logout success"
        }
    }

}