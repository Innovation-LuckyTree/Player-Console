/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message } from "antd";
import { KycVerification } from "./components/KycVerification";
import { UserInfo } from "./hooks/UserInfo";
import dayjs from "dayjs";
import { formatDateTime, formatDateToYMD, validateAge } from "../../utils/commonHelpers";
import { UserUpdateRequest } from "./models/UserUpdateRequest";
import { basicUserUpdate } from "../../services/userService";

// const { Text } = Typography;

export const MyProfile: FC = () => {
    const { userInfo, getUserDetails } = UserInfo();

    const [form] = Form.useForm();
    const [openVerification, setopenVerification] = useState(false);

    const handleVerificationOkay = () => {
        getUserDetails();
    }

    const handleSaveChanges = async () => {

        const values = await form.validateFields();
        const updateRequest: UserUpdateRequest = {
            userId: userInfo?.accountInfo.userId,
            birthDate: values.birthDate,
            email: values.email,
            mobileNumber: values.mobileNumber
        };

        try {
            await basicUserUpdate(updateRequest);
            message.success("Basic information updated successfully");
            handleVerificationOkay();
        } catch (err: any) {
            message.error(err ?? "Unable to update user info!");
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            username: userInfo?.accountInfo.userName,
            legalName: userInfo?.accountInfo.fullName,
            realName: userInfo?.accountInfo.fullName,
            mobileNumber: userInfo?.accountInfo.mobileNumber,
            email: userInfo?.accountInfo.email,
            dateOfBirth: userInfo?.accountInfo.birthDate ? dayjs(userInfo.accountInfo.birthDate) : null,
            registered: formatDateToYMD(userInfo?.accountInfo.dateCreated),
            lastLogin: formatDateTime(userInfo?.accountInfo.lastPasswordChange)
        });
    }, [userInfo, form]);

  return (
    <>
    <div className="verify-banner">
    ⚠️ Verify Your Profile Now! <a onClick={() => setopenVerification(true)} href="#">Click Here</a>
    </div>
    <div className="form-section">
        <Form layout="vertical" form={form} onFinish={handleSaveChanges}>
            <div className="form-row">
            <div>
                <Form.Item label="Username" name="username">
                    <Input disabled className="custom-input" />
                </Form.Item>
            </div>
            <div>
                <Form.Item label="Legal Name" name="legalName">
                    <Input disabled readOnly className="custom-input" />
                </Form.Item>
            </div>
            </div>

            <div className="form-row">
            <div>
                <Form.Item label="Real Name" name="realName">
                    <Input disabled className="custom-input" />
                </Form.Item>
            </div>
            <div>
                <div className="form-item-inline">
                <Form.Item label="Contact Number" name="mobileNumber" className="flex-1">
                    <Input className="custom-input" 
                    count={{
                        max: 11,
                        strategy: (txt) => txt.length,
                        exceedFormatter: (txt) => txt.slice(0, 11),
                    }} 
                    />
                </Form.Item>
                <button className="small-button">Verify</button>
                </div>
                {/* <Text type="secondary" style={{ fontSize: "12px" }}>
                Format: +63 9XX XXX XXXX or 09XX XXX XXXX
                </Text> */}
            </div>
            </div>

            <div className="form-row">
            <div>
                <div className="form-item-inline">
                    <Form.Item label="Email" name="email" className="flex-1">
                        <Input className="custom-input" />
                    </Form.Item>
                    <button className="small-button">✉</button>
                </div>
            </div>
            <div>
                <Form.Item
                label="Date of Birth"
                name="birthDate"
                rules={[
                    { required: true, message: "Please select your date of birth!" },
                    { validator: validateAge },
                ]}
                >
                <DatePicker
                    style={{ width: "100%"}}
                    format="YYYY-MM-DD"
                    disabledDate={(current) => current && current > dayjs().endOf("day")}
                    placeholder="Select date of birth"
                />
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
                <Button className="save-changes-button" htmlType="submit">Save Changes</Button>
            </div>
        </Form>
    </div>

    <KycVerification isModalOpen={openVerification} handleOk={handleVerificationOkay} handleCancel={() => setopenVerification(false)} />
    </>
  )
}