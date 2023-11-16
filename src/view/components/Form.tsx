import { Form, Input } from 'antd';
import Link from 'antd/es/typography/Link';
import styled from 'styled-components';

import { RippleButton } from '@/components';
import { useLogin } from '@/modules/auth/service';

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

const App = () => {
  const [form] = Form.useForm();
  const { mutate } = useLogin();

  const handleButtonPress = (values: FieldType) => {
    const { email, password } = values;
    if (email && password) mutate({ email, password });
    // alert(`${email}, ${password}`);
  };

  interface FieldType {
    email?: string;
    password?: string;
  }

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleButtonPress} size={'middle'}>
      <Form.Item name="email" rules={[{ required: true, message: '' }]}>
        <Input placeholder="電子郵件" autoComplete="off" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '' }]}>
        <Input.Password placeholder="密碼" autoComplete="off" />
        <ForgotPasswordWrapper>
          <ForgotPassword>忘記密碼？</ForgotPassword>
        </ForgotPasswordWrapper>
      </Form.Item>
      {/* <Form.Item wrapperCol={{ span: 10 }} name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="密碼" autoComplete="off" />
      </Form.Item> */}
      {/* <Form.Item name="gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item> */}
      {/* <Form.Item<FieldType>
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label={<div>Customize Gender</div>}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item> */}
      <Form.Item {...tailLayout}>
        <RippleButton type="primary" htmlType="submit" style={{ width: '100%' }}>
          登入
        </RippleButton>
      </Form.Item>
    </Form>
  );
};

export default App;
