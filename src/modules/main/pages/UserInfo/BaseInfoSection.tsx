import { EditFilled } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import type { GenderType } from '@/utils/function/toGender';

import { RippleButton } from '@/components/Button';
import GridForm from '@/components/GridForm';
import Section from '@/modules/main/pages/UserInfo/components/Section';
import { useEditAccount, useUserInfo } from '@/modules/main/pages/UserInfo/services';
import toGender from '@/utils/function/toGender';

interface InfoProps {
  email: string;
  nickname: string;
  gender: GenderType;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
`;

export default function BaseInfoSection(props: InfoProps) {
  const { account_id } = useParams();
  const [form] = Form.useForm<InfoProps>();
  const [isEdit, setIsEdit] = useState(false);
  const { refetch } = useUserInfo(Number(account_id));
  const { mutate } = useEditAccount(Number(account_id));

  const BaseInfoAction = useMemo(() => {
    return function BaseInfoAction() {
      const handleInfoChange = () => {
        const info = form.getFieldsValue();
        mutate(
          { nickname: info.nickname, gender: info.gender },
          {
            onSuccess: async () => {
              await refetch();
              setIsEdit(false);
            },
          },
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
  }, [form, isEdit, mutate, refetch]);

  const baseInfo = useMemo(() => {
    return {
      電子郵件: isEdit ? (
        <Form.Item name="email" initialValue={props.email}>
          <Input disabled={true} />
        </Form.Item>
      ) : (
        props.email
      ),
      暱稱: isEdit ? (
        <Form.Item name="nickname" initialValue={props.nickname}>
          <Input />
        </Form.Item>
      ) : (
        props.nickname
      ),
      性別: isEdit ? (
        <Form.Item name="gender" initialValue={props.gender}>
          <Select
            style={{ width: 120 }}
            options={[
              {
                value: 'MALE',
                label: '男性',
              },
              {
                value: 'FEMALE',
                label: '女性',
              },
              {
                value: 'UNREVEALED',
                label: '不願公開',
              },
            ]}
          />
        </Form.Item>
      ) : (
        toGender(props.gender)
      ),
    };
  }, [isEdit, props.email, props.gender, props.nickname]);

  return (
    <Section title="基本資料" TitleAction={BaseInfoAction}>
      <GridForm form={form} data={baseInfo} />
    </Section>
  );
}
