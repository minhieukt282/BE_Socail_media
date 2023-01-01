import {AppDataSource} from "../data-source";
import {Account} from "../model/account";

export class AccountRepo{
    private accountRepo: any;

    constructor() {
        AppDataSource.initialize().then(connection=>{
            this.accountRepo = connection.getRepository(Account)
        }).catch(e=>{
            console.log('err')
        })
    }
     // async findAllAccount(){
     //
     // }
}