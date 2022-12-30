import {AppDataSource} from "../data-source";
import {Account} from "../model/account";

export class AccountRepo {
    private accountRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.accountRepo = connection.getRepository(Account)
        })
    }

    create = async (newAccount: any): Promise<Account> => {
        return await this.accountRepo.save(newAccount)
    }

    update = async (username: string, data: any): Promise<void> => {
        const userUpdate = await this.findByUsername(username)
        userUpdate[0].status = data
        await this.accountRepo.save(userUpdate)
    }

    del = async (id: number): Promise<string> => {
        await this.accountRepo.delete(id)
        return "delete done"
    }

    findById = async (id: number): Promise<Account> => {
        return await this.accountRepo.findOneById(id)
    }

    findByUsername = async (username: string): Promise<Account> => {
        return await this.accountRepo.find({
            where: {
                username: username
            }
        })
    }
    changeStatus = async (username: string, status: string) => {
        let query = `update account
                     set status = ${status}
                     where username = '${username}'`
        return await this.accountRepo.query(query)
    }

}