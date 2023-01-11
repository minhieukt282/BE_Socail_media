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

    tokenLife = (days: number) => {
        return days * 24 * 60 * 60 * 1000
    }

    register = async (data: AccountRequest): Promise<ResponseBody> => {
        let findAccount = await this.accountRepo.findByUsername(data.username)
        if (findAccount[0] != undefined) {
            return {
                code: 200,
                message: "Account already exists"
            }
        } else {
            data.password = await bcrypt.hash(data.password, 10)
            data.img = 'https://firebasestorage.googleapis.com/v0/b/image-c737d.appspot.com/o/images%2Fimages.jpg0c8e102d-88a1-4a36-8715-08c4cd6a4966?alt=media&token=7b526c61-f551-470a-9752-77397b608496'
            data.birthday = this.random.getTime()
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
                code: 200,
                message: "Account is not defined"
            }
        } else {
            let comparePassword = await bcrypt.compare(account.password, findAccount[0].password)
            if (comparePassword) {
                let payload = {
                    accountId: findAccount[0].accountId
                }
                let token = jwt.sign(payload, SECRET, {
                    expiresIn: this.tokenLife(7)
                })
                return {
                    code: 200,
                    message: 'success',
                    data: {
                        token: token,
                        accountId: findAccount[0].accountId,
                        displayName: findAccount[0].displayName,
                        username: findAccount[0].username,
                        imgAvt: findAccount[0].img
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
}
