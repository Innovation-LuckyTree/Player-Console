/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";

export const AccountNotification: FC = () => {

  return (
    <>
        <div className="notifications-section">
            <div className="notifications-header">
                <h2>Notifications</h2>
                <button className="mark-read-btn">Mark All as Read</button>
            </div>

            <div className="notification-item orange">
                <div className="notification-title">Welcome Bonus Available! <span className="dot orange"></span></div>
                <div className="notification-body">Your welcome bonus of PHP 100 is ready to claim.</div>
                <div className="notification-time">2 hours ago</div>
            </div>

            <div className="notification-item blue">
                <div className="notification-title">Deposit Successful <span className="dot blue"></span></div>
                <div className="notification-body">Your deposit of PHP 500 has been processed successfully.</div>
                <div className="notification-time">1 day ago</div>
            </div>

            <div className="notification-item green">
                <div className="notification-title">VIP Status Upgraded</div>
                <div className="notification-body">Congratulations! You've been upgraded to VIP level.</div>
                <div className="notification-time">3 days ago</div>
            </div>

            <div className="notification-item purple">
                <div className="notification-title">New Game Added</div>
                <div className="notification-body">Check out the new slot game "Fortune Wheel" now available!</div>
                <div className="notification-time">5 days ago</div>
            </div>

            <div className="notification-item yellow">
                <div className="notification-title">Weekly Cashback Ready</div>
                <div className="notification-body">Your weekly cashback of PHP 25 is ready to be claimed.</div>
                <div className="notification-time">1 week ago</div>
            </div>
        </div>
    </>
  )
}