import { format } from 'date-fns';
import { useRef } from 'react';
import styled from 'styled-components';

import type { Type } from '@/utils/type';

import { percentageOfFigma, rwdFontSize } from '@/utils/css';
import { getWeekday } from '@/utils/function/time';

interface TimeSlotProps extends Type<typeof Container> {
  cells: boolean[][];
  date: Date[];
  timeRange: number[] | undefined;
  handleUnitMouseDown: (x: number, y: number) => void;
  handleUnitMouseEnter: (x: number, y: number) => void;
}

const GAP = percentageOfFigma(10).max;

const Container = styled.div`
  display: flex;
  column-gap: ${GAP};
  user-select: none;
  cursor: grab;
  padding: 0 0 20px 40px;
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
  shouldForwardProp: (prop) => !['time', 'selected'].includes(prop),
})<{
  time?: string | number;
  selected: boolean;
}>`
  aspect-ratio: 120 / 50;
  background-color: ${({ selected, theme }) => (selected ? theme.main[500] : theme.main[100])};
  position: relative;
  ${rwdFontSize(16)};
  font-weight: 600;

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
  handleUnitMouseDown,
  handleUnitMouseEnter,
  ...rest
}: TimeSlotProps) {
  const element = useRef<HTMLDivElement>(null);

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
