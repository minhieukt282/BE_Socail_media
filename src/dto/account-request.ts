interface AccountRequest {
    username: string;
    password?: string;
    accountId: number;
    img: string | null;
    birthday: Date | null | string;
}
