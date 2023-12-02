import { eachDayOfInterval, format, parse } from 'date-fns';
import { useMemo, useRef } from 'react';
import styled from 'styled-components';

import type { Type } from '@/utils/type';

import useAllowChildren from '@/hooks/useAllowChildren';
import useTimeSlotDrag from '@/hooks/useTimeSlotDrag';
import { BusinessHours, getWeekday, type Time } from '@/utils/function/time';

interface TimeSlotProps extends Type<typeof Container> {
  times?: number;
}

const GAP = 6;

const Container = styled.div`
  display: flex;
  column-gap: ${GAP}px;
  user-select: none;
  cursor: grab;
  max-width: 100%;
  padding: 0 0 20px 40px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${GAP}px;
`;

const Label = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const Unit = styled.div.withConfig({
  shouldForwardProp: (prop) => !['time', 'selected'].includes(prop),
})<{
  time?: string | number;
  selected: boolean;
}>`
  width: 70px;
  height: 40px;
  background-color: ${({ selected, theme }) => (selected ? theme.main[500] : theme.main[100])};
  position: relative;

  &:first-child::before {
    content: '${({ time }) => (time ? `${Number(time) - 1}:00` : '')}';
    position: absolute;
    right: 105%;
    transform: translateY(-50%);
  }
  &::after {
    content: '${({ time }) => (time ? `${time}:00` : '')}';
    position: absolute;
    top: calc(100% + ${GAP / 2}px);
    right: 105%;
    transform: translateY(-50%);
  }
`;

const DATA: Time[] = [
  {
    id: 61,
    place_id: 7,
    type: 'STADIUM',
    weekday: 1,
    start_time: '08:00:00',
    end_time: '12:00:00',
  },
  {
    id: 62,
    place_id: 7,
    type: 'STADIUM',
    weekday: 1,
    start_time: '13:00:00',
    end_time: '17:00:00',
  },
  {
    id: 63,
    place_id: 7,
    type: 'STADIUM',
    weekday: 3,
    start_time: '13:00:00',
    end_time: '17:00:00',
  },
  {
    id: 64,
    place_id: 7,
    type: 'STADIUM',
    weekday: 4,
    start_time: '08:00:00',
    end_time: '17:00:00',
  },
  {
    id: 65,
    place_id: 7,
    type: 'STADIUM',
    weekday: 5,
    start_time: '08:00:00',
    end_time: '20:00:00',
  },
];

export default function TimeSlot({ ...rest }: TimeSlotProps) {
  const element = useRef<HTMLDivElement>(null);
  const allowChildNum = useAllowChildren(element);

  const date = useMemo(
    () =>
      eachDayOfInterval({
        start: new Date(),
        end: parse('2023-12-08', 'yyyy-MM-dd', new Date()),
      }).slice(0, allowChildNum ?? undefined),
    [allowChildNum],
  );
  const timeRange = new BusinessHours(DATA).largestAvailableTimeRange;
  const { cells, handleUnitMouseDown, handleUnitMouseEnter } = useTimeSlotDrag(
    date.map(() => timeRange?.slice(1).map(() => false) ?? []),
    'straight',
  );

  return (
    <Container ref={element} {...rest}>
      {date.length === cells.length &&
        cells.map((dateCells, cIndex) => (
          <Column key={cIndex}>
            <Label>
              {format(date[cIndex], 'MM/dd')}
              <br />
              {getWeekday(Number(format(date[cIndex], 'i')), '')}
            </Label>
            <Column>
              {dateCells.map((selected, uIndex) => (
                <Unit
                  onMouseDown={() => handleUnitMouseDown(cIndex, uIndex)}
                  onMouseEnter={() => handleUnitMouseEnter(cIndex, uIndex)}
                  key={uIndex}
                  time={cIndex === 0 ? timeRange?.[uIndex + 1] : ''}
                  selected={selected}
                />
              ))}
            </Column>
          </Column>
        ))}
    </Container>
  );
}
