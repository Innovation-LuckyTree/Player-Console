/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import axios from "axios";
import { useGameListStore } from "./useGameListStore";
import * as gameService from "./../../../services/gamesService";

export const useGameList=() => {
  const { gameList, count, setGameList } = useGameListStore();
  const [ loading, setLoading] = useState(false);
  const [ error, setError] = useState<string | null>(null);
      
  const getGameList = async () => {
    setLoading(true);
    try {
      const response = await gameService.getGameList();
      setGameList(response.data.games, response.data.count);
      setError(null);
    } catch (err: any) {
      let message = 'Login failed';
      if (axios.isAxiosError(err)) {
        const code = err.status;
        switch (code){
          case 404:
            message = "Api not found";
            break;
          case 500:
            message = "Something went wrong with the servers. Try again later.";
            break;
        }
      }
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    gameList,
    count,
    loading,
    error,
    getGameList
  }
}