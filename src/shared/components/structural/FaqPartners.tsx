/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"

export const FaqPartners: FC =() => {
  return (
    <section className="faq-partners-section">
        <div className="faq-partners-container">
            <div className="faq">
                <h2>Frequently Asked Questions</h2>
                <div className="accordion">
                <div className="accordion-item active">
                    <div className="accordion-title">Is Game Time Inc safe and secure?</div>
                    <div className="accordion-content">Yes, Game Time Inc is fully licensed by PAGCOR and uses advanced SSL encryption...</div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-title">How do I withdraw my winnings?</div>
                    <div className="accordion-content">Withdrawals are processed via your wallet, accessible from the top bar.</div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-title">What is the minimum age requirement?</div>
                    <div className="accordion-content">Players must be 18+ years old to participate.</div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-title">Are the games fair and random?</div>
                    <div className="accordion-content">Yes, all games are tested for fairness and randomness by third-party auditors.</div>
                </div>
                </div>
            </div>

            <div className="partners">
                <h2>Our Partners</h2>
                <div className="partners-grid">
                <div>🎰 Pragmatic Play</div>
                <div>🎲 Evolution</div>
                <div>🎮 NetEnt</div>
                <div>🎯 Microgaming</div>
                <div>🎪 Play’n GO</div>
                <div>🐍 Yggdrasil</div>
                <div>⚡ Quickspin</div>
                <div>🐅 Red Tiger</div>
                <div>⏰ Big Time Gaming</div>
                <div>📘 Blueprint</div>
                <div>🦌 ELK Studios</div>
                <div>⚡ Thunderkick</div>
                </div>
            </div>
            </div>

            <div className="legal-footer">
            <h4>Licensed & Regulated Gaming Platform</h4>
            <p>✔ PAGCOR Licensed &nbsp; ✔ SSL Secured &nbsp; ✔ Fair Play Certified &nbsp; ✔ Responsible Gaming</p>
            <p>Game Time Inc is licensed and regulated by the Philippine Amusement and Gaming Corporation (PAGCOR)...</p>
        </div>
    </section>
  )
}
