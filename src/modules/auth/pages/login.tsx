import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Google from '@/assets/google.png';
import { RippleButton } from '@/components';
import AuthButton from '@/components/Button/AuthButton';
import Divider from '@/components/Divider';
import Card from '@/modules/auth/components/Card';
import { useLogin } from '@/modules/auth/service';

interface FieldType {
  email?: string;
  password?: string;
}

const TailText = styled(Link)`
  font-size: 14px;
  font-weight: 400;
  line-height: 26px;
  margin-top: 50px;
`;

const layout = {
  wrapperCol: { span: 32 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const ForgotPasswordWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const ForgotPassword = styled(Link)`
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
`;

export default function Login() {
  const [form] = Form.useForm();
  const { mutate } = useLogin();
  const navigate = useNavigate();

  const handleButtonPress = (values: FieldType) => {
    const { email, password } = values;
    if (email && password) mutate({ email, password });
    // alert(`${email}, ${password}`);
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
        <Form.Item name="email" rules={[{ required: true, message: '' }]}>
          <Input prefix={<UserOutlined />} placeholder="電子郵件" autoComplete="off" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="密碼" autoComplete="off" />
          <ForgotPasswordWrapper>
            <ForgotPassword>忘記密碼？</ForgotPassword>
          </ForgotPasswordWrapper>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <RippleButton htmlType="submit" style={{ width: '100%' }}>
            登入
          </RippleButton>
        </Form.Item>
      </Form>
      <Divider text="或是" />
      <AuthButton image={Google}>以 Google 帳號登入</AuthButton>
      <TailText onClick={() => navigate('/auth/signup/choose-role')}>
        還沒有帳號嗎？點我註冊
      </TailText>
    </Card>
  );
}
