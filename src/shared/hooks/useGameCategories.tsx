import { useState } from "react";
import * as gamesServices from './../../services/gamesService';
import axios from "axios";
import { CategoryModel } from "../types/CategoryModel";

export const useGameCategories = () => {

    const [activeKey, setActiveKey] = useState<number>(0);
    const [ categoryList, setCategoryList] = useState<CategoryModel[]>([]);
    const [ loading, setLoading] = useState(false);
    const [ error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
         setLoading(true);
        try {
        const home: CategoryModel = {
                gameCategoryId: 0,
                name: "",
                description: "Home",
                coverImage: "Home"
                
        };
        const response = await gamesServices.getGameCategories();
        setCategoryList([home,...response.data.gameCategories]);
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
        categoryList,
        loading,
        error,
        fetchCategories,
        setActiveKey
    }
}