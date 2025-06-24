/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import styles from './basicFileUpload.module.css';
import { UploadOutlined, CameraOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import SelfieUpload from './SelfieUpload';

interface DragDropProps {
  label: string;
  callBack: (data: { status: 'start' | 'done' | 'error'; url?: string }) => void;
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
          callBack({ status: 'done', url: previewFile.preview });
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

          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color:'white' }}>
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
        <p className={styles.label}>{label}</p>
      </div>

      {
        (openSelfie) &&
        <SelfieUpload isModalOpen={openSelfie} handleCancel={() => setopenSelfie(false)} imageCalback={handleSelfieCallback} />
      }
    </>
  );
};
