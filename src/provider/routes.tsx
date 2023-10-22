import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routePath } from '@/constants';

import viewPath from '@/view/route';

const router = createBrowserRouter([
  {
    path: routePath('main'),
    async lazy() {
      const App = await import('@/App');
      return { Component: App.default };
    },
  },
  {
    path: routePath('view'),
    async lazy() {
      const View = await import('@/view');
      return { Component: View.default };
    },
    children: viewPath,
  },
]);

export default function RouteProvider() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
