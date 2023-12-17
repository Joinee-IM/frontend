import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function useRoutes() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(['id', 'user-role']);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const account_id = searchParams.get('account_id') as unknown as number;

  useEffect(() => {
    // for google login
    if (account_id) {
      setCookie('id', account_id, { path: '/' });
      navigate('/');
    }
  }, [account_id, navigate, setCookie]);

  useEffect(() => {
    if (cookie['user-role'] === 'NORMAL' && pathname.startsWith('/manage')) {
      throw new Response('No Permission', {
        status: 403,
      });
    }
    if (
      cookie['user-role'] === 'PROVIDER' &&
      !pathname.startsWith('/manage') &&
      pathname !== '/' &&
      !pathname.startsWith('/user-info')
    ) {
      throw new Response('No Permission', {
        status: 403,
      });
    }
  }, [cookie, pathname]);
}
