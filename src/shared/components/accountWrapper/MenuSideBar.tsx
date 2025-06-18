/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"
import { Link, useLocation } from "react-router-dom";
import { getAccountMenu } from "../../../app/accountRoutes";

// Dummy menu item type, replace with your actual type if needed
interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

export const MenuSideBar: FC = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  // const [activeKey, setActiveKey] = useState("");

  const accountMenu: MenuItem[] = getAccountMenu().filter(
    (item): item is MenuItem => item != null && typeof item.key === "string"
  );

  return (
    <>
        <nav className="sidebar-nav">
            <ul>
                {accountMenu.map((item) => {
                  const isActive =
                    item.key === "/account"
                      ? currentPath === "/account"
                      : currentPath.startsWith(item.key);

                  return (
                    <Link to={item.key} key={item.key}>
                      <li
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
    </>
  )
}