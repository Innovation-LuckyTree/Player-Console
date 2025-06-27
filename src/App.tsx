import { Route, Routes } from 'react-router-dom'
import './App.css'
import { DashWrapper } from './shared/components/structural/DashWrapper'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ConfigProvider } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import { GameWrapper } from './pages/game_wrapper/GameWrapper'
import { PageNotFound } from './pages/404/PageNotFound'
import { AccountWrapper } from './shared/components/accountWrapper/AccountWrapper'
import { MyProfile } from './pages/account/MyProfile'
import { AccountNotification } from './pages/notification/AccountNotification'
import { AccountWallet } from './pages/wallet/AccountWallet'
import { AccountDeposit } from './pages/deposit/AccountDeposit'
import { AccountWithdrawal } from './pages/withdrawal/AccountWithdrawal'
import { PromoCenter } from './pages/promotion/PromoCenter'
import { AccountStatement } from './pages/statement/AccountStatement'
import { BetHistory } from './pages/bet-history/BetHistory'
import { GameSpecialWrapper } from './pages/game-special/GameSpecial'

function App() {

  return (
    <ConfigProvider>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path="/" element={<DashWrapper />}>
          <Route path="/:menu?/:company?" element={<DashboardPage />}/>
        </Route>
        <Route path="/account" element={<AccountWrapper />}>
          <Route path="/account" element={<MyProfile />}/>
          <Route path="/account/notification" element={<AccountNotification />}/>
          <Route path="/account/wallet" element={<AccountWallet />}/>
          <Route path="/account/deposit" element={<AccountDeposit />}/>
          <Route path="/account/withdrawal" element={<AccountWithdrawal />}/>
          <Route path="/account/promo-center" element={<PromoCenter />}/>
          <Route path="/account/bet-history" element={<BetHistory />}/>
          <Route path="/account/statement" element={<AccountStatement />}/>
        </Route>
        <Route path="/game/:gameId" element={<GameWrapper />}/>
        <Route path="game/s/:gameName" element={<GameSpecialWrapper />}/>
      </Routes>
    </ConfigProvider>
  )
}

export default App
