export declare class UserService {
    private randomId;
    private postRepo;
    constructor();
    create: (data: any) => Promise<{
        code: number;
        message: string;
    }>;
    showPost: () => Promise<any>;
    updatePost: (idEdit: any, post: any) => Promise<{
        message: string;
        posts: void;
    }>;
    deletePost: (postId: any) => Promise<{
        message: string;
        posts: void;
    }>;
}
