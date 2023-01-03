interface PostsRequest {
    postId?;
    accountId?: number;
    img?: string | null;
    content?: string;
    timeUpdate?: Date | null | string;
    status?: string;
}