import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { Rule } from 'antd/es/form';

import { RippleButton } from '@/components';
import useError from '@/hooks/useError';
import Card from '@/modules/auth/components/Card';
import { useForgetPassword } from '@/modules/auth/service';

export { default as SendMail } from './SendMail';

interface FieldType {
  email?: string;
}

const Text = styled.div`
  font-size: 28px;
  margin-bottom: 40px;
`;

export default function ForgetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, error } = useForgetPassword();

  const { context } = useError(error);

  const handleButtonPress = (values: FieldType) => {
    const { email } = values;
    if (email)
      mutate(
        { email },
        { onSuccess: () => navigate('/auth/forget-password/send-mail', { state: { email } }) },
      );
  };

  const rules: Record<keyof FieldType, Rule[]> = {
    email: [{ required: true, message: '' }],
  };

  return (
    <>
      {context}
      <Card hasTitle={false} style={{ paddingTop: '50px' }}>
        <Text>忘記密碼</Text>
        <Form
          form={form}
          onFinish={handleButtonPress}
          size={'middle'}
          style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
        >
          <Form.Item name="email" rules={rules.email}>
            <Input placeholder="請輸入註冊之電子郵件" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <RippleButton
              type="solid"
              palette="main"
              htmlType="submit"
              style={{ padding: '0 10px', marginTop: '10px' }}
            >
              傳送驗證信
            </RippleButton>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
