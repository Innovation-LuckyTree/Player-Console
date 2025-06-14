import { FC } from "react";

export interface CategoryIconProp{
    label: string;
    isAvailable?: number;
}

export const CategoryIcon: FC<CategoryIconProp> =({label, isAvailable}) => {
    return (
        <>
            <div className={`category-ext-icon-wrapper ${isAvailable ? "": "unavailable"}`}>
                <div className="category-icon-wrapper">🏆</div>
                {
                    !isAvailable &&
                    <div className="coming-text">Coming Soon</div>
                }
            </div>
            <div className="label">{label}</div>
        </>
    )
}