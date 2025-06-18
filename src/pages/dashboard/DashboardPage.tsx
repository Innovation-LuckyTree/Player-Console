/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react"
import '../../App.css'
import { GameGridCard } from "./components/GameGridCard";
import { useGameList } from "./hooks/useGameList";
import { Pagination, Skeleton } from "antd";
// import { useLocation } from "react-router-dom";

export const DashboardPage: FC =() => {
  // const location = useLocation();
  // const currentMainPath = location.pathname.split('/')[1];
  // const currentCategoryPath = location.pathname.split('/')[2];

  const {gameList, loading} = useGameList();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // const gameListFilter = gameList.filter(m => {
  //   const matchesFavorite = currentMainPath === "favorites" ? m.isFavorite : true;
  //   const matchesType = currentMainPath && currentMainPath !== "favorites" ? m.gameType.toLowerCase() === currentMainPath.toLowerCase() : true;
  //   const matchesCompany = currentCategoryPath ? m.companyName.toLowerCase() === currentCategoryPath.toLowerCase() : true;

  //   return matchesFavorite && matchesType && matchesCompany;
  // });
  
  const paginatedGames = gameList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="game-row">
        {
          !loading ?
            paginatedGames.map((game,index) => (
              <GameGridCard title={game.gameName} description={game.gameType} id={game.gameId} key={index}/>
            ))
            :
            Array.from({ length: 6 }).map((_, index) => (
            <div className="game-grid-card" key={index}>
              <Skeleton loading={!loading} active/>
            </div>))
        }
      </div>

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
    </>
  )
}