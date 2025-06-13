/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"

export const MainFooter: FC =() => {
  return (
    <footer className="main-footer">
        <div className="footer-columns">
            <div className="footer-col">
                <h3>Game Time</h3>
                <p>Your premier destination for online gaming entertainment. Experience the thrill of world-class games with secure and fair play.</p>
            </div>

            <div className="footer-col">
                <h4>Information</h4>
                <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Connection Issues</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Responsible Gaming</a></li>
                <li><a href="#">Security Center</a></li>
                </ul>
            </div>

            <div className="footer-col">
                <h4>Help Center</h4>
                <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact Support</a></li>
                </ul>
            </div>

            <div className="footer-col">
                <h4>Gaming License</h4>
                <ul>
                <li><a href="#">BMM</a></li>
                <li><a href="#">CLOUDFLARE</a></li>
                <li><a href="#">LEXAR</a></li>
                </ul>
            </div>
        </div>

        <div className="footer-bottom">
        © 2025 Game Time Inc. All rights reserved.
        </div>
    </footer>
  )
}
