import { NotificationList } from "../pages/notification/models/NotificationList";

export const notifMockData: NotificationList[] = [
    {
        id: 1,
        title: "Welcome Bonus Available!",
        description: "Your welcome bonus of PHP 100 is ready to claim.",
        type: 0,
        createDate: "2 hours ago"
    },
    {
        id: 2,
        title: "Deposit Successful",
        description: "Your deposit of PHP 500 has been processed successfully.",
        type: 1,
        createDate: "1 day ago"
    },
    {
        id: 3,
        title: "VIP Status Upgraded",
        description: "Congratulations! You've been upgraded to VIP level.",
        type: 2,
        createDate: "3 days ago"
    },
    {
        id: 4,
        title: "New Game Added",
        description: "Check out the new slot game Fortune Wheel now available!",
        type: 3,
        createDate: "5 days ago"
    },
    {
        id: 5,
        title: "Weekly Cashback Ready",
        description: "Your weekly cashback of PHP 25 is ready to be claimed.",
        type: 4,
        createDate: "1 week ago"
    }
];