/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountResponse } from "../pages/account/models/responses/AccountResponse";
import { CreditBalanceResponse } from "../pages/account/models/responses/CreditBalanceResponse";
import { ApiResponse } from "../shared/types/ApiResponse";
import apiClient from "./apiClient";

export const getCurrentInfo = (): Promise<AccountResponse>  => {
  return apiClient.get<AccountResponse>(`/api/account/current`).then((resp) => resp.data);
};

export const getCreditBalance = (accountCreditId: string): Promise<ApiResponse<CreditBalanceResponse>>  => {
  return apiClient.get<ApiResponse<CreditBalanceResponse>>(`/api/account/credit/balance?AccountCreditId=${accountCreditId}`).then((resp) => resp.data);
};