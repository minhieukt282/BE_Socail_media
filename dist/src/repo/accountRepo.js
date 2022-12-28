"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepo = void 0;
const data_source_1 = require("../data-source");
const account_1 = require("../model/account");
class AccountRepo {
    constructor() {
        this.create = async (newAccount) => {
            return await this.accountRepo.save(newAccount);
        };
        this.update = async (username, data) => {
            const userUpdate = await this.findByUsername(username);
            userUpdate[0].status = data;
            await this.accountRepo.save(userUpdate);
        };
        this.del = async (id) => {
            await this.accountRepo.delete(id);
            return "delete done";
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
        data_source_1.AppDataSource.initialize().then(connection => {
            this.accountRepo = connection.getRepository(account_1.Account);
        });
    }
}
exports.AccountRepo = AccountRepo;
//# sourceMappingURL=accountRepo.js.map