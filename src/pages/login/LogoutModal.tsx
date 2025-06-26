/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, Button, Typography } from 'antd';
import { FC } from 'react';
import '../../modal.css';

const { Text, Title } = Typography;

interface LogoutModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export const LogoutModal: FC<LogoutModalProps> =({isModalOpen, handleOk, handleCancel}) => {

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
          <Title level={3} style={{ color: 'white', marginBottom: 4 }}>Logout Confirmation</Title>
          <Text style={{ color: '#ccc' }}>Confirm to end your session</Text>
        </div>
        <div style={{marginTop:'15px'}}>
            <Text style={{ color: '#aaa'}}>
                Are you sure you want to logout from your account? You will need to login again
                to access your gaming dashboard.
            </Text>
            <Button onClick={() => handleOk() } style={{marginTop:'15px'}} block className="login-btn" type="primary" htmlType="submit">
              Logout
            </Button>
        </div>
        <div className="login-footer">
          <Text style={{ color: '#aaa' }}>
            Your session will be securely terminated
          </Text>
        </div>

      </Modal>
    </>
  )
  }