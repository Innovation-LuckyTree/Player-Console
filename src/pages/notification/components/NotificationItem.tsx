/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";

export interface NotifCardProps{
    title: string;
    description: string;
    type: number;
    createDate: string;
}

export const NotificationItem: FC<NotifCardProps> = ({title, description, type, createDate}) => {

  return (
    <>
        <div className={
            (type == 0) ? 'notification-item orange'
            : (type == 1) ? 'notification-item blue'
            : (type == 2) ? 'notification-item green'
            : (type == 3) ? 'notification-item purple'
            : 'notification-item yellow'
        }>
            <div className="notification-title">{title}</div>
            <div className="notification-body">{description}</div>
            <div className="notification-time">{createDate}</div>
        </div>
    </>
  )
}