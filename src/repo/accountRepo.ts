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

    update = async (data: AccountRequest): Promise<string> => {
        await this.accountRepo.save(data)
        return "update done"
    }

    del = async (accountId: number): Promise<string> => {
        await this.accountRepo.delete(accountId)
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
}