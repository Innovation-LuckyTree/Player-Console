export interface BonusBalanceResponse {
    accountId: string;
    accountType: string;
    balance: number;
    promotionDetails?: PromotionDetail | null;
};

export interface PromotionDetail {
    promotionId: number;
    dateStarted: string;
    expirationDate: string;
    remainingAmount: number;
    consumedAmount: number;
}