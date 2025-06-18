/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd"
import { FC } from "react"
import { Link } from "react-router-dom"

export const ContentHeader: FC = () => {

  return (
    <>
      <div className="header">
          <div className="head-title">
              <Link to="/">← Back to Games</Link>
              <h2>MY ACCOUNT</h2>
          </div>
          <div className="head-promotion">
              <div className="head-promotion-flex">
                  <span>Promotion</span>
                  <Button type="primary" style={{background:'var(--accent1)'}}>Show ALl</Button>
              </div>
              <p>Check out our latest promotions and bonuses!</p>
          </div>
      </div>
    </>
  )
}