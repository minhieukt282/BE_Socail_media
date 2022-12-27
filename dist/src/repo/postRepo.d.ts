export declare class PostRepo {
    private postRepo;
    constructor();
    create: (newPost: any) => Promise<void>;
    find: () => Promise<any>;
    update: (idEdit: number, post: any) => Promise<void>;
    delete: (id: number) => Promise<void>;
}
