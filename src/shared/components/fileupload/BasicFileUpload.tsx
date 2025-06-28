/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import styles from './basicFileUpload.module.css';
import { UploadOutlined, CameraOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import SelfieUpload from './SelfieUpload';
import { UploadPayload } from './models/UploadPayload';
import { uploadImageString } from '../../../services/uploadService';

interface DragDropProps {
  label: string;
  callBack: (data: { status: 'start' | 'done' | 'error'; url?: string, data?: string; label?: string }) => void;
}

export const BasicFileUpload: React.FC<DragDropProps> = ({ label, callBack }) => {

  const [openSelfie, setopenSelfie] = useState(false);
  const [file, setFile] = useState<File & { preview: string } | null>(null);

  const handleCompressFile = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: async (acceptedFiles: File[]) => {
      const rawFile = acceptedFiles[0];
      if (!rawFile) return;
      callBack({ status: 'start' });

      try {
        const compressed = await handleCompressFile(rawFile);
        const previewFile = Object.assign(compressed, {
          preview: URL.createObjectURL(compressed),
        });

        setFile(previewFile);

        const reader = new FileReader();
        reader.readAsDataURL(compressed);
        reader.onloadend = () => {
          const payload: UploadPayload = {
            base64Image: reader.result as string
          };

          uploadImageString(payload).then((resp) => {
            callBack({ status: 'done', url: previewFile.preview, data: resp.data, label: label });
          }).catch((error) => {
            if (error.response) {
              // Server responded with a status code outside 2xx
              const status = error.response.status;
              if (status === 400) {
                message.error('Bad request (400). Please check your input.');
              } else if (status === 404) {
                message.error('Resource not found (404).');
              } else {
                message.error(`Unexpected error (${status}).`);
              }
            } else if (error.request) {
              // Request was made but no response
              message.error('No response from server.');
            } else {
              // Something else happened
              message.error(`Error: ${error.message}`);
            }
          });
        };
      } catch (error) {
        console.error('Compression failed:', error);
        callBack({ status: 'error' }); //
      }
    },
  });

  const handleSelfieCallback = (image: string | null) => {
    console.log(image);
  }

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.dropzone} {...getRootProps()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input {...getInputProps()} />

          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color:'white', cursor:'pointer' }}>
            {file ? (
              <img src={file.preview} alt="preview" className={styles.previewImage} />
            ) : (
              <>
                <UploadOutlined />
                <p>Browse Your File<br />Here</p>
              </>
            )}
          </div>

          {label.toLowerCase().includes('selfie') && (
            <Button
              className='small-button'
              icon={<CameraOutlined />}
              type="primary"
              size="small"
              style={{ marginTop: '-30px' }}
              onClick={(e) => {
                e.stopPropagation();
                setopenSelfie(true);
              }}
            >
              Take a Picture
            </Button>
          )}
        </div>
        <p className={styles.label}>{label} <span style={{color:'#ff4d4f',fontSize:'20px'}}>*</span></p>
      </div>

      {
        (openSelfie) &&
        <SelfieUpload isModalOpen={openSelfie} handleCancel={() => setopenSelfie(false)} imageCalback={handleSelfieCallback} />
      }
    </>
  );
};
