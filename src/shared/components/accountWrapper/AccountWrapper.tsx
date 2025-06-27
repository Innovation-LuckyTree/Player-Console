/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useRef } from "react"
import { Layout, Spin } from "antd"
import { Navigate, Outlet } from "react-router-dom"
import { TopSideBar } from "./TopSideBar"
import { MenuSideBar } from "./MenuSideBar"
import { ContentHeader } from "./ContentHeader"
import { useAuthStore } from "../../hooks/useAuthStore"
import { UserInfo } from "../../../pages/account/hooks/UserInfo"

// THis containains basic Layout for dashboard as well as AuthGuard for it.
export const AccountWrapper: FC = () => {
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialized = useRef(false)
  const { user } = useAuthStore();
  const { getUserDetails, loading } = UserInfo();

  useEffect(() => {
    if (!initialized.current) {
        initialized.current = true;
        getUserDetails(user?.id??"");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Spin size="large" className="custom-spinner" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Layout className="h-screen" style={{background:'var(--bg-darkC)'}}>
        <div className="layout">
            <aside className="sidebar">
                <TopSideBar />
                <MenuSideBar />
            </aside>

            <main className="main-content">
                <ContentHeader />
                <div className="div-main-content">
                    <Outlet/>
                </div>
            </main>
        </div>
      </Layout>
    </>
  )
}