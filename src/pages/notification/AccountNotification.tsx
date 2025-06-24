/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import { notifMockData } from "../../utils/notifMock";
import { Button, Pagination } from "antd";
import { NotificationItem } from "./components/NotificationItem";

export const AccountNotification: FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedNotif = notifMockData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

  return (
    <>
        <div className="notifications-section">
            <div className="notifications-header">
                <h2>Notifications</h2>
                <Button className="mark-read-btn">Mark All as Read</Button>
            </div>
            
            {
                paginatedNotif.map((item,index) => (
                    <NotificationItem title={item.title} description={item.description} type={item.type} createDate={item.createDate} key={index}/>
                ))
            }

            {
                notifMockData.length > itemsPerPage && (
                <div className="pagination-container">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={notifMockData.length}
                    onChange={(page) => setCurrentPage(page)}
                    showQuickJumper
                    showSizeChanger={false}
                />
                </div>
            )}
        </div>
    </>
  )
}