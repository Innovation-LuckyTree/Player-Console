import { BonusBalanceResponse } from "./BonusBalanceResponse";
import { CreditBalanceResponse } from "./CreditBalanceResponse";
import { UserInfoResponse } from "./UserInfoResponse";

export interface AccountResponse {
    accountInfo: UserInfoResponse;
    accountCredits: CreditBalanceResponse;
    bonusAccount: BonusBalanceResponse;
    totalCredits: number
};