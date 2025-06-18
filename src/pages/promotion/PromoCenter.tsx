/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from "antd";
import { FC } from "react";

export const PromoCenter: FC = () => {

    return (
        <div className="promo-center">
        <h2>PROMO CENTER</h2>

        <div className="promo-code-box">
            <h3><i className="fas fa-gift"></i> Enter Promo Code</h3>
            <div className="promo-code-input">
                <Input placeholder="Enter promo code" className="custom-input" />
                <button className="redeem-button">Redeem</button>
            </div>
            <ul className="promo-instructions">
                <li>Promo codes are case-insensitive</li>
                <li>Credits are added instantly upon successful redemption</li>
                <li>Each code can only be used once per account</li>
            </ul>
        </div>

        <h3 className="section-title"><i className="fas fa-star"></i> Available Promotions</h3>
        <div className="promo-grid">
            <div className="promo-card">
            <div className="promo-header">
                <h4>Welcome Bonus</h4>
                <button className="claim-button">Claim</button>
            </div>
            <div className="promo-amount">PHP 1,000 <span className="tag purple">WELCOME BONUS</span></div>
            <p>Get 100% match bonus on your first deposit up to PHP 1,000</p>
            <ul className="promo-conditions">
                <li>📌 Minimum deposit of PHP 500</li>
                <li>🕒 Expires: 12/31/2025</li>
            </ul>
            </div>

            <div className="promo-card">
            <div className="promo-header">
                <h4>Daily Cashback</h4>
                <button className="claim-button">Claim</button>
            </div>
            <div className="promo-amount">PHP 500 <span className="tag blue">CASHBACK</span></div>
            <p>5% cashback on all losses, credited daily</p>
            <ul className="promo-conditions">
                <li>📌 Minimum 24-hour play session</li>
                <li>🕒 Expires: 6/30/2025</li>
            </ul>
            </div>

            <div className="promo-card">
            <div className="promo-header">
                <h4>Weekend Free Credit</h4>
                <button className="claim-button">Claim</button>
            </div>
            <div className="promo-amount">PHP 200 <span className="tag green">FREE CREDIT</span></div>
            <p>Free PHP 200 credit every weekend</p>
            <ul className="promo-conditions">
                <li>📌 Active player (3+ days this week)</li>
                <li>🕒 Expires: 6/15/2025</li>
            </ul>
            </div>

            <div className="promo-card disabled">
            <div className="promo-header">
                <h4>VIP Special Offer</h4>
            </div>
            <div className="promo-amount">PHP 2,000 <span className="tag orange">DEPOSIT BONUS</span></div>
            <p>20% deposit bonus for VIP members</p>
            <ul className="promo-conditions">
                <li>👑 VIP status required</li>
                <li>🕒 Expires: 7/1/2025</li>
            </ul>
            <div className="not-eligible">⚠️ Not eligible for this promotion</div>
            </div>
        </div>

        <h3 className="section-title"><i className="fas fa-history"></i> Claimed Promotions</h3>
        <table className="claimed-table">
            <thead>
            <tr>
                <th>Date</th>
                <th>Promotion</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>6/1/2025</td>
                <td>Sign-up Bonus</td>
                <td className="amount">PHP 50</td>
                <td><span className="status completed">COMPLETED</span></td>
            </tr>
            <tr>
                <td>6/2/2025</td>
                <td>First Deposit Bonus</td>
                <td className="amount">PHP 300</td>
                <td><span className="status completed">COMPLETED</span></td>
            </tr>
            <tr>
                <td>6/8/2025</td>
                <td>Loyalty Reward</td>
                <td className="amount">PHP 25</td>
                <td><span className="status pending">PENDING</span></td>
            </tr>
            </tbody>
        </table>

        <div className="promo-terms">
            <ul>
            <li>All promotions are subject to terms and conditions</li>
            <li>Bonus funds may have wagering requirements</li>
            <li>Promotions cannot be combined unless specified</li>
            <li>Game Time Inc reserves the right to modify or cancel promotions</li>
            <li>Contact support for any promotion-related queries</li>
            </ul>
        </div>
        </div>

        );
    };