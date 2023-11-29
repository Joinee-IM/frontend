import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import type { Time } from '@/utils/function';
import type { Type } from '@/utils/type';

import useAllowChildren from '@/hooks/useAllowChildren';
import { useAlbum } from '@/services/useAlbum';
import { flexCenter } from '@/utils/css';
import { findLatestTime } from '@/utils/function';

interface ListItemProps extends Type<typeof InfoWrapper> {
  title: string;
  address: string;
  times?: Time[];
  tags?: string[] | null;
  stadium_id: number;
}

const ListItemWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['degree', 'hover'].includes(prop),
})<{ degree: number; hover: boolean }>`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  column-gap: 10px;
  cursor: pointer;
  /* &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.gray[300]};
  } */
  border: 8px solid transparent;
  ${({ hover, degree, theme }) =>
    hover &&
    css`
      border-image: conic-gradient(
          from ${degree}deg,
          rgba(255, 225, 238, 0.1),
          ${theme.main[300]} 0.1turn,
          ${theme.main[300]} 0.15turn,
          rgba(255, 225, 238, 0.1) 0.25turn
        )
        10;
    `}
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: calc(100% - 110px);
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.gray[700]};
`;

const TagWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  overflow: hidden;
`;

const Tag = styled.div`
  ${flexCenter}
  height: 30px;
  padding: 0 12px;
  border-radius: 16px;
  background: #cbc09f;
  color: white;
  flex-shrink: 0;
`;

export default function ListItem({
  title,
  address,
  times,
  tags,
  stadium_id,
  ...rest
}: ListItemProps) {
  const { data } = useAlbum(stadium_id, 'STADIUM');
  const [hover, setHover] = useState(false);
  const [degree, setDegree] = useState(0);
  const element = useRef<HTMLDivElement>(null);

  const allowChildNum = useAllowChildren(element);

  useEffect(() => {
    if (hover) {
      //Implementing the setInterval method
      const interval = setInterval(() => {
        setDegree((prev) => {
          if (prev === 360) return 0;
          else return prev + 14.4;
        });
      }, 50);

      //Clearing the interval
      return () => clearInterval(interval);
    } else setDegree(0);
  }, [hover]);

  return (
    <ListItemWrapper
      {...rest}
      degree={degree}
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <DemoImage src={data?.data?.urls?.[0]} style={{ height: '100px' }} />
      <InfoWrapper>
        <Title>{title}</Title>
        <StadiumInfo>
          {address} · {findLatestTime(times)}
        </StadiumInfo>
        <TagWrapper ref={element}>
          {tags
            ?.slice(0, allowChildNum)
            .map((tag, index) => (
              <Tag key={index}>
                {allowChildNum && index === allowChildNum - 1
                  ? `${tags.length - allowChildNum + 1}+`
                  : tag}
              </Tag>
            ))}
        </TagWrapper>
      </InfoWrapper>
    </ListItemWrapper>
  );
}
