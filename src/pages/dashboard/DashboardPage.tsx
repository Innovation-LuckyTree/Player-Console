import { FC } from "react"
import '../../App.css'
import { GameGridCard } from "./components/GameGridCard";
import { useGameList } from "./hooks/useGameList";
import { Skeleton } from "antd";

export const DashboardPage: FC =() => {
  const {gameList, loading} = useGameList();
  return (
    <>
      <div className="game-row">
        {
          !loading ?
            gameList.map((game,index) => (
              <GameGridCard title={game.gameName} description={game.gameType} id={game.gameId} key={index}/>
            ))
            :
            Array.from({ length: 6 }).map((item, index) => (
            <div className="game-grid-card" key={index}>
              <Skeleton loading={!loading} active/>
            </div>))
        }
      </div>
    </>
  )
}