import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import type { Time } from '@/utils/function/time';
import type { Type } from '@/utils/type';

import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import useAllowChildren from '@/hooks/useAllowChildren';
import { useAlbum } from '@/services/useInfo';
import { BusinessHours } from '@/utils/function/time';

interface ListItemProps extends Type<typeof InfoWrapper> {
  title: string;
  address: string;
  times?: Time[];
  tags?: string[] | null;
  stadium_id: number;
  markerFocus: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const ListItemWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['animated'].includes(prop),
})<{ animated: boolean }>`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  column-gap: 10px;
  cursor: pointer;
  border: 8px solid transparent;
  &:hover {
    background-color: ${({ theme }) => theme.gray[300]};
  }
  ${({ animated, theme }) =>
    animated &&
    css`
      background-color: ${theme.gray[100]};
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

export default function ListItem({
  title,
  address,
  times,
  tags,
  stadium_id,
  markerFocus,
  handleMouseEnter,
  handleMouseLeave,
  ...rest
}: ListItemProps) {
  const { data } = useAlbum(stadium_id, 'STADIUM');
  const element = useRef<HTMLDivElement>(null);
  const scrollIntoViewRef = useRef<HTMLDivElement>(null);

  const allowChildNum = useAllowChildren(element);

  useEffect(() => {
    const { current } = scrollIntoViewRef;
    if (markerFocus && current) {
      current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }, [markerFocus]);

  const businessHour = new BusinessHours(times).latestAvailableTime;

  return (
    <ListItemWrapper
      ref={scrollIntoViewRef}
      {...rest}
      animated={markerFocus}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <DemoImage src={data?.data?.[0]?.url ?? ''} style={{ height: '100px' }} />
      <InfoWrapper>
        <Title>{title}</Title>
        <StadiumInfo>
          {address} ·{' '}
          {Object.entries(businessHour)
            .map(([week, time]) => `${week} ${time}`)
            .join(' 🏀 ')}
        </StadiumInfo>
        <RoundTagWrapper ref={element}>
          {tags
            ?.slice(0, allowChildNum)
            .map((tag, index) => (
              <RoundTag key={index}>
                {allowChildNum && index === allowChildNum - 1
                  ? `${tags.length - allowChildNum + 1}+`
                  : tag}
              </RoundTag>
            ))}
        </RoundTagWrapper>
      </InfoWrapper>
    </ListItemWrapper>
  );
}
