export declare class UserService {
    private randomId;
    private relationshipService;
    private accountService;
    constructor();
    getFriends: (username: string) => Promise<void>;
}
