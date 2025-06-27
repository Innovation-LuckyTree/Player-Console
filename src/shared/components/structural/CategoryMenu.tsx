/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { CategoryIcon } from "./CategoryIcon";
import { useCategoryGamesList } from "../../hooks/useCategoryGamesList";
import { convertNameToUrl } from "../../../utils/helpers";
import { useGameList } from "../../../pages/dashboard/hooks/useGameList";
import { GameProviderItem } from "../../types/CategoryMenuItem";

interface CategoryMenuProps {
  gameCategoryId: number
}

export const CategoryMenu: FC<CategoryMenuProps> =({ gameCategoryId}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {gameProviders, fetchGameProviders} = useCategoryGamesList();
    const {getGameList} = useGameList();

    const handleCategoryClick = (item: GameProviderItem) => {
        navigate(convertNameToUrl(item.name));
        getGameList(gameCategoryId,item.gameProviderId);
    };

    const currentMainPath = '/' + location.pathname.split('/')[1];
    const currentCategoryPath = '/' + location.pathname.split('/')[2];

    useEffect(()=> {
        fetchGameProviders(gameCategoryId);
        getGameList(gameCategoryId,0);
    }, [gameCategoryId]);

    return (
    <>
        <div className="category-menu-wrapper" style={{justifyContent: 'center'}}>
            <div className="category-menu">
                {
                    (gameCategoryId == 0) &&
                    <>
                        <Link to={'/'} className={`category-item ${(currentMainPath == "/") ? 'active' : ''}`}>
                            <div className="category-ext-icon-wrapper">
                                <div className="category-icon-wrapper">🏆</div>
                            </div>
                            <div className="label">ALL</div>
                        </Link>
                        <Link to={'/favorites'} className={`category-item ${(currentMainPath == "/favorites") ? 'active' : ''}`}>
                            <div className="category-ext-icon-wrapper">
                                <div className="category-icon-wrapper">🏆</div>
                            </div>
                            <div className="label">FAVORITES</div>
                        </Link>
                    </>
                }
                {gameCategoryId == 2 &&
                        <Link to={"/game/s/double-spin"} className={`category-item `} key={-2}>
                            <CategoryIcon label="DOUBLE SPIN"/>
                        </Link>
                }
                { gameProviders?.length > 0 ? 
                    gameProviders?.map((item) => {
                        const isActive = convertNameToUrl(item.name) === currentCategoryPath;
                        return (
                            <div
                                className={`category-item ${isActive ? 'active' : ''}`}
                                key={item.gameProviderId}
                                onClick={() => handleCategoryClick(item)}
                            >
                                <CategoryIcon label={item.name}/>
                            </div>
                        )

                    })
                    :
                        <Link to={"#"} className={`category-item `} key={-1}>
                            <CategoryIcon label={""} isAvailable={0}/>
                        </Link>
                }
            </div>
        </div>
    </>
  )
}
