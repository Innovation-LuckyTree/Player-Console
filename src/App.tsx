import { Route, Routes } from 'react-router-dom'
import './App.css'
import { DashWrapper } from './shared/components/structural/DashWrapper'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ConfigProvider } from 'antd'
import '@ant-design/v5-patch-for-react-19'

function App() {

  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<DashWrapper />}>
          <Route path="/:menu?/:company?" element={<DashboardPage />}/>
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
