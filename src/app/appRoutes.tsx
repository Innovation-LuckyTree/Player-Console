/* eslint-disable @typescript-eslint/no-unused-vars */
import { HomeFilled } from "@ant-design/icons"
import { MenuProps } from "antd";

const routes: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeFilled />,
      label: 'HOME',
    },
    {
      key: '/sports',
      icon: <span role="img" aria-label="trophy">🏆</span>,
      label: 'SPORTS',
    },
    {
      key: '/live-casino',
      icon: <span role="img" aria-label="camera">🎥</span>,
      label: 'LIVE CASINO',
    },
    {
      key: '/slots',
      icon: <span role="img" aria-label="slot">🎰</span>,
      label: 'SLOTS',
    },
    {
      key: '/cards',
      icon: <span role="img" aria-label="card">🃏</span>,
      label: 'CARDS',
    },
    {
      key: '/fishing-games',
      icon: <span role="img" aria-label="fish">🐟</span>,
      label: 'FISHING GAMES',
    },
    {
      key: '/e-sports',
      icon: <span role="img" aria-label="egame">🎮</span>,
      label: 'ESPORTS',
    },
    {
      key: '/cockfighting',
      icon: <span role="img" aria-label="cock">🐓</span>,
      label: 'COCKFIGHTING',
    }
  ];

export const getSideMenu = () => {
    return routes;
}