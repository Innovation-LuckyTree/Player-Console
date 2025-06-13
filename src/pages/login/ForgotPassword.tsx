/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, Form, Input, Button, Typography, FormProps, message, Select } from 'antd';
import { FC } from 'react';
import './login.css'
import { LoginRequest } from './models/request';
import { useAuth } from '../../shared/hooks/useAuth';

const { Text, Link, Title } = Typography;
const { Option } = Select;

interface ResetPassModalProps {
  isModalOpen: boolean;
  handleOk: (code: number) => void;
  handleCancel: () => void;
}

export const ForgotPassword: FC<ResetPassModalProps> =({isModalOpen, handleOk, handleCancel}) => {
  const [form] = Form.useForm();
  const {login,loading, error} = useAuth();

  const handleResetPassword: FormProps<LoginRequest>['onFinish'] = async (formValues) => {
    try{
      const values = await form.validateFields();
      console.log(values);
    }
    catch(e){
      message.error(error);
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
          <Title level={3} style={{ color: 'white', marginBottom: 4 }}>Reset Password</Title>
          <Text style={{ color: '#ccc' }}>Enter your phone number to receive a verification code</Text>
        </div>

        <Form form={form}  onFinish={handleResetPassword} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
                label="Phone Number"
                name="phone"
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

          <Form.Item>
            <Button block className="login-btn" type="primary" htmlType="submit" loading={loading}>
              Send Verification Code
            </Button>
          </Form.Item>
        </Form>

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