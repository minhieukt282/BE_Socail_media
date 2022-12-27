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
    updatePassword = async (newPassword: string, id: number) => {
        let query = `UPDATE account
                     SET password = '${newPassword}'
                     WHERE account_id = ${id}`
        await this.accountRepo.query(query)
    }
    updateName = async (newName: string, id: number) => {
        let query = `UPDATE account
                     SET display_name = '${newName}'
                     WHERE account_id = ${id}`
        await this.accountRepo.query(query)
    }
    del = async (id: number) => {
        await this.accountRepo.delete(id)
    }

    findById = async (id: number) => {
        return await this.accountRepo.findOneById(id)
    }

    findByUsername = async (username: string): Promise<Account> => {
        return await this.accountRepo.find({
            where: {
                username: username
            }
        })
    }
    changeStatus = async (username: string, status: boolean): Promise<void> => {
        let query = `update account
                     set status = ${status}
                     where username = '${username}'`
        await this.accountRepo.query(query)
    }

}
