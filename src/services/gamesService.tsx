
import { GetGameListResponse } from "../pages/dashboard/models/response";
import { GameLinkResponse } from "../pages/game_wrapper/models/GameLinkResponse";
import { ApiResponse } from "../shared/types/ApiResponse";
import apiClient from "./apiClient";

export const getGameList = async (): Promise<ApiResponse<GetGameListResponse>>  => {
  return await apiClient.get('/api/games/catalog');
};

export const getGameDetail = async (gameId: string): Promise<ApiResponse<GameLinkResponse>>  => {
  return await apiClient.get(`/api/games/load/${gameId}`);
};