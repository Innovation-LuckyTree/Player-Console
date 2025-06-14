/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import '../../App.css';
import { gameItemData } from "../../utils/gameMock";
import { useLocation } from 'react-router-dom';
import { Pagination } from 'antd';

export const DashboardPage: FC = () => {
  const location = useLocation();
  const currentMainPath = location.pathname.split('/')[1];
  const currentCategoryPath = location.pathname.split('/')[2];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const gameList = gameItemData.filter(m => {
    const matchesFavorite = currentMainPath === "favorites" ? m.isFavorite : true;
    const matchesType = currentMainPath && currentMainPath !== "favorites" ? m.gameType.toLowerCase() === currentMainPath.toLowerCase() : true;
    const matchesCompany = currentCategoryPath ? m.companyName.toLowerCase() === currentCategoryPath.toLowerCase() : true;

    return matchesFavorite && matchesType && matchesCompany;
  });

  const paginatedGames = gameList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="game-row">
        {paginatedGames.length === 0 ? (
          <div className="no-games-found">Oops! The reels are empty.</div>
        ) : (
          paginatedGames.map((item) => (
            <div className="game-grid-card" key={item.id}>
              <div className="game-grid-image">
                <img src={item.path} alt={item.label} />
                <button className="game-grid-play-btn">PLAY</button>
                <div className="game-grid-favorite">
                  <button>♡</button>
                </div>
              </div>
              <div className="game-grid-info">
                <div className="game-grid-title">{item.label}</div>
                <div className="game-grid-subtitle">{item.description}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {gameList.length > itemsPerPage && (
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
  );
};
