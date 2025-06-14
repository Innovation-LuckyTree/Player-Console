/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginRequest } from "../pages/login/models/request";
import { ApiResponse } from "../shared/types/ApiResponse";
import { AuthResponse } from "../shared/types/UserAuth";
import apiClient from "./apiClient";

export const login = (payload: LoginRequest): Promise<ApiResponse<AuthResponse>>  => {
  return apiClient.post<ApiResponse<AuthResponse>>("/Auth/account/login", payload).then((resp) => resp.data);
};