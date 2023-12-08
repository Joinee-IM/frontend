import { format, setHours } from 'date-fns';
import { range } from 'lodash';
import { Fragment, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import styled from 'styled-components';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import 'react-day-picker/dist/style.css';

import { MOBILE_WITH } from '@/constants/rwd';
import theme from '@/provider/theme/theme';
import { flexCenter, percentageOfFigma } from '@/utils/css';

interface DateTimePickerProps {
  date: Date[] | undefined;
  setDate: Dispatch<SetStateAction<Date[] | undefined>>;
  focus: Date | undefined;
  setFocus: Dispatch<SetStateAction<Date | undefined>>;
  times: Record<string, string[]>;
  setTimes: Dispatch<SetStateAction<Record<string, string[]>>>;
}

export function useDateTimePicker() {
  const [date, setDate] = useState<Date[]>();
  const [focus, setFocus] = useState<Date>();
  const [times, setTimes] = useState<Record<string, string[]>>({});

  const clear = () => {
    setDate(undefined);
    setFocus(undefined);
    setTimes({});
  };

  return { date, setDate, focus, setFocus, times, setTimes, clear };
}

const DateTimePickerWrapper = styled.div`
  column-gap: ${percentageOfFigma(30).vw};
  flex-wrap: wrap;
  max-height: 60vh;
  overflow: scroll;
  display: flex;
  align-items: center;
`;

const TimeWrapper = styled.div`
  flex: 1;
  margin: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${percentageOfFigma(14).max} ${percentageOfFigma(20).max};
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  &:checked + label {
    background-color: ${({ theme }) => theme.sub[300]};
    color: ${({ theme }) => theme.white};
  }
`;

const TagTag = styled.label.withConfig({
  shouldForwardProp: (prop) => !['selected'].includes(prop),
})<{ selected?: boolean }>`
  cursor: pointer;
  font-size: ${percentageOfFigma(16).max};
  padding: 0.375em 0.75em;
  @media (max-width: ${MOBILE_WITH}px) {
    font-size: min(12px, ${percentageOfFigma(16).max});
  }
  border-radius: 0.5em;
  width: fit-content;
  height: fit-content;
  white-space: nowrap;
  ${flexCenter};
  border: 2px solid transparent;
  &:hover {
    border-color: ${({ theme }) => theme.sub[300]};
  }
  background-color: ${({ selected, theme }) => (selected ? theme.sub[100] : 'transparent')};
  font-family: Roboto;
`;

export default function DateTimePicker({
  date,
  setDate,
  times,
  setTimes,
  focus,
  setFocus,
}: DateTimePickerProps) {
  const timeslots = range(24).map(
    (time) =>
      format(setHours(new Date('2023-12-21'), time), 'HH:mm') +
      '-' +
      format(setHours(new Date('2023-12-21'), time + 1), 'HH:mm'),
  );

  const handleTimeslotClick = (time: string) => (event: ChangeEvent<HTMLInputElement>) => {
    if (focus) {
      const date = format(focus, 'yyyy/MM/dd');
      if (event.target.checked) {
        if (!times[date]?.length) setDate((prev) => [...(prev ?? []), focus]);
        setTimes((prev) => ({
          ...prev,
          [date]: [...(prev[date] ?? []), time],
        }));
      } else {
        if (times[date].length === 1)
          setDate((prev) => prev?.filter((d) => format(d, 'yyyy/MM/dd') !== date));
        setTimes((prev) => ({
          ...prev,
          [date]: prev[date].filter((t) => t !== time),
        }));
      }
    }
  };

  return (
    <DateTimePickerWrapper>
      <DayPicker
        mode="multiple"
        selected={date}
        onDayClick={setFocus}
        modifiers={{ focus: focus ? [focus] : [] }}
        modifiersStyles={{
          focus: {
            backgroundColor: theme.sub[300],
            color: theme.white,
          },
          selected: {
            backgroundColor: 'transparent',
            color: 'black',
            border: `2px solid ${theme.sub[300]}`,
          },
        }}
      />
      <TimeWrapper style={{ visibility: focus ? 'visible' : 'hidden' }}>
        {timeslots.map((timeRange, index) => (
          <Fragment key={index}>
            <Checkbox
              id={timeRange}
              checked={Boolean(focus && times[format(focus, 'yyyy/MM/dd')]?.includes(timeRange))}
              onChange={handleTimeslotClick(timeRange)}
            />
            <TagTag htmlFor={timeRange}>{timeRange}</TagTag>
          </Fragment>
        ))}
      </TimeWrapper>
    </DateTimePickerWrapper>
  );
}
