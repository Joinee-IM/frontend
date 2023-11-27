import { Form, Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { useResetPassword } from '@/modules/auth/service';

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
  font-size: 25px;
  margin-bottom: 25px;
`;

export default function ResetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate } = useResetPassword();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const handleButtonPress = (values: FieldType) => {
    const { password } = values;
    if (password && code) mutate({ code, password }, { onSuccess: () => navigate('/auth/login') });
  };
  // const rules: Record<string, Rule[]> = {
  //   email: [{ required: true, message: '' }],
  //   password: [{ required: true, message: '' }],
  //   confirm: [
  //     {
  //       required: true,
  //       message: 'Please confirm your password!',
  //     },
  //     ({ getFieldValue }) => ({
  //       validator(_, value) {
  //         if (!value || getFieldValue('password') === value) {
  //           return Promise.resolve();
  //         }
  //         return Promise.reject(new Error('密碼不相符'));
  //       },
  //     }),
  //   ],
  // };

  return (
    <Card hasTitle={false} style={{ paddingTop: '30px' }}>
      <Text>重設密碼</Text>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={handleButtonPress}
        size={'middle'}
        style={{ width: '100%' }}
      >
        <Form.Item name="password">
          <Input.Password placeholder="新密碼" autoComplete="off" />
        </Form.Item>
        <Form.Item name="confirm">
          <Input.Password placeholder="再次輸入密碼" autoComplete="off" />
        </Form.Item>
        <Form.Item {...tailLayout} style={{ width: '100%' }}>
          <RippleButton
            type="solid"
            palette="main"
            htmlType="submit"
            style={{ width: '100%', marginTop: '20px' }}
          >
            確認
          </RippleButton>
        </Form.Item>
      </Form>
    </Card>
  );
}
