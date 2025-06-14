import { Card } from "antd"
import type { FC } from "react"
import { Link } from "react-router-dom"

export const PageNotFound: FC = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <Card style={{background:"#ffe9e6",color:"var(--primary)", alignItems:"center", textAlign:"center", padding:"0.5rem"}}>
      <h1 className="text-2xl font-bold">Opps, it seems you have <br /> taken a wrong turn.</h1>
      <p className="text-md text-black">The page you are looking for does not exist.</p>
      <Link to="/" style={{color:"var(--primary)", fontWeight:"bold", textDecoration:"underline", marginTop:"1rem", display:"inline-block"}}>
        Return Home
      </Link>
      </Card>
    </div>
  )
}