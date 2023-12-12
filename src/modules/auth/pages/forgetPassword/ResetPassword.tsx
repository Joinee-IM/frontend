import { Form, Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import type { Rule } from 'antd/es/form';

import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { useResetPassword } from '@/modules/auth/service';

interface FieldType {
  password?: string;
  confirm?: string;
}

const Text = styled.div`
  font-size: 25px;
  margin-bottom: 25px;
`;

export default function ResetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isLoading } = useResetPassword();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const handleButtonPress = (values: FieldType) => {
    const { password } = values;
    if (password && code) mutate({ code, password }, { onSuccess: () => navigate('/auth/login') });
  };
  const rules: Record<keyof FieldType, Rule[]> = {
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
    <Card hasTitle={false} style={{ paddingTop: '30px' }}>
      <Text>重設密碼</Text>
      <Form<FieldType>
        form={form}
        onFinish={handleButtonPress}
        size={'middle'}
        style={{ width: '100%' }}
      >
        <Form.Item name="password" rules={rules.password}>
          <Input.Password placeholder="新密碼" autoComplete="off" />
        </Form.Item>
        <Form.Item name="confirm" rules={rules.confirm}>
          <Input.Password placeholder="再次輸入密碼" autoComplete="off" />
        </Form.Item>
        <Form.Item style={{ width: '100%' }}>
          <RippleButton
            category="solid"
            palette="main"
            htmlType="submit"
            borderBox={true}
            style={{ width: '100%', marginTop: '20px' }}
            loading={isLoading}
          >
            確認
          </RippleButton>
        </Form.Item>
      </Form>
    </Card>
  );
}
