import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, Modal, Typography } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
const { Title } = Typography;

interface SelfieProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  imageCalback: (image: string | null) => void;
}

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
};

const SelfieUpload: React.FC<SelfieProps> = ({ isModalOpen, handleCancel, imageCalback }) => {
  const [picture, setPicture] = useState<string | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current?.getScreenshot();
    if (pictureSrc) {
      setPicture(pictureSrc);
      imageCalback(pictureSrc);
    }
  }, [imageCalback]);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      centered
      width={400}
      className="custom-login-modal"
    >
      <div className="login-header">
        <Title level={3} style={{ color: 'white', marginBottom: 4 }}>Take Picture</Title>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          border: '2px dashed rgb(72, 69, 210)',
          borderRadius: '10px',
          padding: '5px 0 0 0',
          position: 'relative',
        }}
      >
        <div>
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '25px',
              zIndex: 999,
            }}
          >
            {picture !== null ? (
              <Button
                style={{ textTransform: 'capitalize' }}
                onClick={(e) => {
                  e.preventDefault();
                  setPicture(null);
                  imageCalback(null);
                }}
                color="primary"
              >
                Retake <CameraOutlined />
              </Button>
            ) : (
              <Button
                style={{ textTransform: 'capitalize' }}
                onClick={(e) => {
                  e.preventDefault();
                  capture();
                }}
                color="primary"
              >
                Capture <CameraOutlined />
              </Button>
            )}
          </div>

          {picture === null ? (
            <Webcam
              audio={false}
              height={250}
              ref={webcamRef}
              width={250}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={picture} alt="Captured selfie" style={{ width: 250, height: 250, objectFit: 'cover' }} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SelfieUpload;