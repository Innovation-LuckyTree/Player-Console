/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";

export const AccountWallet: FC = () => {

  return (
    <>
    <div className="wallet-section">
        <div className="wallet-header">
            <h2>My Wallet</h2>
            <p>Manage your gaming credits across different providers</p>
        </div>

        <div className="wallet-total">
            <div className="wallet-total-label">Total Amount</div>
            <div className="wallet-total-amount">
            1250.43 <span className="peso-icon">₱</span>
            </div>
            <div className="wallet-subtext">Available across eligible gaming providers</div>
        </div>

        <div className="wallet-category">
            <h3>Sports</h3>

            <div className="wallet-grid">
                
            <div className="wallet-card">
                <div className="wallet-card-title">3SING</div>
                <div className="wallet-card-amount">1250.43</div>
                <div className="wallet-tags">
                <span className="tag real">Real Money</span>
                </div>
                <p className="wallet-card-note">Real money only</p>
            </div>

            <div className="wallet-card">
                <div className="wallet-card-title">UG</div>
                <div className="wallet-card-amount">1250.43</div>
                <div className="wallet-tags">
                <span className="tag real">Real Money</span>
                <span className="tag bonus">Bonus</span>
                </div>
            </div>

            <div className="wallet-card">
                <div className="wallet-card-title">M8</div>
                <div className="wallet-card-amount">1250.43</div>
                <div className="wallet-tags">
                <span className="tag real">Real Money</span>
                </div>
                <p className="wallet-card-note">Real money only</p>
            </div>

            <div className="wallet-card">
                <div className="wallet-card-title">CMD</div>
                <div className="wallet-card-amount">1250.43</div>
                <div className="wallet-tags">
                <span className="tag real">Real Money</span>
                <span className="tag bonus">Bonus</span>
                </div>
            </div>

            <div className="wallet-card">
                <div className="wallet-card-title">SBO</div>
                <div className="wallet-card-amount">1250.43</div>
                <div className="wallet-tags">
                <span className="tag real">Real Money</span>
                </div>
                <p className="wallet-card-note">Real money only</p>
            </div>

            <div className="wallet-card">
                <div className="wallet-card-title">BTI</div>
                <div className="wallet-card-amount">1250.43</div>
                <div className="wallet-tags">
                <span className="tag real">Real Money</span>
                <span className="tag bonus">Bonus</span>
                </div>
            </div>
            </div>
        </div>

        <div className="deposit-info">
            <strong>Wallet Information:</strong>
            <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                <li>You have one unified wallet that works across all gaming providers</li>
                <li>Different providers may have varying eligibility for bonus credits</li>
                <li>Some providers accept only real money deposits, while others accept both real money and bonus credits</li>
                <li>Your available balance may differ between providers based on their credit acceptance policies</li>
            </ul>
        </div>
    </div>
    </>
  )
}