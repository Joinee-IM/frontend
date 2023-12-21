import type { FeeType } from '@/utils/function/map';

export default function calculateTotalCost(feeType?: FeeType) {
  return (hour: number, toll: number, rate: number) => {
    switch (feeType) {
      case 'PER_HOUR':
        return rate * hour;
      case 'PER_PERSON':
        return rate * toll;
      case 'PER_PERSON_PER_HOUR':
        return rate * toll * hour;
      case undefined:
      case 'PER_RESERVATION':
      case null:
        return '';
      default:
        feeType satisfies never;
        return '';
    }
  };
}
