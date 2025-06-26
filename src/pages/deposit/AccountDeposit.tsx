/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input, Select } from "antd";
import { FC, useState } from "react";

const { Option } = Select;

export const AccountDeposit: FC = () => {

    const [method, setMethod] = useState("bank");
    const quickAmounts = [100, 200, 300, 400, 800, 1000, 1500, 2000, 2500];
    const [amount, setAmount] = useState<number>(100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 100 && val <= 100000) {
      setAmount(val);
    }
  };

    return (
        <Form layout="vertical">
        <div className="deposit-section">
            <div className="deposit-header">DEPOSIT</div>

            <div className="balance-card">
                <span>Current Balance</span>
                <span style={{ color: "#ff8c00" }}>PHP 1250.43</span>
            </div>

            <div className="deposit-summary" style={{marginBottom: '10px'}}>
                <label>Payment Method</label>
            </div>

            <div className="payment-methods">
                <div className={`payment-method ${method === "bank" ? "active" : ""}`}
                onClick={() => setMethod("bank")}>
                    <div>💳<br />Online Banking</div>
                    <small>Instant</small>
                </div>
                <div
                className={`payment-method ${method === "gcash" ? "active" : ""}`}
                onClick={() => setMethod("gcash")}>
                    <div>🅖<br />GCash</div>
                    <small>Instant</small>
                </div>
            </div>

            {
                (method == "bank") &&
                <div className="bank-summary">
                    <h3>Bank Account Details</h3>
                    <div className="form-row">
                        <div>
                            <Form.Item label="Bank Name" name="bankName">
                                <Input placeholder="e.g., BDO, BPI, Metrobank" className="custom-input" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label="Account Number" name="accountNumber">
                                <Input placeholder="Enter account number" className="custom-input" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <Form.Item label="Account Holder Name" name="holderName">
                                <Input placeholder="Fullname as per bank records" className="custom-input" />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            }

            <div className="deposit-summary" style={{marginBottom: '10px'}}>
                <label>Deposit Limits</label>
                <div style={{ marginTop: "5px" }}></div>
                <span style={{ color: 'var(--accent1)' }}>PHP 100.00 - PHP 100,000.00</span>
            </div>

            <div>
                <Input className="custom-input"
                    addonBefore={
                        <Select defaultValue="PHP" style={{ width: 100 }}>
                            <Option value="PHP">
                                <strong>PHP</strong>
                            </Option>
                        </Select>
                    }
                    type="number"
                    value={amount}
                    min={100} 
                    max={100000}
                    onChange={handleChange}
                />
            </div>

            <div className="deposit-summary">
                <span>Processing Fees</span>
                <span>PHP 0.00</span>
            </div>
            <div className="deposit-summary">
                <span>Receivable Amount</span>
                <span style={{ color: "#ff8c00" }}>PHP {amount.toFixed(2)}</span>
            </div>

            <div className="quick-amounts">
                {
                quickAmounts.map((val) => (
                    <button key={val} onClick={() => setAmount(val)}>{val}</button>
                ))
                }
            </div>

            <div className="deposit-info">
                <strong>Deposit Information:</strong>
                <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                    <li>All deposits are processed instantly</li>
                    <li>No processing fees for deposits</li>
                    <li>Minimum deposit amount is PHP 100.00</li>
                    <li>Contact support if your deposit doesn’t reflect within 5 minutes</li>
                </ul>
            </div>

            <button className="deposit-button">DEPOSIT</button>
        </div>
        </Form>
        );
    };