import { GameModel } from "../../../shared/types/GameModel";

export interface GetGameListResponse{
    games: GameModel[],
    count: number
}