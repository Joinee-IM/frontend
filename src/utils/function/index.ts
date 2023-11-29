import { eachHourOfInterval, format, getHours, parse, setDay, startOfToday } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { isEqual } from 'lodash';
import { z } from 'zod';

import { schemas } from '@/services/type';

export type Time = z.infer<(typeof schemas)['BusinessHour']>;

const getWeekday = (number: number) =>
  format(setDay(new Date(), number), 'EEEE', { locale: zhTW }).replace('星期', '週');

const hourIn = (interval: string, target: number) => {
  const timeRange = interval.split('-');
  const start = parse(timeRange[0], 'HH:mm', new Date());
  const end = parse(timeRange[1], 'HH:mm', new Date());
  return eachHourOfInterval({ start, end }).map(getHours).includes(target);
};

function processBusinessHourStartEnd(time: Time) {
  const start = format(parse(time.start_time, 'HH:mm:ss', new Date()), 'HH:mm');
  const end = format(parse(time.end_time, 'HH:mm:ss', new Date()), 'HH:mm');
  return `${start}-${end}`;
}

export const findLatestTime = (businessTimes?: Time[]) => {
  if (!businessTimes?.length) return undefined;
  const timeMap = businessTimes.reduce<Record<Time['weekday'], string[]>>((acc, curr) => {
    acc[curr.weekday] = acc[curr.weekday]
      ? [...acc[curr.weekday], processBusinessHourStartEnd(curr)]
      : [processBusinessHourStartEnd(curr)];
    return acc;
  }, {});

  const times = Object.values(timeMap);
  const weekdays = Object.keys(timeMap).map(Number);

  const 每一天的時間都一樣 = times.every((time, _, array) => isEqual(time, array[0]));
  const 是連續天數 = weekdays.every((weekday, index, weekdays) =>
    index === 0 ? true : weekday === weekdays[index - 1] + 1,
  );

  if (每一天的時間都一樣 && 是連續天數) {
    const startDay = getWeekday(weekdays[0]);
    const EndDay = getWeekday(weekdays[weekdays.length - 1]);
    return `${startDay}至${EndDay} ${times[0].join(' ')}`;
  } else {
    const today = startOfToday().getDay();
    const nowHour = getHours(new Date());
    const result = weekdays.reduce<string[]>((acc, curr, index) => {
      if (curr >= today) {
        // 比今天還後面的星期
        if (curr === today) {
          // 和今天同一星期的需比較時間
          if (times[index].findIndex((time) => hourIn(time, nowHour)) >= 0) {
            // 有比「現在時間」更後面的時段
            acc = [
              ...acc,
              `${getWeekday(curr)} ${times[index]
                .slice(times[index].findIndex((time) => hourIn(time, nowHour)))
                .join(' ')}`,
            ];
          }
        } else acc = [...acc, `${getWeekday(curr)} ${times[index].join(' ')}`];
      }
      return acc;
    }, []);
    return result.join(' 🏀 ');
  }
};
