/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"
import { Link } from "react-router-dom";
import { mockCategoryMenuData } from "../../../utils/mock";
import { useLocation } from 'react-router-dom';

interface CategoryMenuProps {
  menuName: string
}

export const CategoryMenu: FC<CategoryMenuProps> =({menuName}) => {

    const location = useLocation();
    const currentMainPath = '/' + location.pathname.split('/')[1];
    const currentCategoryPath = '/' + location.pathname.split('/')[2];

    const gmType = menuName.replace("/", "");
    const menuItemList = ((menuName == "/") || (menuName == "/favorites"))
        ? mockCategoryMenuData
        : mockCategoryMenuData.filter(m => m.gameType == gmType);

    return (
    <>
        <div className="category-menu-wrapper" style={{justifyContent: (menuName == "/" || menuName == "/favorites") ? 'flex-start' : 'center'}}>
            <div className="category-menu">
                {
                    (menuName == "/" || menuName == "/favorites") &&
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

                {
                    menuItemList.map((item) => {
                        const isActive = item.path === currentCategoryPath;
                        const linkTo = (item.parentPath + item.path)
                        
                        return (
                            <Link to={linkTo} className={`category-item ${isActive ? 'active' : ''}`} key={item.id}>
                                <div className="category-ext-icon-wrapper">
                                    <div className="category-icon-wrapper">🏆</div>
                                </div>
                                <div className="label">{item.label}</div>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    </>
  )
}