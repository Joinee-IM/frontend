import { Modal } from 'antd';
import { useMemo } from 'react';

import type { DateTimePickerProps } from '@/components/DateTimePicker';
import type { ModalProps } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

import { ButtonWrapper, RippleButton } from '@/components/Button';
import DateTimePicker from '@/components/DateTimePicker';

interface DateTimePickerModalProps extends ModalProps {
  dateTimePickerProps: DateTimePickerProps;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleCancel: () => void;
  handleOk: () => void;
  isLoading?: boolean;
}

export default function DateTimePickerModal({
  dateTimePickerProps,
  open,
  setOpen,
  handleCancel,
  handleOk,
  footer,
  isLoading,
}: DateTimePickerModalProps) {
  const Footer = useMemo(
    () => (
      <ButtonWrapper>
        <RippleButton category="outlined" palette="gray" onClick={handleCancel}>
          清除
        </RippleButton>
        <RippleButton loading={isLoading} category="solid" palette="main" onClick={handleOk}>
          篩選時間
        </RippleButton>
      </ButtonWrapper>
    ),
    [handleCancel, handleOk, isLoading],
  );

  return (
    <Modal
      centered
      open={open}
      footer={footer ?? Footer}
      onCancel={() => setOpen(false)}
      width={'fit-content'}
      closable={false}
    >
      <DateTimePicker {...dateTimePickerProps} />
    </Modal>
  );
}
