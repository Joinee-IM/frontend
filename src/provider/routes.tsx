import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '@/App';
import View from '@/view';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/view',
    element: <View />,
  },
]);

export default function RouteProvider() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
