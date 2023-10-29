import { SearchOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { hexToRgb } from '@/utils';

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

const TapButton = styled(motion.div)`
  border-radius: 20px;
  background: ${hexToRgb('#D9F2F7', 0.61)};
  padding: 26px 45px;
  font-weight: bolder;
  font-size: 32px;
  line-height: 24px;
  cursor: pointer;
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
      <TapButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        瀏覽場地
      </TapButton>
      <StyledButton type="primary" icon={<SearchOutlined />}>
        Search
      </StyledButton>
      {/* </ConfigProvider> */}
    </Space>
  );
}
