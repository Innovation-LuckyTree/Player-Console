export interface GameLinkResponse{
    code: number;
    msg: string;
    payload: GameLink;
}

export interface GameLink{
    game_launch_url: string;
}