import { EditFilled } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { RippleButton } from '@/components/Button';
import GridForm from '@/components/GridForm';
import Section from '@/modules/main/pages/UserInfo/components/Section';

interface InfoProps {
  email: string;
  nickname: string;
  gender: string;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
`;

export default function BaseInfoSection() {
  const [form] = Form.useForm<InfoProps>();
  const [isEdit, setIsEdit] = useState(false);

  const BaseInfoAction = useMemo(() => {
    return function BaseInfoAction() {
      const handleInfoChange = () => {
        const info = form.getFieldsValue();
        alert(`${info.email}, ${info.gender}, ${info.nickname}`);
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
            onClick={handleInfoChange}
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
          編輯
        </RippleButton>
      );
    };
  }, [form, isEdit]);

  const baseInfo = useMemo(() => {
    return {
      電子郵件: isEdit ? (
        <Form.Item name="email" initialValue="b09705017@ntu.im">
          <Input />
        </Form.Item>
      ) : (
        'b09705017@ntu.im'
      ),
      暱稱: isEdit ? (
        <Form.Item name="nickname" initialValue="yclai">
          <Input />
        </Form.Item>
      ) : (
        'yclai'
      ),
      性別: isEdit ? (
        <Form.Item name="gender" initialValue="女">
          <Input />
        </Form.Item>
      ) : (
        '女'
      ),
    };
  }, [isEdit]);

  return (
    <Section title="基本資料" TitleAction={BaseInfoAction}>
      <GridForm form={form} data={baseInfo} />
    </Section>
  );
}
