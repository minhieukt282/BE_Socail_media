"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepo = void 0;
const data_source_1 = require("../data-source");
const account_1 = require("../model/account");
class AccountRepo {
    constructor() {
        this.create = async (newAccount) => {
            await this.accountRepo.save(newAccount);
        };
        this.updatePassword = async (newPassword, id) => {
            let query = `UPDATE account
                     SET password = '${newPassword}'
                     WHERE account_id = ${id}`;
            await this.accountRepo.query(query);
        };
        this.updateName = async (newName, id) => {
            let query = `UPDATE account
                     SET display_name = '${newName}'
                     WHERE account_id = ${id}`;
            await this.accountRepo.query(query);
        };
        this.del = async (id) => {
            await this.accountRepo.delete(id);
        };
        this.findById = async (id) => {
            return await this.accountRepo.findOneById(id);
        };
        this.findByUsername = async (username) => {
            return await this.accountRepo.find({
                where: {
                    username: username
                }
            });
        };
        this.changeStatus = async (username) => {
            let query = `update account
                     set status = true
                     where username = '${username}'`;
            return await this.accountRepo.query(query);
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            this.accountRepo = connection.getRepository(account_1.Account);
        });
    }
}
exports.AccountRepo = AccountRepo;
//# sourceMappingURL=accountRepo.js.map