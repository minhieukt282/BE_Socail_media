interface CommentRequest {
    commentId?: number;
    accountId: number;
    img: string;
    displayName: string;
    comment: string;
    timeUpdate?: Date | null | string;
    postPostId: number;
}
