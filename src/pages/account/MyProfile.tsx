/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import { Form, Input, Typography } from "antd";
import { KycVerification } from "./components/KycVerification";
const { Text } = Typography;

export const MyProfile: FC = () => {

    const [openVerification, setopenVerification] = useState(false);

    const handleVerificationOkay = () => {
        console.log("Successful verifcation");
    }
  return (
    <>
    <div className="verify-banner">
    ⚠️ Verify Your Profile Now! <a onClick={() => setopenVerification(true)} href="#">Click Here</a>
    </div>
    <div className="form-section">
        <Form layout="vertical">
            <div className="form-row">
            <div>
                <Form.Item label="Username" name="username">
                <Input disabled className="custom-input" />
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Legal Name" name="legalName">
                <Input disabled className="custom-input" />
                </Form.Item>
            </div>
            </div>

            <div className="form-row">
            <div>
                <Form.Item label="Real Name" name="realName">
                <Input className="custom-input" />
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Contact Number" name="contactNumber">
                <div className="inline-field">
                    <Input className="custom-input" />
                    <button className="small-button">Verify</button>
                </div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                    Format: +63 9XX XXX XXXX or 09XX XXX XXXX
                </Text>
                </Form.Item>
            </div>
            </div>

            <div className="form-row">
            <div>
                <Form.Item label="Email" name="email">
                <div className="inline-field">
                    <Input className="custom-input" />
                    <button className="small-button">✉</button>
                </div>
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Date of Birth" name="dob">
                <Input className="custom-input" />
                </Form.Item>
            </div>
            </div>

            <div className="form-row">
            <div>
                <Form.Item label="Registered" name="registered">
                <Input disabled className="custom-input" />
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Last Login" name="lastLogin">
                <Input disabled className="custom-input" />
                </Form.Item>
            </div>
            </div>

            <div className="save-button">
            <button className="save-changes-button">Save Changes</button>
            </div>
        </Form>
    </div>

    <KycVerification isModalOpen={openVerification} handleOk={handleVerificationOkay} handleCancel={() => setopenVerification(false)} />
    </>
  )
}