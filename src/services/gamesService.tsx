
import { GetCategoryGamesListResponse, GetGameCategoriesResponse, GetGameListResponse } from "../pages/dashboard/models/response";
import { GameLinkResponse } from "../pages/game_wrapper/models/GameLinkResponse";
import { ApiResponse } from "../shared/types/ApiResponse";
import apiClient from "./apiClient";


export const getGameCategories = async (): Promise<ApiResponse<GetGameCategoriesResponse>>  => {
  return await apiClient.get('/api/games/categories');
};

export const getCategoryGamesList = async (gameCategoryId: number): Promise<ApiResponse<GetCategoryGamesListResponse>>  => {
  return await apiClient.get(`/api/games/${gameCategoryId}/providers`);
};


export const getGameList = async (gameCategoryId: number, gameProviderId: number, pageNumber:number): Promise<ApiResponse<GetGameListResponse>>  => {
  return await apiClient.get(`/api/games/${gameCategoryId}/${gameProviderId}?pageNumber=${pageNumber}&pageSize=200`);
};

export const getGameDetail = async (gameId: string): Promise<ApiResponse<GameLinkResponse>>  => {
  return await apiClient.get(`/api/games/load/${gameId}`);
};