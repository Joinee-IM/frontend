import { SearchOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  padding: 10px 20px;
  height: fit-content;
  width: fit-content;
  font-size: 20px;
  border-radius: 20px;
  font-weight: bold;
  background-color: #6600ff;
  &:hover {
    background-color: green !important;
  }
  &:active {
    background-color: red !important;
  }
`;

export default function ButtonGroup() {
  return (
    <Space direction="vertical">
      {/* <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#6600ff',
            colorPrimaryActive: 'red',
            colorPrimaryBorder: 'transparent',
          },
        }}
      > */}
      <StyledButton type="primary" icon={<SearchOutlined />}>
        Search
      </StyledButton>
      {/* </ConfigProvider> */}
    </Space>
  );
}
