import { format } from 'date-fns';

export const toISOString = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
