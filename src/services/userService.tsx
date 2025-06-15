/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistrationRequest } from "../pages/login/models/request";
import { RegistrationResponse } from "../pages/login/models/response";
import { ApiResponse } from "../shared/types/ApiResponse";
import apiClient from "./apiClient";

export const userRegistration = (payload: RegistrationRequest): Promise<ApiResponse<RegistrationResponse>>  => {
  return apiClient.post<ApiResponse<RegistrationResponse>>("/api/user/basic/registration", payload).then((resp) => resp.data);
};