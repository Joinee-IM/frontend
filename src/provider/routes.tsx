import { Modal } from 'antd';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ROUTES from '@/routes';

const router = createBrowserRouter(ROUTES);

export default function RouteProvider() {
  const info = () => {
    Modal.info({
      title: 'This is a suspended system',
      content: (
        <div>
          <p>Due to budget constraints, we have decided to temporarily suspend our services.</p>
          <p>Thank you for your visit.</p>
        </div>
      ),
    });
  };

  useEffect(() => {
    info();
  }, []);
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
