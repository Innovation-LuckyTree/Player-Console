/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"
import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import { TopSideBar } from "./TopSideBar"
import { MenuSideBar } from "./MenuSideBar"
import { ContentHeader } from "./ContentHeader"
// import { useAuthStore } from "../../hooks/useAuthStore"

// THis containains basic Layout for dashboard as well as AuthGuard for it.
export const AccountWrapper: FC = () => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

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