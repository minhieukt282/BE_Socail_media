export declare class LoginService {
    private accountRepo;
    private randomId;
    constructor();
    register: (data: any) => Promise<{
        code: number;
        message: string;
    }>;
    login: (data: any) => Promise<{
        code: number;
        message: string;
    } | {
        code: number;
        message: {
            token: string;
            accountId: any;
            display_name: any;
        };
    }>;
    logout: (data: any) => Promise<{
        code: number;
        message: string;
    }>;
}
