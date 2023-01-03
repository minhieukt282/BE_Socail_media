import {AppDataSource} from "../data-source";
import {Account} from "../model/account";

export class AccountRepo {
    private accountRepo: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.accountRepo = connection.getRepository(Account)
        })
    }

    async create  (newAccount: any): Promise<Account>{
        return await this.accountRepo.save(newAccount)
    }
     async  update(username: string, data: any): Promise<void>{
        const userUpdate = await this.findByUsername(username)
        userUpdate[0].status = data
        await this.accountRepo.save(userUpdate)
    }

    async del (id: number): Promise<string>{
        await this.accountRepo.delete(id)
        return "delete done"
    }

    async findById (id: number): Promise<Account>{
        return await this.accountRepo.findOneById(id)
    }

    async findByUsername  (username: string): Promise<Account> {
        return await this.accountRepo.find({
            where: {
                username: username
            }
        })
    }
    async  findAllAccount (){
        return await this.accountRepo.find()
    }
    async updateAccount  (accountId: number, data: AccountRequest): Promise<string>{
        await this.accountRepo.update({accountId: accountId}, data)
        return "Update account done"
    }
}
