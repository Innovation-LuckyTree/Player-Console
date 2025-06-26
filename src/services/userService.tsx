/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserInfoResponse } from "../pages/account/models/responses/UserInfoResponse";
import { VerificationRequest } from "../pages/account/models/VerificationRequest";
import { RegistrationRequest } from "../pages/login/models/request";
import { RegistrationResponse } from "../pages/login/models/response";
import { ApiResponse } from "../shared/types/ApiResponse";
import apiClient from "./apiClient";

export const userRegistration = (payload: RegistrationRequest): Promise<ApiResponse<RegistrationResponse>>  => {
  return apiClient.post<ApiResponse<RegistrationResponse>>("/api/user/basic/registration", payload).then((resp) => resp.data);
};

export const basicVerification = (payload: VerificationRequest): Promise<ApiResponse<RegistrationResponse>>  => {
  return apiClient.patch<ApiResponse<RegistrationResponse>>("/api/user/basic/verification", payload).then((resp) => resp.data);
};

export const getDetailByUserId = (userId: string): Promise<ApiResponse<UserInfoResponse>>  => {
  return apiClient.get<ApiResponse<UserInfoResponse>>(`/api/user/${userId}`).then((resp) => resp.data);
};