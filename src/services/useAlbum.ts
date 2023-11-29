import { z } from 'zod';

import api from '@/services';
import { schemas } from '@/services/type';

type PlaceType = z.infer<(typeof schemas)['PlaceType']>;

export const useAlbum = (place_id: number, place_type: PlaceType) =>
  api.useGet('/album', { queries: { place_id, place_type } });
