import { EditFilled } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import type { Rule } from 'antd/es/form';

import { RippleButton } from '@/components';
import GridForm from '@/components/Grid/FormGrid';
import useError from '@/hooks/useError';
import Section from '@/modules/main/pages/UserInfo/components/Section';
import { useEditPassword } from '@/modules/main/pages/UserInfo/services';

interface InfoProps {
  original_password: string;
  new_password: string;
  confirm_password: string;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
`;

export default function SecuritySection() {
  const [form] = Form.useForm<InfoProps>();
  const { account_id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const rules: Record<keyof InfoProps, Rule[]> = {
    original_password: [{ required: true, message: '' }],
    new_password: [{ required: true, message: '' }],
    confirm_password: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('new_password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('密碼不相符'));
        },
      }),
    ],
  };
  const { mutate, error, isLoading } = useEditPassword(Number(account_id));
  const { context } = useError(error, undefined);

  const SecurityInfoAction = useMemo(() => {
    return function SecurityInfoAction() {
      const handleEditPassword = () => {
        const info = form.getFieldsValue();
        mutate(
          { old_password: info.original_password, new_password: info.new_password },
          { onSuccess: () => setIsEdit(false), onSettled: () => form.resetFields() },
        );
      };

      return isEdit ? (
        <ButtonWrapper>
          <RippleButton
            onClick={() => setIsEdit(false)}
            category="outlined"
            palette="gray"
            icon={<EditFilled />}
          >
            取消
          </RippleButton>
          <RippleButton
            onClick={handleEditPassword}
            category="outlined"
            palette="main"
            icon={<EditFilled />}
            loading={isLoading}
          >
            儲存
          </RippleButton>
        </ButtonWrapper>
      ) : (
        <RippleButton
          onClick={() => setIsEdit(true)}
          category="outlined"
          palette="main"
          icon={<EditFilled />}
        >
          重設密碼
        </RippleButton>
      );
    };
  }, [form, isEdit, isLoading, mutate]);

  const securityInfo = useMemo(() => {
    return isEdit
      ? {
          原密碼: (
            <Form.Item name="original_password" rules={rules.original_password}>
              <Input.Password />
            </Form.Item>
          ),
          新密碼: (
            <Form.Item name="new_password" rules={rules.new_password}>
              <Input.Password />
            </Form.Item>
          ),
          再次輸入新密碼: (
            <Form.Item name="confirm_password" rules={rules.confirm_password}>
              <Input.Password />
            </Form.Item>
          ),
        }
      : {
          密碼: '**********',
        };
  }, [isEdit, rules.confirm_password, rules.new_password, rules.original_password]);

  return (
    <>
      {context}
      <Section title="安全性" TitleAction={SecurityInfoAction}>
        <GridForm form={form} data={securityInfo} />
      </Section>
    </>
  );
}
