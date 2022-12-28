export declare class UserService {
    private random;
    private relationshipRepo;
    private accountRepo;
    constructor();
    getFriends: (accountId: number, status: boolean) => Promise<any>;
    showFriends: (accountId: number) => Promise<ResponseBody>;
    makeFriend: (data: FriendsRequest) => Promise<ResponseBody>;
    waitingFriends: (accountId: number) => Promise<ResponseBody>;
    acceptFriend: (relationshipId: number) => Promise<ResponseBody>;
    declineFriend: (relationshipId: number) => Promise<ResponseBody>;
}
