export interface AuthResponse {
    id: string,
    accountId: string,
    idNumber: number,
    userName: string,
    token: string;
    refreshToken: string,
    clientId: string,
    type: string,
    temporaryPassword: boolean,
    isLocked: boolean,
    expirationDate: number,
    companyId: string
}
export interface UserAuth{
    name: string;
    id: number;
}
