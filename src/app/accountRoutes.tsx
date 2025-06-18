/* eslint-disable @typescript-eslint/no-unused-vars */
import { MenuProps } from "antd";

const accountroutes: MenuProps['items'] = [
    {
      key: '/account',
      icon: <span role="img" aria-label="user">👤</span>,
      label: 'My Profile',
    },
    {
      key: '/account/notification',
      icon: <span role="img" aria-label="notif">🔔</span>,
      label: 'Notifications',
    },
    {
      key: '/account/wallet',
      icon: <span role="img" aria-label="wallet">👛</span>,
      label: 'Wallet',
    },
    {
      key: '/account/deposit',
      icon: <span role="img" aria-label="coins">🪙</span>,
      label: 'Deposit',
    },
    {
      key: '/account/withdrawal',
      icon: <span role="img" aria-label="money">💸</span>,
      label: 'Withdrawal',
    },
    {
      key: '/account/promo-center',
      icon: <span role="img" aria-label="gift">🎁</span>,
      label: 'Promo Center',
    },
    {
      key: '/account/bet-history',
      icon: <span role="img" aria-label="clock">🕒</span>,
      label: 'Bet History',
    },
    {
      key: '/account/statement',
      icon: <span role="img" aria-label="note">📄</span>,
      label: 'Statement',
    }
  ];

export const getAccountMenu = () => {
    return accountroutes;
}