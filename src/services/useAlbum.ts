import { type z } from 'zod';

import type { schemas } from '@/services/type';

import api from '@/services';

type PlaceType = z.infer<(typeof schemas)['PlaceType']>;

export const useAlbum = (place_id: number, place_type: PlaceType) =>
  api.useGet('/album', { queries: { place_id, place_type } });
