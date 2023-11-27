import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Google from '@/assets/google.png';
import { RippleButton } from '@/components';
import AuthButton from '@/components/Button/AuthButton';
import Divider from '@/components/Divider';
import useError from '@/hooks/useError';
import Card from '@/modules/auth/components/Card';
import { useGoogleLogin, useLogin } from '@/modules/auth/service';

interface FieldType {
  email?: string;
  password?: string;
}

const ForgotPasswordWrapper = styled.div`
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: end;
`;

const TESTVALUE = {
  email: 'b09705017@ntu.edu.tw',
  password: 'string',
};

export default function Login() {
  const [form] = Form.useForm();
  const { mutate: login, error } = useLogin();
  const { googleLogin } = useGoogleLogin();

  const navigate = useNavigate();

  const { context } = useError(error, undefined, () => {
    if (error?.message === 'LoginFailed')
      form.setFields([
        {
          name: 'email',
          errors: [''],
        },
        {
          name: 'password',
          errors: [''],
        },
      ]);
  });

  const handleButtonPress = (values: FieldType) => {
    const { email, password } = values;
    if (email && password)
      login(
        { email, password },
        {
          onSuccess() {
            navigate('/');
          },
        },
      );
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
          initialValues={TESTVALUE}
        >
          <Form.Item name="email" rules={[{ required: true, message: '' }]}>
            <Input prefix={<UserOutlined />} placeholder="電子郵件" autoComplete="off" />
          </Form.Item>
          <Form.Item
            extra={
              <ForgotPasswordWrapper>
                <RippleButton
                  type="link"
                  palette="main"
                  style={{ fontSize: '12px', fontWeight: 400, alignSelf: 'flex-end' }}
                  onClick={() => navigate('/auth/forget-password')}
                >
                  忘記密碼？
                </RippleButton>
              </ForgotPasswordWrapper>
            }
            name="password"
            rules={[{ required: true, message: '' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密碼" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <RippleButton type="solid" palette="main" htmlType="submit" style={{ width: '100%' }}>
              登入
            </RippleButton>
          </Form.Item>
        </Form>
        <Divider text="或是" />
        <AuthButton image={Google} onClick={() => googleLogin()}>
          以 Google 帳號登入
        </AuthButton>
        <RippleButton
          type="link"
          palette="main"
          onClick={() => navigate('/auth/signup/choose-role')}
          style={{ fontSize: '14px', fontWeight: 400, marginTop: '50px' }}
        >
          還沒有帳號嗎？點我註冊
        </RippleButton>
      </Card>
    </>
  );
}
