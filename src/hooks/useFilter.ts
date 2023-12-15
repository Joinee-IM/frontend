import { useState } from 'react';

import type { schemas } from '@/services/type';
import type { z } from 'zod';

export default function useFilter() {
  const [city, setCity] = useState<number | undefined>(undefined);
  const [district, setDistrict] = useState<number | undefined>(undefined);
  const [sport, setSport] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [timeRanges, setTimeRanges] = useState<z.infer<(typeof schemas)['WeekTimeRange']>[]>([]);
  const [dateTimeRange, setDateTimeRange] = useState<z.infer<(typeof schemas)['DateTimeRange']>[]>(
    [],
  );
  const [isReservable, setIsReservable] = useState<boolean | undefined>(undefined);

  const clear = () => {
    setCity(undefined);
    setDistrict(undefined);
    setSport(undefined);
    setName(undefined);
    setTimeRanges([]);
    setDateTimeRange([]);
    setIsReservable(undefined);
  };

  return {
    city,
    setCity,
    district,
    setDistrict,
    sport,
    setSport,
    name,
    setName,
    timeRanges,
    setTimeRanges,
    dateTimeRange,
    setDateTimeRange,
    isReservable,
    setIsReservable,
    clear,
  };
}
