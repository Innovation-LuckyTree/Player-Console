/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import { Link } from "react-router-dom";
import default_logo from '../../../assets/game_logo/default-game-icon.png';
import { useAuthStore } from "../../../shared/hooks/useAuthStore"
import { message } from "antd"
import { GameModel } from "../../../shared/types/GameModel"

export interface GameGridCardProps{
    game: GameModel;
}

export const GameGridCard: FC<GameGridCardProps> =({game}) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const handleNotLogin = () => { message.error("You need to be logged in to play the game."); }
  return (
    <div className="game-grid-card">
        <div className="game-grid-image relative">
            <img src={game.coverImage?? default_logo} className="w-full h-full absolute" style={{top:0,left:0}}/>
            {
                (isAuthenticated) ?
                <Link to={`/game/${game.gameObjectId}`}>
                    <button className="game-grid-play-btn">PLAY</button>
                </Link>
                : <button onClick={() => handleNotLogin()} className="game-grid-play-btn">PLAY</button>
            }
            <div className="game-grid-favorite">
                <button>♡</button>
            </div>
        </div>
        <div className="game-grid-info">
            <div className="game-grid-title">{game.name}</div>
            <div className="game-grid-subtitle">{game.description}</div>
        </div>
    </div>
  )
}