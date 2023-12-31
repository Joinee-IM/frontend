import { Form, Input } from 'antd';
import Link from 'antd/es/typography/Link';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import type { Role } from '@/modules/auth/pages/signup/Role';
import type { Rule } from 'antd/es/form';

import Google from '@/assets/google.png';
import { RippleButton } from '@/components';
import AuthButton from '@/components/Button/AuthButton';
import Divider from '@/components/Divider';
import useError from '@/hooks/useError';
import Card from '@/modules/auth/components/Card';
import { useAddAccount, useGoogleLogin } from '@/modules/auth/service';
import test from '@/test';

interface FieldType {
  email?: string;
  password?: string;
  confirm?: string;
}

const ButtonGroup = styled(Link)`
  display: flex;
  width: 100%;
  gap: 8px;
`;

export default function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, error, isLoading } = useAddAccount();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as Role;
  const { googleLogin } = useGoogleLogin(role ?? '');

  const { context } = useError(error);

  const handleButtonPress = (values: FieldType) => {
    const { email, password } = values;
    if (email && password && (role === 'NORMAL' || role === 'PROVIDER'))
      mutate(
        { email, password, role },
        {
          onSuccess: () => navigate('/auth/signup/send-mail', { state: { email } }),
        },
      );
  };

  const rules: Record<keyof FieldType, Rule[]> = {
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
    <>
      {context}
      <Card>
        <Form
          form={form}
          onFinish={handleButtonPress}
          size={'middle'}
          style={{ width: '100%' }}
          initialValues={test.signup}
        >
          <Form.Item name="email" rules={rules.email}>
            <Input placeholder="電子郵件" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password" rules={rules.password}>
            <Input.Password placeholder="密碼" autoComplete="off" />
          </Form.Item>
          <Form.Item name="confirm" rules={rules.confirm}>
            <Input.Password placeholder="再次輸入密碼" autoComplete="off" />
          </Form.Item>
          <ButtonGroup>
            <Form.Item style={{ width: '50%' }}>
              <RippleButton
                borderBox={true}
                category="outlined"
                palette="main"
                onClick={() => navigate(-1)}
                style={{ width: '100%' }}
              >
                返回
              </RippleButton>
            </Form.Item>
            <Form.Item style={{ width: '50%' }}>
              <RippleButton
                borderBox={true}
                category="solid"
                palette="main"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isLoading}
              >
                下一步
              </RippleButton>
            </Form.Item>
          </ButtonGroup>
        </Form>
        <Divider text="或是" />
        <AuthButton image={Google} onClick={() => googleLogin()}>
          以 Google 帳號登入
        </AuthButton>
      </Card>
    </>
  );
}
