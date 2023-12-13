import { message } from 'antd';
import AntdUpload from 'antd/es/upload';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import type { UploadFile } from 'antd';
import type { RcFile, UploadProps as UploadPropsAntd } from 'antd/es/upload';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

import UploadIcon from '@/assets/icons/Upload';
import { RippleButton } from '@/components';
import Divider from '@/components/Divider';
import theme from '@/provider/theme/theme';
import { flexCenter } from '@/utils/css';

interface UploaderProps extends Exclude<UploadRequestOption, 'file'> {
  file: RcFile;
}

export interface UploadProps {
  uploader?: (option: UploaderProps) => Promise<void>;
  uploadConfig?: UploadPropsAntd;
  successMessage?: 'once' | 'separate';
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

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.gray[300]};
`;

export const UploadImageTitle = () => <ModalTitle>上傳圖片</ModalTitle>;

export default function Upload({
  uploader,
  uploadConfig = {},
  successMessage = 'separate',
}: UploadProps) {
  const { onChange, ...rest } = uploadConfig;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onFileChange = (fileList: UploadFile[]) => {
    setFileList(fileList);
  };

  const baseUploadProps: UploadPropsAntd = useMemo(
    () => ({
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
            if (successMessage === 'separate')
              void message.success(`${info.file.name} 上傳成功 🤩`);
            else if (
              info.fileList.findIndex((file) => info.file.uid === file.uid) ===
              info.fileList.length - 1
            ) {
              void message.success(
                `${
                  info.fileList.filter((file) => file.status === 'done').length
                }張照片 上傳成功 🤩`,
              );
            }
            break;
          case 'error':
            void message.error(`${info.file.name} 上傳失敗 😖`);
            break;
          case 'uploading':
          default:
            break;
        }
        onChange?.(info);
      },
      customRequest: async (options) => {
        await uploader?.(options as UploaderProps);
        setTimeout(() => setFileList([]), 1000);
      },
      ...rest,
    }),
    [onChange, rest, successMessage, uploader],
  );

  return (
    <UploadContainer>
      <Dragger
        {...baseUploadProps}
        beforeUpload={(file) => {
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
