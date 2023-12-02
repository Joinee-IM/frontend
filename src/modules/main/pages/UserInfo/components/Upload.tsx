import { message } from 'antd';
import AntdUpload from 'antd/es/upload';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import type { UploadFile, UploadProps as AntdUploadProps } from 'antd';

import UploadIcon from '@/assets/icons/Upload';
import { RippleButton } from '@/components';
import Divider from '@/components/Divider';
import { useEditAvatar } from '@/modules/main/pages/UserInfo/services';
import theme from '@/provider/theme/theme';
import { flexCenter } from '@/utils/css';

interface UploadProps {
  handleUploadSuccess?: () => void;
  uploadConfig?: AntdUploadProps;
}

const { Dragger } = AntdUpload;

const UploadContainer = styled.div`
  color: ${({ theme }) => theme.main[500]};
  height: 400px;
  box-sizing: border-box;
  padding: 0 10%;
  ${flexCenter}
  flex-direction: column;
  & .ant-upload-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  & .ant-upload-list {
    width: 100%;
  }
`;

export default function Upload({ handleUploadSuccess, uploadConfig }: UploadProps) {
  const { account_id } = useParams();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { mutate } = useEditAvatar(Number(account_id));
  const onFileChange = (fileList: UploadFile[]) => {
    setFileList(fileList);
  };

  const baseUploadProps: AntdUploadProps = useMemo(
    () => ({
      maxCount: 1,
      onChange: (info) => {
        if (info.file.status === 'uploading') {
          const clear = setInterval(() => {
            if (Number(info.file.percent) >= 99) {
              clearInterval(clear);
            } else info.file.percent = Number(info.file.percent) + 10;
          }, 150);
        }
        onFileChange(info.fileList);
        switch (info.file.status) {
          case 'done':
            void message.success(`${info.file.name} 上傳成功！！`);
            break;
          case 'error':
            void message.error(`${info.file.name} 上傳失敗 😖`);
            break;
          case 'uploading':
          default:
            break;
        }
      },
      customRequest: ({ file, onError: uploadError, onSuccess: uploadSuccess }) => {
        if (file instanceof File) {
          mutate(
            { image: file },
            {
              onSuccess: () => {
                uploadSuccess?.(file);
                handleUploadSuccess?.();
                setFileList([]);
              },
              onError: uploadError,
            },
          );
        }
      },
      ...uploadConfig,
    }),
    [handleUploadSuccess, mutate, uploadConfig],
  );

  return (
    <UploadContainer>
      <Dragger
        {...baseUploadProps}
        beforeUpload={(file) => {
          console.log(file);
          const isImage = ['image/jpeg', 'image/png'].includes(file.type);
          if (!isImage) {
            void message.error(`${file.name} 非圖片檔`);
          }
          return isImage || AntdUpload.LIST_IGNORE;
        }}
        style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
        fileList={[]}
      >
        <UploadIcon style={{ fontSize: 'clamp(100px, 25vw, 200px)', color: theme.main[500] }} />
      </Dragger>
      將檔案拖曳至此
      <Divider text="或是"></Divider>
      <AntdUpload {...baseUploadProps} accept=".jpg,.jpeg,.png" fileList={fileList}>
        <RippleButton category="solid" palette="main">
          從電腦上傳檔案
        </RippleButton>
      </AntdUpload>
    </UploadContainer>
  );
}
