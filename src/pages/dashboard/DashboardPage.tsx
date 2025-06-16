/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react"
import '../../App.css'
import { GameGridCard } from "./components/GameGridCard";
import { useGameList } from "./hooks/useGameList";
import { Pagination, Skeleton } from "antd";

export const DashboardPage: FC =() => {
  const {gameList, loading} = useGameList();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  
  const paginatedGames = gameList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="game-row">
        {
          !loading ?
            gameList.map((game,index) => (
              <GameGridCard title={game.gameName} description={game.gameType} id={game.gameId} key={index}/>
            ))
            :
            Array.from({ length: 6 }).map((_, index) => (
            <div className="game-grid-card" key={index}>
              <Skeleton loading={!loading} active/>
            </div>))
        }

        {
          gameList.length > itemsPerPage && (
          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={gameList.length}
              onChange={(page) => setCurrentPage(page)}
              showQuickJumper
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </>
  )
}