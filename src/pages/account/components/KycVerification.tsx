/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, Form, FormProps, message, Spin, Input, Typography, DatePicker, Button, Select  } from 'antd';
import { FC, useState } from 'react';
import '../../../modal.css';
import { VerificationRequest } from '../models/VerificationRequest';
import { BasicFileUpload } from '../../../shared/components/fileupload/BasicFileUpload';
import dayjs from "dayjs";
import { NatureOfWorkList, SalaryRangeList, SourceOfIncomeList } from '../../../utils/enums';
import { validateAge } from '../../../utils/commonHelpers';

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
  const [form] = Form.useForm();
  const [uploadingCount, setUploadingCount] = useState(0);
  const suffixOptions = ["Jr", "Sr", "II", "III", "IV", "V"];

  const handleVerification: FormProps<VerificationRequest>['onFinish'] = async () => {
    try {
      // const values = await form.validateFields();

      const verificationRequest: VerificationRequest = {
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        mobileNumber: '',
        dateOfBirt: '',
        idFront: '',
        idBack: '',
        selfie: '',
        occupation: '',
        sourceOfIncome: '',
        monthlyIncome: '',
      };

      console.log(verificationRequest);
      handleOk();
    } catch (e) {
      message.error('Something went wrong.');
    }
  };

  const handleUploadCallback = (data: { status: 'start' | 'done' | 'error'; url?: string }) => {
    if (data.status === 'start') {
      setUploadingCount((prev) => prev + 1);
    } else {
      setUploadingCount((prev) => Math.max(prev - 1, 0));

      if (data.status === 'done') {
        console.log('Upload successful:', data.url);
      } else {
        message.error('Upload failed.');
      }
    }
  };

  const isUploading = uploadingCount > 0;

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
        <Spin spinning={isUploading} tip="Uploading...">
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
              name="dateOfBirth"
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
              <Form.Item label="Occupation" name="occupation" style={{ width: "100%" }}
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
              <Form.Item label="Monthly Income" name="monthlyIncome" style={{ width: "100%" }}
              rules={[{ required: true, message: 'Please select salary' }]}>
                <Select placeholder="Select Salary" allowClear>
                  {SalaryRangeList().map((item) => (
                    <Option key={item} value={item}>
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
