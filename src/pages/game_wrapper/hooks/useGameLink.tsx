/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import axios from "axios";
import * as gameService from "../../../services/gamesService";

export const useGameLink=() => {
  const [gameLink, setGameLink] = useState<string>("#");
  const [ loading, setLoading] = useState(false);
  const [ error, setError] = useState<string | null>(null);
  
  const getGameDetails = async (gameId: string) => {
    setLoading(true);
    try {
      const response = await gameService.getGameDetail(gameId);
      setGameLink(response.data.payload.game_launch_url);
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
    gameLink,
    loading,
    error,
    getGameDetails
  }
}