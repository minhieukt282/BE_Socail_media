interface NoticeRequest{
    notificationId?: number
    displayName: string,
    accountSent: number,
    accountReceiver: number,
    postId: number,
    content: string
    time: Date | string,
    type: string
}
