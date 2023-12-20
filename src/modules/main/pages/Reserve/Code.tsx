/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLoading } from '@/components/Loading/PageLoading';
import { useReadReservationByCode } from '@/modules/main/pages/Reserve/services';

export default function CodeJoin() {
  const { code } = useParams<{ code: string }>();
  const { data, isError } = useReadReservationByCode(code);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.id) navigate(`/reservation/info/${data?.data?.id}`);
  }, [data?.data?.id, navigate]);

  useEffect(() => {
    if (data?.error) {
      throw new Response('Not Found', {
        status: 404,
      });
    }
    if (isError)
      throw new Response('Not Found', {
        status: 404,
      });
  }, [data?.error, isError]);

  const { context } = useLoading([true]);
  return <>{context}</>;
}
