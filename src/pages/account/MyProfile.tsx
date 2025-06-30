/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useRef, useState } from "react";
import { Button, DatePicker, Form, Input, message, Typography } from "antd";
import { KycVerification } from "./components/KycVerification";
import { UserInfo } from "./hooks/UserInfo";
import dayjs from "dayjs";
import {
  formatDateTime,
  formatDateToYMD,
  validateAge,
} from "../../utils/commonHelpers";
import { UserUpdateRequest } from "./models/UserUpdateRequest";
import { basicUserUpdate } from "../../services/userService";
import { getImageString } from "../../services/uploadService";

const { Text } = Typography;

export const MyProfile: FC = () => {
  const initialized = useRef(false)
  const { userInfo, getUserDetails } = UserInfo();
  const [form] = Form.useForm();
  const [openVerification, setopenVerification] = useState(false);

  const [frontImg, setfrontImg] = useState("");
  const [backImg, setbackImg] = useState("");
  const [selfieImg, setselfieImg] = useState("");

  const handleVerificationOkay = () => {
    getUserDetails();
  };

  const handleSaveChanges = async () => {
    try {
      const values = await form.validateFields();

      const updateRequest: UserUpdateRequest = {
        userId: userInfo?.accountInfo?.userId,
        birthDate: formatDateToYMD(values.birthDate),
        email: values.email,
        mobileNumber: values.mobileNumber,
      };

      await basicUserUpdate(updateRequest);

      message.success("Your profile information was updated successfully.");
      handleVerificationOkay();
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.errorMessage || err.message || "Unable to update user info!";
      message.error(errorMessage);
    }
  };

  const intImages = async(pathName: string, type: number) => {
    getImageString(pathName)
    .then((resp) => {
      if(type == 0) {
        setfrontImg(resp.data);
      } else if(type == 1) {
        setbackImg(resp.data);
      } else {
        setselfieImg(resp.data);
      }
    })
    .catch((err) => {
      console.error("Image fetch failed", err);
    });
  }

  useEffect(() => {
    form.setFieldsValue({
      username: userInfo?.accountInfo?.userName,
      legalName: userInfo?.accountInfo?.fullName,
      realName: userInfo?.accountInfo?.fullName,
      mobileNumber: userInfo?.accountInfo?.mobileNumber,
      email: userInfo?.accountInfo?.email,
      birthDate: userInfo?.accountInfo?.birthDate
        ? dayjs(userInfo.accountInfo.birthDate)
        : null,
      registered: formatDateToYMD(userInfo?.accountInfo?.dateCreated),
      lastLogin: formatDateTime(userInfo?.accountInfo?.lastPasswordChange),
    });

    if (!initialized.current) {
      initialized.current = true;
      intImages(userInfo?.accountInfo?.frontIdPath as string, 0);
      intImages(userInfo?.accountInfo?.backIdPath as string, 1);
      intImages(userInfo?.accountInfo?.selfiePath as string, 2);
    }
  }, [userInfo, form]);

  return (
    <>
      <div className="verify-banner">
        ⚠️ Verify Your Profile Now!{" "}
        <a onClick={() => setopenVerification(true)} href="#">
          Click Here
        </a>
      </div>

      <div className="form-section">
        <Form layout="vertical" form={form} onFinish={handleSaveChanges}>
          {/* Name Fields */}
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

          {/* Contact Fields */}
          <div className="form-row">
            <div>
                <Form.Item label="Real Name" name="realName">
                    <Input disabled className="custom-input" />
                </Form.Item>
            </div>
            <div>
              <div className="form-item-inline">
                <Form.Item
                  label="Contact Number"
                  name="mobileNumber"
                  className="flex-1"
                >
                  <Input
                    className="custom-input"
                    count={{
                      max: 11,
                      strategy: (txt) => txt.length,
                      exceedFormatter: (txt) => txt.slice(0, 11),
                    }}
                  />
                </Form.Item>
                <Button className="small-button" htmlType="button">
                  Verify
                </Button>
              </div>
              <Text
                type="secondary"
                style={{
                  fontSize: "12px",
                  position: "absolute",
                  marginTop: "-35px",
                }}
              >
                Format: +63 9XX XXX XXXX or 09XX XXX XXXX
              </Text>
            </div>
          </div>

          {/* Email and DOB */}
          <div className="form-row">
            <div>
              <div className="form-item-inline">
                <Form.Item label="Email" name="email" className="flex-1">
                  <Input className="custom-input" />
                </Form.Item>
                <Button className="small-button" htmlType="button">
                  ✉
                </Button>
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
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                  disabledDate={(current) =>
                    current && current > dayjs().endOf("day")
                  }
                  placeholder="Select date of birth"
                />
              </Form.Item>
            </div>
          </div>

          {/* Timestamps */}
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
            <Button className="save-changes-button" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </div>

      {/* Verification Modal */}
      <KycVerification
        isModalOpen={openVerification}
        handleOk={handleVerificationOkay}
        handleCancel={() => setopenVerification(false)}
        frontImgage={frontImg}
        backImage={backImg}
        selfieImage={selfieImg}
      />
    </>
  );
};
