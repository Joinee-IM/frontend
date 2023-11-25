import styled from 'styled-components';

import Stadium from '@/assets/stadium.jpeg';
import { flexCenter } from '@/utils/css';

const ListItemWrapper = styled.div`
  width: 100%;
  padding: 8px 0px 8px 8px;
  display: flex;
  column-gap: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.gray[300]};
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const DemoImage = styled.img`
  height: 100px;
  aspect-ratio: 1;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const StadiumInfo = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.gray[700]};
`;

const TagWrapper = styled.div`
  display: flex;
  column-gap: 4px;
`;

const Tag = styled.div`
  ${flexCenter}
  height: 30px;
  padding: 0 12px;
  border-radius: 16px;
  background: #cbc09f;
  color: white;
`;

export default function ListItem() {
  return (
    <ListItemWrapper>
      <DemoImage src={Stadium} style={{ height: '100px' }} />
      <InfoWrapper>
        <Title>臺大體育館</Title>
        <StadiumInfo>臺北市大安區 · 週一至週日 08:00-18:00</StadiumInfo>
        <TagWrapper>
          <Tag>羽球</Tag>
          <Tag>桌球</Tag>
        </TagWrapper>
      </InfoWrapper>
    </ListItemWrapper>
  );
}
