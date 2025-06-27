/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import { CategoryMenu } from "./CategoryMenu";
import { useGameCategories } from "../../hooks/useGameCategories";
import { convertNameToUrl, getCategoryIcon } from "../../../utils/helpers";

interface MainMenuProps {
  collapsed: boolean
}

export const MainMenu: FC<MainMenuProps> =() => {
  const {categoryList, fetchCategories, activeKey, setActiveKey} = useGameCategories();
  const location = useLocation();
  const currentPath = location.pathname;


  useEffect(() => {
    // Automatically set active menu based on the current path
    fetchCategories();
  }, [currentPath]);

  return (
    <>
      <nav className="main-menu">
        <ul>
          {categoryList?.map((item) => {
            var url = convertNameToUrl(item.name);
            const isActive =
              url === "/"
                ? currentPath === "/"
                : currentPath.startsWith(url);

            return (
              <Link to={url} key={url}>
                <li
                  onClick={() => setActiveKey(item.gameCategoryId)}
                  className={isActive ? "active" : ""}
                >
                  <span className="icon">{getCategoryIcon(item.description)}</span>
                  <span className="txt">{item.description}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>

      <CategoryMenu gameCategoryId={activeKey}/>
    </>
  )
}