/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react"
import { Button, Layout, message } from "antd"
import { MainMenu } from "./MainMenu"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { DollarOutlined, NotificationFilled, MoonFilled } from "@ant-design/icons"
import { useAuthStore } from "../../hooks/useAuthStore"
import { useAuth } from "../../hooks/useAuth"
import { AlertBar } from "./AlertBar"
import { FaqPartners } from "./FaqPartners"
import { MainFooter } from "./MainFooter"
import { LoginModal } from "../../../pages/login/LoginModal"
import { RegistrationModal } from "../../../pages/login/RegistrationModal"
import { ForgotPassword } from "../../../pages/login/ForgotPassword"
import { LogoutModal } from "../../../pages/login/LogoutModal"
import { useGameList } from "../../../pages/dashboard/hooks/useGameList"

// THis containains basic Layout for dashboard as well as AuthGuard for it.
export const DashWrapper: FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getGameList } = useGameList();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [collapsed, _] = useState(false);
  const [openLogin, setopenLogin] = useState(false);
  const [openReg, setopenReg] = useState(false);
  const [openForgotPass, setopenForgotPass] = useState(false);
  const [openLogout, setopenLogout] = useState(false);

  const onLoginCallback = (code: number) => {
    // 1 = open login modal and close registration modal
    if(code == 1) { setopenLogin(true); setopenReg(false); }
    // 2 = open registration modal and close login modal
    if(code == 2) { setopenLogin(false); setopenReg(true); }
    // 3 = open forgot password modal
    if(code == 3) { setopenForgotPass(true); }
    // 4 = success login, close login modal and refresh fullpage
    if(code == 4) { setopenLogin(false); } //window.location.reload();
    // 5 = success registration, close registration modal and open login modal
    if(code == 5) { 
      message.success("Registration successful!");

      setTimeout(() => {
        setopenReg(false); 
        setopenLogin(true); 
      }, 2000); // 1000 ms = 1 second
    }
  }

  const onLogoutCallback = () => {
    setopenLogout(false);
    logout();
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
                  <span>Hi,</span>
                  <Link to="/account">
                    <strong>{(user !== null) ? user.userName.toUpperCase() : '...'}</strong>
                  </Link>
                  <span>Credit:</span> 
                  <Link to="/account/wallet">
                    <span className="credit">PHP 1250.43</span>
                  </Link>
                  <DollarOutlined />
                  <Button className="btn"><NotificationFilled /></Button>
                  <Button className="btn" onClick={() => navigate("/account/withdrawal")}>Withdrawal</Button>
                  <Button className="btn btn-orange" onClick={() => navigate("/account/deposit")}>Deposit</Button>
                  <Button onClick={() => setopenLogout(true)} className="btn">LOGOUT</Button>
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
      <LogoutModal isModalOpen={openLogout} handleOk={onLogoutCallback} handleCancel={() => setopenLogout(false)} />
    </>
  )
}