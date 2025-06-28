/* eslint-disable @typescript-eslint/no-unused-vars */
import { UploadPayload } from "../shared/components/fileupload/models/UploadPayload";
import { ApiResponse } from "../shared/types/ApiResponse";
import apiClient from "./apiClient";

export const uploadImageString = (payload: UploadPayload): Promise<ApiResponse<string>>  => {
  return apiClient.post<ApiResponse<string>>("/api/upload/base64image", payload).then((resp) => resp.data);
};

export const getImageString = (fileName: string): Promise<ApiResponse<string>>  => {
  return apiClient.get<ApiResponse<string>>(`/api/upload/${fileName}`).then((resp) => resp.data);
};