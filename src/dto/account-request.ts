interface AccountRequest {
    accountId?: number;
    username?: string;
    password?: string;
    displayName?: string;
    img?: string | null;
    birthday?: Date | null | string;
    location?: string;
}
