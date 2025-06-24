/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { Modal, Form, Input, Button, Typography, FormProps, Select, message } from 'antd';
import { FC, useState } from 'react';
import '../../modal.css';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { RegistrationRequest } from './models/request';
import { userRegistration } from '../../services/userService';
import axios from 'axios';

const { Text, Link, Title } = Typography;
const { Option } = Select;

interface RegModalProps {
  isModalOpen: boolean;
  handleOk: (code: number) => void;
  handleCancel: () => void;
}

export const RegistrationModal: FC<RegModalProps> =({isModalOpen, handleOk, handleCancel}) => {
  const [form] = Form.useForm();
  const [ loading, setLoading] = useState(false);

  const handleRegistration: FormProps<RegistrationRequest>['onFinish'] = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const regRequest: RegistrationRequest = {
        userName: values.userName,
        mobileNumber: values.mobileNumber,
        referralCode: values.referralCode,
        password: values.password,
        fullName: values.fullName
      };

      await userRegistration(regRequest);
      handleOk(5);
    }
    catch(err: any) {
      if (axios.isAxiosError(err)) {
        const code = err.status;
        switch (code){
          case 404:
            message.error("Api not found"); break;
          case 500:
            message.error("Something went wrong with the servers. Try again later."); break; 
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={isModalOpen} 
        footer={null}
        onCancel={handleCancel}
        centered
        width={420}
        className="custom-login-modal">

        <div className="login-header">
          <Title level={3} style={{ color: 'white', marginBottom: 4 }}>Create Account</Title>
          <Text style={{ color: '#ccc' }}>Join Game Time Inc and start your gaming journey</Text>
        </div>

        <Form form={form}  onFinish={handleRegistration} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item label="Username" name="userName" rules={[{ required: true, message: 'Please input your username' }]}>
            <Input
              placeholder="Enter username"
              prefix={<UserOutlined/>}
              count={{
                max: 11,
                strategy: (txt) => txt.length,
                exceedFormatter: (txt) => txt.slice(0, 11),
              }}
              />
          </Form.Item>
          <Form.Item label="Password" name="password"  rules={[{ required: true, message: 'Please input your password' }]}>
            <Input.Password placeholder="Enter Password" prefix={<LockOutlined/>} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          </Form.Item>

          <Form.Item
                label="Phone Number"
                name="mobileNumber"
                rules={[{ required: true, message: 'Please enter your phone number!' }]}
            >
                <Input
                    addonBefore={
                        <Select defaultValue="PH" style={{ width: 100 }}>
                            <Option value="PH">
                                <strong>PH</strong> +63
                            </Option>
                        </Select>
                    }
                    placeholder="9XX XXX XXXX"
                    inputMode="numeric"
                    pattern="[0-9]*" 
                    count={{
                        max: 10,
                        strategy: (txt) => txt.length,
                        exceedFormatter: (txt) => txt.slice(0, 10),
                    }}
                />
            </Form.Item>

          <Form.Item label="Referral/Affiliate" name="referralCode" rules={[{ required: false }]}>
            <Input placeholder="Enter Referral Code"/>
          </Form.Item>

          <Form.Item label="Fullname" name="fullName" rules={[{ required: true, message: 'Please input your fullname' }]}>
            <Input placeholder="Enter you fullname"/>
          </Form.Item>

          <Form.Item>
            <Button block className="login-btn" type="primary" htmlType="submit" loading={loading}>
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <div className="login-links">
          <Text style={{ color: 'white' }}>
            Already have an account? <Link onClick={() => handleOk(1)} href="#">Login</Link>
          </Text>
        </div>

        <div className="login-footer">
          <div className="pagcor-badge">🎰 Regulated by PAGCOR</div>
          <Text style={{ color: '#aaa' }}>
            If you encounter any issues while logging in, please contact our{' '}
            <Link href="#">Customer Service</Link> for further assistance.
          </Text>
        </div>

      </Modal>
    </>
  )
  }