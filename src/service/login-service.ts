import {AccountRepo} from "../repo/accountRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {SECRET} from "../middleware/auth";
import {Random} from "./random";
import {SocketRepo} from "../repo/socketRepo";

export class LoginService {
    private accountRepo: AccountRepo
    private socketRepo: SocketRepo
    private random: Random

    constructor() {
        this.accountRepo = new AccountRepo()
        this.socketRepo = new SocketRepo()
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
            data.accountId = this.random.randomNumber()
            data.img = '../../public/storage/images.jpg'
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
                await this.accountRepo.update(findAccount[0].username, true)
                // await this.createSocket(findAccount[0].accountId,)
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
                        username: findAccount[0].username
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
        await this.accountRepo.update(findAccount[0].username, false)
        await this.deleteSocket(findAccount[0].accountRepo)
        return {
            code: 200,
            message: "Logout success"
        }
    }

    createSocket = async (accountId, socketId) => {
        let data = {
            id: this.random.randomNumber(),
            accountId: +accountId,
            socketId: socketId
        }
        // console.log(data)
        await this.socketRepo.create(data)
    }

    findSocket = async (accountId)=>{
        return await this.socketRepo.findSocketId(accountId)
    }

    deleteSocket = async (accountId) => {
        await this.socketRepo.delete(accountId)
    }
    updateSocket = async (accountId, socketId)=>{
        await this.socketRepo.updateSocketId(accountId, socketId)
    }
}
