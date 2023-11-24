import { EditFilled } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { RippleButton } from '@/components';
import GridForm from '@/components/GridForm';
import Section from '@/modules/main/pages/UserInfo/components/Section';

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
  const [isEdit, setIsEdit] = useState(false);

  const SecurityInfoAction = useMemo(() => {
    return function SecurityInfoAction() {
      const handleEditPassword = () => {
        const info = form.getFieldsValue();
        alert(`${info.original_password}, ${info.new_password}, ${info.confirm_password}`);
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
  }, [form, isEdit]);

  const securityInfo = useMemo(() => {
    return isEdit
      ? {
          原密碼: (
            <Form.Item name="original_password">
              <Input />
            </Form.Item>
          ),
          新密碼: (
            <Form.Item name="new_password">
              <Input />
            </Form.Item>
          ),
          再次輸入新密碼: (
            <Form.Item name="confirm_password">
              <Input />
            </Form.Item>
          ),
        }
      : {
          密碼: '**********',
        };
  }, [isEdit]);

  return (
    <Section title="安全性" TitleAction={SecurityInfoAction}>
      <GridForm form={form} data={securityInfo} />
    </Section>
  );
}
