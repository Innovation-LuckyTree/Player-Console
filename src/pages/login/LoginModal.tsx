/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, Form, Input, Button, Checkbox, Typography, FormProps, message } from 'antd';
import { FC } from 'react';
import '../../modal.css';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginRequest } from './models/request';
import { useAuth } from '../../shared/hooks/useAuth';

const { Text, Link, Title } = Typography;

interface LoginModalProps {
  isModalOpen: boolean;
  handleOk: (code: number) => void;
  handleCancel: () => void;
}

export const LoginModal: FC<LoginModalProps> =({isModalOpen, handleOk, handleCancel}) => {
  const [form] = Form.useForm();
  const {login,loading, error} = useAuth();

  const handleLogin: FormProps<LoginRequest>['onFinish'] = async (formValues) => {
    try{
      const values = await form.validateFields();

      const loginRequest: LoginRequest = {
        userName: values.userName,
        password: formValues.password,
        ipAddress: "10.0.0.1"
      };
      
      await login(loginRequest);
      
      // response callback
      handleOk(4);
    }
    catch(e) {
      message.error(error ?? "Username or Password is incorrect");
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
          <Title level={3} style={{ color: 'white', marginBottom: 4 }}>Log In</Title>
          <Text style={{ color: '#ccc' }}>Welcome back to Game Time Inc</Text>
        </div>

        <Form form={form}  onFinish={handleLogin} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item label="Username" name="userName" rules={[{ required: true, message: 'Please input your username' }]}>
            <Input
              placeholder="Enter username"
              // inputMode="numeric"
              // pattern="[0-9]*" 
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox style={{ color: 'white' }}>Keep Me Logged In</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button block className="login-btn" type="primary" htmlType="submit" loading={loading}>
              Log In
            </Button>
          </Form.Item>
        </Form>

        <div className="login-links">
          <Link onClick={() => handleOk(3)} href="#">Forgot your password?</Link>
          <br />
          <Text style={{ color: 'white' }}>
            Don't have an account? <Link onClick={() => handleOk(2)} href="#">Create Account</Link>
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