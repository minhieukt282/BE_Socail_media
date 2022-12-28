export declare class RelationshipRepo {
    private relationshipRepo;
    constructor();
    findById: (accountId: number, status: boolean) => Promise<any>;
    create: (data: any) => Promise<number>;
    update: (relationshipId: number, data: any) => Promise<string>;
    del: (relationshipId: number) => Promise<string>;
}
