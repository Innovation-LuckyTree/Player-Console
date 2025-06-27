/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, Form, FormProps, message, Spin, Input, Typography, DatePicker, Button, Select  } from 'antd';
import { FC, useEffect, useState } from 'react';
import '../../../modal.css';
import { VerificationRequest } from '../models/VerificationRequest';
import { BasicFileUpload } from '../../../shared/components/fileupload/BasicFileUpload';
import dayjs from "dayjs";
import { NatureOfWorkList, SalaryRangeList, SourceOfIncomeList } from '../../../utils/enums';
import { formatDateToYMD, validateAge } from '../../../utils/commonHelpers';
import { UserInfo } from '../hooks/UserInfo';
import { basicVerification } from '../../../services/userService';

const { Text, Title } = Typography;
const { Option } = Select;

interface KycVerificationProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export const KycVerification: FC<KycVerificationProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const { userInfo } = UserInfo();
  const [form] = Form.useForm();
  const [loadingCount, setloadingCount] = useState(0);
  const suffixOptions = ["Jr", "Sr", "II", "III", "IV", "V"];

  const handleVerification: FormProps<VerificationRequest>['onFinish'] = async () => {
    try {
      const values = await form.validateFields();
      const payload: VerificationRequest = {
        accountObjectId: userInfo?.accountObjectId as string,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        suffix: values.suffix,
        mobileNumber: values.mobileNumber,
        birthDate: formatDateToYMD(values.birthDate),
        natureOfWork: values.natureOfWork,
        sourceOfIncome: values.sourceOfIncome,
        salaryRange: values.salaryRange,
        frontIdPath: "",
        selfiePath: "",
        backIdPath: ""
      }

      setloadingCount(1);
      try {
        await basicVerification(payload);
        handleOk();
        handleCancel();
      } catch (err: any) {
        setloadingCount(0);
        console.log(err);
      } finally {
        setloadingCount(0);
      }
      // handleOk();
    } catch (e) {
      message.error('Something went wrong.');
    }
  };

  const handleUploadCallback = (data: { status: 'start' | 'done' | 'error'; url?: string; data?: string; label?: string }) => {
    if (data.status === 'start') {
      setloadingCount((prev) => prev + 1);
    } else {
      setloadingCount((prev) => Math.max(prev - 1, 0));

      if (data.status === 'done') {
        console.log('Upload successful:', data.url);
      } else {
        message.error('Upload failed.');
      }
    }
  };

  const isloading = loadingCount > 0;

  useEffect(() => {
    if (isModalOpen && userInfo) {
      form.setFieldsValue({
        firstName: userInfo?.firstName ?? '',
        middleName: userInfo?.middleName ?? '',
        lastName: userInfo?.lastName ?? '',
        suffix: userInfo?.suffix ?? undefined,
        mobileNumber: userInfo?.mobileNumber ?? '',
        birthDate: userInfo?.birthDate ? dayjs(userInfo?.birthDate) : null,
        natureOfWork: userInfo?.natureOfWork ?? undefined,
        sourceOfIncome: userInfo?.sourceOfIncome ?? undefined,
        salaryRange: userInfo?.salaryRange ?? undefined,
      });
    }
  }, [isModalOpen, userInfo, form]);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      centered
      width={600}
      className="custom-login-modal"
    >
      <div className="login-header">
        <Title level={3} style={{ color: 'white', marginBottom: 4 }}>KYC</Title>
        <Text style={{ color: '#ccc' }}>Complete your verification to become a fully verified player</Text>
      </div>
      <Form form={form}  onFinish={handleVerification} layout="vertical" style={{ marginTop: 24 }}>
        <Spin spinning={isloading} tip="Uploading...">
          <h3>Personal Information</h3>
          <div style={{display:'flex', gap:'10px'}}>
              <Form.Item label="First Name" name="firstName" 
                rules={[{ required: true, message: 'Please input first name' }]}>
                <Input className="fullWidth" />
              </Form.Item>
              <Form.Item label="Middle Name" name="middleName" 
                rules={[{ required: true, message: 'Please input middle name' }]}>
                <Input className="fullWidth" />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" 
                rules={[{ required: true, message: 'Please input last name' }]}>
                <Input className="fullWidth" />
              </Form.Item>
              <Form.Item
                label="Suffix"
                name="suffix"
                rules={[
                  {
                    required: false, // Optional field
                  },
                ]}
              >
                <Select allowClear>
                  {suffixOptions.map((suffix) => (
                    <Option key={suffix} value={suffix}>
                      {suffix}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
          </div>
          <div style={{display:'flex', gap:'10px'}}>
            <Form.Item label="Mobile Number" name="mobileNumber" 
              rules={[
                { required: true, message: "Please enter your mobile number!" },
                {
                  pattern: /^0\d{10}$/,
                  message: "Mobile number must be 11 digits and start with 0",
                },
              ]}
            >
              <Input inputMode="numeric" className="fullWidth" maxLength={11} placeholder="e.g. 09123456789"
                count={{
                  max: 11,
                  strategy: (txt) => txt.length,
                  exceedFormatter: (txt) => txt.slice(0, 11),
                }}
              />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="birthDate"
              rules={[
                { required: true, message: "Please select your date of birth!" },
                { validator: validateAge },
              ]}
            >
              <DatePicker
                style={{ maxWidth: "100%", minWidth:'200px' }}
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current > dayjs().endOf("day")}
                placeholder="Select date of birth"
              />
            </Form.Item>
          </div>
          <h3>Document Upload</h3>
          <div style={{display:'flex',gap:'15px', justifyContent:'space-between'}}>
            <BasicFileUpload label="ID FRONT" callBack={handleUploadCallback} />
            <BasicFileUpload label="ID BACK" callBack={handleUploadCallback} />
            <BasicFileUpload label="SELFIE" callBack={handleUploadCallback} />
          </div>

          <h3>Professional Information</h3>
          <div style={{display:'flex', gap:'10px'}}>
              <Form.Item label="Occupation" name="natureOfWork" style={{ width: "100%" }}
              rules={[{ required: true, message: 'Please select occupation' }]}>
                <Select placeholder="Select Occupation" allowClear showSearch optionFilterProp="children" >
                  {NatureOfWorkList().map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Source Of Income" name="sourceOfIncome" style={{ width: "100%" }}
              rules={[{ required: true, message: 'Please select source of income' }]}>
                <Select placeholder="Select Source of Income" allowClear>
                  {SourceOfIncomeList().map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Monthly Income" name="salaryRange" style={{ width: "100%" }}
              rules={[{ required: true, message: 'Please select salary' }]}>
                <Select placeholder="Select Salary" allowClear>
                  {SalaryRangeList().map((item, index) => (
                    <Option key={index} value={index}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: '20px'
          }}>
            <Button onClick={handleCancel} style={{marginTop:'5px'}} type="default">Cancel</Button>

            <Button className="login-btn" type="primary" htmlType="submit">
              Submit Verification
            </Button>
          </div>
        </Spin>
      </Form>
    </Modal>
  );
};
