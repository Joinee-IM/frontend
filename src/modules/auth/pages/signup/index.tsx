import { Form, Input } from 'antd';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { Rule } from 'antd/es/form';

import Google from '@/assets/google.png';
import { RippleButton } from '@/components';
import AuthButton from '@/components/Button/AuthButton';
import Divider from '@/components/Divider';
import Card from '@/modules/auth/components/Card';
import { useSignup } from '@/modules/auth/service';

interface FieldType {
  email?: string;
  password?: string;
}

const ButtonGroup = styled(Link)`
  display: flex;
  width: 100%;
  gap: 8px;
`;

const layout = {
  wrapperCol: { span: 32 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

export default function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate } = useSignup();

  const handleButtonPress = (values: FieldType) => {
    const { email, password } = values;
    if (email && password) mutate({ email, password, role: 'NORMAL' });
    // alert(`email: ${email}, password: ${password}`);
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
    <Card>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={handleButtonPress}
        size={'middle'}
        style={{ width: '100%' }}
      >
        <Form.Item name="email" rules={rules.emial}>
          <Input placeholder="電子郵件" autoComplete="off" />
        </Form.Item>
        <Form.Item name="password" rules={rules.password}>
          <Input.Password placeholder="密碼" autoComplete="off" />
        </Form.Item>
        <Form.Item name="confirm" rules={rules.confirm}>
          <Input.Password placeholder="再次輸入密碼" autoComplete="off" />
        </Form.Item>
        <ButtonGroup>
          <Form.Item {...tailLayout} style={{ width: '50%' }}>
            <RippleButton
              type="outlined"
              palette="main"
              onClick={() => navigate(-1)}
              style={{ width: '100%' }}
            >
              返回
            </RippleButton>
          </Form.Item>
          <Form.Item {...tailLayout} style={{ width: '50%' }}>
            <RippleButton type="solid" palette="main" htmlType="submit" style={{ width: '100%' }}>
              下一步
            </RippleButton>
          </Form.Item>
        </ButtonGroup>
      </Form>
      <Divider text="或是" />
      <AuthButton image={Google}>以 Google 帳號登入</AuthButton>
    </Card>
  );
}
