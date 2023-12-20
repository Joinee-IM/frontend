import { format, getHours, parseISO } from 'date-fns';
import { isNumber, range } from 'lodash';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { schemas } from '@/services/type';
import type { Type } from '@/utils/type';
import type { z } from 'zod';

import SeekForPlayerIcon from '@/assets/icons/SeekForPlayer';
import { RippleButton } from '@/components';
import { FullContainerLoading } from '@/components/Loading/RippleLoading';
import PopOver from '@/components/Popover';
import theme from '@/provider/theme/theme';
import { percentageOfFigma, rwdFontSize } from '@/utils/css';
import { getWeekday } from '@/utils/function/time';

interface TimeSlotProps extends Type<typeof Container> {
  cells: (boolean | null)[][];
  date: Date[];
  timeRange: number[] | undefined;
  reservationInfos?: z.infer<(typeof schemas)['Reservation']>[];
  isLoading?: boolean;
  handleUnitMouseDown: (x: number, y: number) => void;
  handleUnitMouseEnter: (x: number, y: number) => void;
  draggable?: boolean;
}

type UnitStatus = 'normal' | 'selected' | 'disabled' | 'unreservable' | number;

const unitBackground = (unitStatus: UnitStatus) => {
  if (isNumber(unitStatus)) {
    return theme.sub[
      Math.min(Math.ceil(unitStatus / 2) * 200 - 100, 700) as unknown as keyof typeof theme.sub
    ];
  } else
    switch (unitStatus) {
      case 'unreservable':
        return theme.dirt;
      case 'disabled':
        return theme.gray[100];
      case 'selected':
        return theme.main[500];
      case 'normal':
        return theme.blue;
      default:
        unitStatus satisfies never;
        return theme.main[100];
    }
};

export const reservationToTimeRange = (
  reservationInfos?: z.infer<(typeof schemas)['Reservation']>[],
) =>
  reservationInfos?.reduce<Record<string, number[]>>((acc, curr) => {
    const date = format(parseISO(curr.start_time), 'yyyy/MM/dd');
    acc[date] = acc[date]
      ? [
          ...acc[date],
          ...range(getHours(parseISO(curr.start_time)), getHours(parseISO(curr.end_time))),
        ]
      : range(getHours(parseISO(curr.start_time)), getHours(parseISO(curr.end_time)));
    return acc;
  }, {}) ?? {};

export const reservationToTimeMap = (
  reservationInfos?: z.infer<(typeof schemas)['Reservation']>[],
) =>
  reservationInfos?.reduce<Record<string, z.infer<(typeof schemas)['Reservation']>>>(
    (acc, curr) => {
      const date = format(parseISO(curr.start_time), 'yyyy/MM/dd');
      const hours = range(getHours(parseISO(curr.start_time)), getHours(parseISO(curr.end_time)));
      for (const hour of hours) {
        acc[`${date} ${hour}`] = curr;
      }
      return acc;
    },
    {},
  ) ?? {};

const GAP = percentageOfFigma(10).max;

const Container = styled.div`
  display: flex;
  column-gap: ${GAP};
  user-select: none;
  cursor: grab;
  position: relative;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${GAP};
  flex: 1;
`;

const Label = styled.div`
  text-align: center;
  ${rwdFontSize(15)};
  font-weight: 600;
`;

const Unit = styled.div.withConfig({
  shouldForwardProp: (prop) => !['time', 'unitStatus'].includes(prop),
})<{
  time?: string | number;
  unitStatus: UnitStatus;
}>`
  aspect-ratio: 120 / 50;
  background-color: ${({ unitStatus }) => unitBackground(unitStatus)};
  position: relative;
  ${rwdFontSize(16)};
  font-weight: 600;
  cursor: ${({ unitStatus }) => (unitStatus === 'disabled' ? 'not-allowed' : 'inherit')};

  &:first-child::before {
    content: '${({ time }) => (time ? Number(time) - 1 : '')}';
    position: absolute;
    right: 105%;
    transform: translateY(-50%);
  }
  &::after {
    content: '${({ time }) => time ?? ''}';
    position: absolute;
    top: calc(100% + ${GAP} / 2);
    right: 105%;
    transform: translateY(-50%);
  }
`;

export default function TimeSlot({
  cells,
  date,
  timeRange,
  reservationInfos,
  isLoading,
  handleUnitMouseDown,
  handleUnitMouseEnter,
  ...rest
}: TimeSlotProps) {
  const reservationsTimeMap = reservationToTimeMap(reservationInfos);
  const navigate = useNavigate();
  const [cookies] = useCookies(['id', 'user-role']);

  return (
    <Container {...rest}>
      {date.length === cells.length &&
        cells.map((dateCells, cIndex) => (
          <Column key={cIndex}>
            <Label>
              {format(date[cIndex], 'MM/dd')}
              <br />
              {getWeekday(Number(format(date[cIndex], 'i')), '')}
            </Label>
            <Column>
              {dateCells.map((selected, uIndex) => {
                const info =
                  reservationsTimeMap[
                    `${format(date[cIndex], 'yyyy/MM/dd')} ${timeRange?.[uIndex]}`
                  ];
                return (
                  <PopOver
                    content={
                      <div style={{ width: '220px' }}>
                        {info?.vacancy > 0
                          ? `該時段已被預約，成員 ${info?.member_count} 人，目前正在徵求球友。`
                          : `該時段已被預約，成員 ${info?.member_count} 人，目前不開放報名加入。`}
                      </div>
                    }
                    key={uIndex}
                    style={{ padding: `${percentageOfFigma(9).max}` }}
                    {...(!info ? { open: false } : {})}
                    footer={
                      info?.vacancy > 0 &&
                      cookies['user-role'] !== 'PROVIDER' && (
                        <RippleButton
                          category="solid"
                          palette="sub"
                          icon={<SeekForPlayerIcon fontSize="1.2em" />}
                          onClick={() => navigate(`/reservation/info/${info.id}`)}
                        >
                          報名加入
                        </RippleButton>
                      )
                    }
                  >
                    <Unit
                      onMouseDown={() => handleUnitMouseDown(cIndex, uIndex)}
                      onMouseEnter={() => handleUnitMouseEnter(cIndex, uIndex)}
                      time={cIndex === 0 ? timeRange?.[uIndex + 1] : ''}
                      unitStatus={
                        info?.vacancy < 0
                          ? 'unreservable'
                          : info?.member_count ??
                            (selected === null ? 'disabled' : selected ? 'selected' : 'normal')
                      }
                    />
                  </PopOver>
                );
              })}
            </Column>
          </Column>
        ))}
      {isLoading && <FullContainerLoading />}
    </Container>
  );
}
