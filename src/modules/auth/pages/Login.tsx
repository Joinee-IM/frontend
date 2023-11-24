import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
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

const layout = {
  wrapperCol: { span: 32 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const ForgotPasswordWrapper = styled.div`
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: end;
`;

const TEST_DATA = {
  email: 'b09705017@ntu.im',
  password: 'string',
};

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
        initialValues={TEST_DATA}
      >
        <Form.Item name="email" rules={[{ required: true, message: '' }]}>
          <Input prefix={<UserOutlined />} placeholder="電子郵件" autoComplete="off" />
        </Form.Item>
        <Form.Item
          extra={
            <ForgotPasswordWrapper>
              <RippleButton
                category="link"
                palette="main"
                style={{ fontSize: '12px', fontWeight: 400, alignSelf: 'flex-end' }}
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
        <Form.Item {...tailLayout}>
          <RippleButton
            category="solid"
            palette="main"
            htmlType="submit"
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            登入
          </RippleButton>
        </Form.Item>
      </Form>
      <Divider text="或是" />
      <AuthButton image={Google}>以 Google 帳號登入</AuthButton>
      <RippleButton
        category="link"
        palette="main"
        onClick={() => navigate('/auth/signup/choose-role')}
        style={{ fontSize: '14px', fontWeight: 400, marginTop: '50px' }}
      >
        還沒有帳號嗎？點我註冊
      </RippleButton>
    </Card>
  );
}
