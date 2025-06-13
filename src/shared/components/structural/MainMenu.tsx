/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect } from "react"
import { getSideMenu } from "../../../app/appRoutes"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import { CategoryMenu } from "./CategoryMenu";

interface MainMenuProps {
  collapsed: boolean
}

// Dummy menu item type, replace with your actual type if needed
interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

export const MainMenu: FC<MainMenuProps> =({collapsed}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [activeKey, setActiveKey] = useState("");

  useEffect(() => {
    // Automatically set active menu based on the current path
    const topLevelPath = "/" + currentPath.split("/")[1];
    setActiveKey(topLevelPath);
  }, [currentPath]);

  const sideMenu: MenuItem[] = getSideMenu().filter(
    (item): item is MenuItem => item != null && typeof item.key === "string"
  );

  return (
    <>
      <nav className="main-menu">
        <ul>
          {sideMenu.map((item) => {
            const isActive =
              item.key === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.key);

            return (
              <Link to={item.key} key={item.key}>
                <li
                  onClick={() => setActiveKey(item.key)}
                  className={isActive ? "active" : ""}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="txt">{item.label}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>

      <CategoryMenu menuName={activeKey}/>
    </>
  )
}