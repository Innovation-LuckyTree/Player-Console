/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"
import { UserInfo } from "../../../pages/account/hooks/UserInfo";

export const TopSideBar: FC = () => {
    const { userInfo } = UserInfo();

  return (
    <>
        <div className="profile-card">
            <div className="profile-card-flex">
                <div className="avatar">F</div>
                <div>
                    <div style={{marginBottom:'10px'}}>{(userInfo !== null) ? userInfo.fullname : '...'}</div>
                    {
                        (userInfo !== null && userInfo.isVerified) 
                        ? <span className="badge success">Verified</span>
                        : <span className="badge pending">Pending</span>
                    }
                    
                </div>
            </div>
            
            <div className="profile-info">
                <div className="profile-card-flex">
                    <span>ID:</span>
                    <span>{(userInfo !== null) ? String(userInfo.accountInfoId).padStart(15, '0') : '...'}</span>
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