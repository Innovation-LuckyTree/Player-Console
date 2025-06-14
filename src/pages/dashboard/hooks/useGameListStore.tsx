import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GameModel } from '../../../shared/types/GameModel';

interface GameListState {
  gameList: GameModel[];
  count: number;
  setGameList: ( gameList: GameModel[], count:number) => void;
}

export const useGameListStore = create<GameListState>()(
  devtools(
    persist(
      (set) => ({
        gameList: [],
        count: 0,
        setGameList: (gameList, count) =>
          set({ gameList, count }, false, 'setGameList'),
      }),
      {
        name: 'game-storage',
        partialize: (state) => ({ gameList: state.gameList, count: state.count}),
      }
    ),
    { name: 'GameListStore' }
  )
);