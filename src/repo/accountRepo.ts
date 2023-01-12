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


    update = async (accountId: number, data: AccountRequest): Promise<string> => {
        await this.accountRepo.update({accountId: accountId}, data)
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

    findByIdUpdate = async (accountId: number): Promise<AccountRepo> => {
        let query = `
            select *from account
            where accountId = ${accountId};
        `
        return await this.accountRepo.query(query)
    }

    searchAccount = async (searchKey: string): Promise<Account> => {
        const query = `select *
                       from account
                       where displayName like '%${searchKey}%' || username like '%${searchKey}%'`
        return await this.accountRepo.query(query)
    }
}
