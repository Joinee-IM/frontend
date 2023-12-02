import { eachHourOfInterval, format, getHours, parse, setDay, startOfToday } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { isEqual, range } from 'lodash';

import type { schemas } from '@/services/type';
import type { z } from 'zod';

export type Time = z.infer<(typeof schemas)['BusinessHour']>;

/**
 *
 * @param number number of week, e.g. monday -> 1
 * @param [replacement='週'] used to replace '星期' in returned string, default is '週'
 * @returns
 * @example
 * getWeekday(1) // return "週一"
 * getWeekday(2, '') // return "二"
 * getWeekday(3, '本週') // return "本週三"
 */
export const getWeekday = (number: number, replacement = '週') =>
  format(setDay(new Date(), number), 'EEEE', { locale: zhTW }).replace('星期', replacement);

const SEPARATOR = '-';
const hourIn = (interval: string, target: number) => {
  const timeRange = interval.split(SEPARATOR);
  const start = parse(timeRange[0], 'HH:mm', new Date());
  const end = parse(timeRange[1], 'HH:mm', new Date());
  return eachHourOfInterval({ start, end }).map(getHours).includes(target);
};

function processBusinessHourStartEnd(time: Time) {
  const start = format(parse(time.start_time, 'HH:mm:ss', new Date()), 'HH:mm');
  const end = format(parse(time.end_time, 'HH:mm:ss', new Date()), 'HH:mm');
  return `${start}${SEPARATOR}${end}`;
}

export class BusinessHours {
  times?: Time[];
  timeMap: Record<number, string[]>;
  constructor(times?: Time[]) {
    this.times = times;
    this.timeMap =
      this.times?.reduce<Record<Time['weekday'], string[]>>((acc, curr) => {
        acc[curr.weekday] = acc[curr.weekday]
          ? [...acc[curr.weekday], processBusinessHourStartEnd(curr)]
          : [processBusinessHourStartEnd(curr)];
        return acc;
      }, {}) ?? {};
  }
  get latestAvailableTime() {
    return this.findLatestAvailableTime();
  }
  get largestAvailableTimeRange() {
    return this.findLargestAvailableTimeRange();
  }
  private findLatestAvailableTime() {
    if (!this.times?.length) return '';
    const times = Object.values(this.timeMap);
    const weekdays = Object.keys(this.timeMap).map(Number);

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
  }
  private findLargestAvailableTimeRange() {
    if (!this.times?.length) return undefined;
    const times = Object.values(this.timeMap);
    const [min, max] = times.reduce<[number, number]>(
      (acc, curr) => {
        const hours = curr
          .map((interval) => {
            const timeRange = interval.split(SEPARATOR);
            const start = getHours(parse(timeRange[0], 'HH:mm', new Date()));
            const end = getHours(parse(timeRange[1], 'HH:mm', new Date()));
            return [start, end];
          })
          .flat();
        if (Math.min(...hours) < acc[0]) acc[0] = Math.min(...hours);
        if (Math.max(...hours) > acc[1]) acc[1] = Math.max(...hours);
        return acc;
      },
      [24, 0],
    );
    return range(min, max + 1);
  }
}

// export const findLatestTime = (businessTimes?: Time[]) => {
//   if (!businessTimes?.length) return undefined;
//   const timeMap = businessTimes.reduce<Record<Time['weekday'], string[]>>((acc, curr) => {
//     acc[curr.weekday] = acc[curr.weekday]
//       ? [...acc[curr.weekday], processBusinessHourStartEnd(curr)]
//       : [processBusinessHourStartEnd(curr)];
//     return acc;
//   }, {});

//   const times = Object.values(timeMap);
//   const weekdays = Object.keys(timeMap).map(Number);

//   const 每一天的時間都一樣 = times.every((time, _, array) => isEqual(time, array[0]));
//   const 是連續天數 = weekdays.every((weekday, index, weekdays) =>
//     index === 0 ? true : weekday === weekdays[index - 1] + 1,
//   );

//   if (每一天的時間都一樣 && 是連續天數) {
//     const startDay = getWeekday(weekdays[0]);
//     const EndDay = getWeekday(weekdays[weekdays.length - 1]);
//     return `${startDay}至${EndDay} ${times[0].join(' ')}`;
//   } else {
//     const today = startOfToday().getDay();
//     const nowHour = getHours(new Date());
//     const result = weekdays.reduce<string[]>((acc, curr, index) => {
//       if (curr >= today) {
//         // 比今天還後面的星期
//         if (curr === today) {
//           // 和今天同一星期的需比較時間
//           if (times[index].findIndex((time) => hourIn(time, nowHour)) >= 0) {
//             // 有比「現在時間」更後面的時段
//             acc = [
//               ...acc,
//               `${getWeekday(curr)} ${times[index]
//                 .slice(times[index].findIndex((time) => hourIn(time, nowHour)))
//                 .join(' ')}`,
//             ];
//           }
//         } else acc = [...acc, `${getWeekday(curr)} ${times[index].join(' ')}`];
//       }
//       return acc;
//     }, []);
//     return result.join(' 🏀 ');
//   }
// };
