/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"
import { Link } from "react-router-dom"
import { getGameImage } from "../../../utils/helpers"
import { useAuthStore } from "../../../shared/hooks/useAuthStore"
import { message } from "antd"

export interface GameGridCardProps{
    title: string,
    description: string,
    id: string
}

export const GameGridCard: FC<GameGridCardProps> =({title, description,id}) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const handleNotLogin = () => { message.error("You need to be logged in to play the game."); }
  return (
    <div className="game-grid-card">
        <div className="game-grid-image relative">
            <img src={getGameImage(title)} className="w-full h-full absolute" style={{top:0,left:0}}/>
            {
                (isAuthenticated) ?
                <Link to={`/game/${id}`}>
                    <button className="game-grid-play-btn">PLAY</button>
                </Link>
                : <button onClick={() => handleNotLogin()} className="game-grid-play-btn">PLAY</button>
            }
            <div className="game-grid-favorite">
                <button>♡</button>
            </div>
        </div>
        <div className="game-grid-info">
            <div className="game-grid-title">{title}</div>
            <div className="game-grid-subtitle">{description}</div>
        </div>
    </div>
  )
}