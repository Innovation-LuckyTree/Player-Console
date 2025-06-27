import { GameModel } from "../../../shared/types/GameModel";
import { CategoryModel } from "../../../shared/types/CategoryModel";
import { CategoryMenuItem, GameProviderItem } from "../../../shared/types/CategoryMenuItem";

export interface GetGameListResponse{
    games: GameModel[],
    count: number
}
export interface GetGameCategoriesResponse{
    gameCategories: CategoryModel[],
    count: number
}
export interface GetCategoryGamesListResponse{
    gameProviders: GameProviderItem[],
    count: number
}