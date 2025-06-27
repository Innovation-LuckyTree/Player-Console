import { useState } from "react";
import * as gamesServices from '../../services/gamesService';
import axios from "axios";
import { GameProviderItem } from "../types/CategoryMenuItem";

export const useCategoryGamesList = () => {

    const [activeKey, setActiveKey] = useState("");
    const [ gameProviders, setGameProviders] = useState<GameProviderItem[]>([]);
    const [ loading, setLoading] = useState(false);
    const [ error, setError] = useState<string | null>(null);

    const fetchGameProviders = async (gameCategoryId:number) => {
         setLoading(true);
        try {
        const response = await gamesServices.getCategoryGamesList(gameCategoryId);
        setGameProviders(response.data.gameProviders);
        setError(null);
        } catch (err: any) {
        let message = 'Fetching Failed';
        if (axios.isAxiosError(err)) {
            const code = err.status;
            switch (code){
            case 404:
                message = "Api not found";
                break;
            case 400:
                message = "Unable to fetch categories. Please try to refresh of check connection";
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
    }

    return {
        activeKey,
        gameProviders,
        loading,
        error,
        fetchGameProviders,
        setActiveKey
    }
}