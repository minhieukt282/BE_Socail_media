import { Account } from "../model/account";
export declare class AccountRepo {
    private accountRepo;
    constructor();
    create: (newAccount: any) => Promise<Account>;
    update: (username: string, data: any) => Promise<void>;
    del: (id: number) => Promise<string>;
    findById: (id: number) => Promise<Account>;
    findByUsername: (username: string) => Promise<Account>;
}
