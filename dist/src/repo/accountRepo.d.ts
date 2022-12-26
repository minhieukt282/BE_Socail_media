export declare class AccountRepo {
    private accountRepo;
    constructor();
    create: (newAccount: any) => Promise<void>;
    updatePassword: (newPassword: string, id: number) => Promise<void>;
    updateName: (newName: string, id: number) => Promise<void>;
    del: (id: number) => Promise<void>;
    findById: (id: number) => Promise<any>;
    findByUsername: (username: string) => Promise<any>;
    changeStatus: (username: string, status: string) => Promise<any>;
}
