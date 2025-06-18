/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"

export const TopSideBar: FC = () => {

  return (
    <>
        <div className="profile-card">
            <div className="profile-card-flex">
                <div className="avatar">F</div>
                <div>
                    <div className="name">Francisco</div>
                    <span className="badge pending">Pending</span>
                </div>
            </div>
            
            <div className="profile-info">
                <div className="profile-card-flex">
                    <span>ID:</span>
                    <span>QMC/34F</span>
                </div>
                <div className="profile-card-flex">
                    <span>DEFAULT</span>
                    <span className="badge vip">VIP</span>
                </div>
            </div>
        </div>

        <div className="credits-card">
            <span>Credits</span>
            <strong>PHP 1250.43</strong>
        </div>
    </>
  )
}