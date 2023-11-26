import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { Rule } from 'antd/es/form';

import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { useForgetPassword } from '@/modules/auth/service';

export { default as SendMail } from './SendMail';

interface FieldType {
  email?: string;
  password?: string;
}
const layout = {
  wrapperCol: { span: 32 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};
const Text = styled.div`
  font-size: 28px;
  margin-bottom: 40px;
`;

export default function ForgetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate } = useForgetPassword();

  const handleButtonPress = (values: FieldType) => {
    const { email } = values;
    if (email)
      mutate(
        { email },
        { onSuccess: () => navigate('/auth/forget-password/send-mail', { state: { email } }) },
      );
  };
  const rules: Record<string, Rule[]> = {
    email: [{ required: true, message: '' }],
    password: [{ required: true, message: '' }],
    confirm: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('密碼不相符'));
        },
      }),
    ],
  };

  return (
    <Card hasTitle={false} style={{ paddingTop: '50px' }}>
      <Text>忘記密碼</Text>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={handleButtonPress}
        size={'middle'}
        style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Form.Item name="email" rules={rules.email}>
          <Input placeholder="請輸入註冊之電子郵件" autoComplete="off" />
        </Form.Item>
        <Form.Item {...tailLayout}>
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
  );
}
