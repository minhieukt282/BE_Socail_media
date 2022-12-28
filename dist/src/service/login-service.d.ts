export declare class LoginService {
    private accountRepo;
    private random;
    constructor();
    register: (data: AccountRequest) => Promise<ResponseBody>;
    login: (account: LoginRequest) => Promise<ResponseBody>;
    logout: (data: AccountRequest) => Promise<ResponseBody>;
}
