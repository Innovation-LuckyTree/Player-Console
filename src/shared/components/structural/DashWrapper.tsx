/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react"
import { Button, Layout } from "antd"
import { MainMenu } from "./MainMenu"
import { Navigate, Outlet } from "react-router-dom"
import { DollarOutlined, NotificationFilled, MoonFilled } from "@ant-design/icons"
import { useAuthStore } from "../../hooks/useAuthStore"
import { useAuth } from "../../hooks/useAuth"
import { AlertBar } from "./AlertBar"
import { FaqPartners } from "./FaqPartners"
import { MainFooter } from "./MainFooter"
import { LoginModal } from "../../../pages/login/LoginModal"
import { RegistrationModal } from "../../../pages/login/RegistrationModal"
import { ForgotPassword } from "../../../pages/login/ForgotPassword"
import { useGameList } from "../../../pages/dashboard/hooks/useGameList"

// THis containains basic Layout for dashboard as well as AuthGuard for it.
export const DashWrapper: FC = () => {
  const {logout } = useAuth();
  const {getGameList} = useGameList();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [collapsed, setCollapsed] = useState(false);
  const [openLogin, setopenLogin] = useState(false);
  const [openReg, setopenReg] = useState(false);
  const [openForgotPass, setopenForgotPass] = useState(false);

  const onLoginCallback = (code: number) => {
    if(code == 1) {
      setopenLogin(true);
      setopenReg(false);
    }

    if(code == 2) {
      setopenLogin(false);
      setopenReg(true);
    }

    if(code == 3) {
      setopenForgotPass(true);
    }
  }
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  useEffect(() => {
    getGameList();
  },[])

  return (
    <>
      <Layout className="h-screen">
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
              {
                (!isAuthenticated) &&
                <>
                  <Button onClick={() => setopenReg(true)} className="btn btn-orange">SIGN UP</Button>
                  <Button onClick={() => setopenLogin(true)} className="btn">LOGIN</Button>
                </>
              }

              {
                (isAuthenticated) &&
                <>
                  <span>Hi,</span> <strong>Francisco</strong> 
                  <span>Credit:</span> <span className="credit">PHP 1250.43</span>
                  <DollarOutlined />
                  <Button className="btn"><NotificationFilled /></Button>
                  <Button className="btn">Withdrawal</Button>
                  <Button className="btn btn-orange">Deposit</Button>
                  <Button className="btn">LOGOUT</Button>
                </>
              }
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

      <LoginModal isModalOpen={openLogin} handleOk={onLoginCallback} handleCancel={() => setopenLogin(false)} />
      <RegistrationModal isModalOpen={openReg} handleOk={onLoginCallback} handleCancel={() => setopenReg(false)} />
      <ForgotPassword isModalOpen={openForgotPass} handleOk={onLoginCallback} handleCancel={() => setopenForgotPass(false)}/>
    </>
  )
}