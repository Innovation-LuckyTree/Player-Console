/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react"
import { Button, Layout } from "antd"
import { MainMenu } from "./MainMenu"
import { Navigate, Outlet } from "react-router-dom"
import { DollarOutlined, NotificationFilled, MoonFilled } from "@ant-design/icons"
import { useAuthStore } from "../../hooks/useAuthStore"
import { useAuth } from "../../hooks/useAuth"
import { AlertBar } from "./AlertBar"
import { FaqPartners } from "./FaqPartners"
import { MainFooter } from "./MainFooter"

// THis containains basic Layout for dashboard as well as AuthGuard for it.
export const DashWrapper: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {logout } = useAuth();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Layout className="w-screen h-screen">
        <header>
          <div className="top-bar">
            <div className="logo">
              🕒<span>Game <strong>Time</strong></span>
              <br/> <span>INC</span>
            </div>
            <div className="user-info">
              <Button className="btn">
                <MoonFilled />
                {/* <SunFilled /> */}
              </Button>
              <span>Hi,</span> <strong>Francisco</strong> 
              <span>Credit:</span> <span className="credit">PHP 1250.43</span>
              <DollarOutlined />
              <Button className="btn"><NotificationFilled /></Button>
              <Button className="btn">Withdrawal</Button>
              <Button className="btn btn-orange">Deposit</Button>
              <Button className="btn">LOGOUT</Button>
              <Button className="btn btn-blue">HP</Button>
            </div>
          </div>

          <MainMenu collapsed={collapsed}/>
          <AlertBar />
        </header>

        <div>
          <Outlet/>
        </div>

        <FaqPartners />
        <MainFooter />
      </Layout>
    </>
  )
}