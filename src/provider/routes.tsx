import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routePath } from '@/constants';

import viewPath from '@/view/route';

const router = createBrowserRouter([
  {
    path: routePath('index'),
    async lazy() {
      const Main = await import('@/modules/main');
      return { Component: Main.default };
    },
    children: [
      {
        path: routePath('index.stadium'),
        async lazy() {
          const { Stadium: Component } = await import('@/modules/main/pages');
          return { Component };
        },
      },
      {
        path: routePath('index.user-info'),
        async lazy() {
          const { UserInfo: Component } = await import('@/modules/main/pages');
          return { Component };
        },
      },
    ],
  },
  {
    path: routePath('entry'),
    async lazy() {
      const Entry = await import('@/modules/entry');
      return { Component: Entry.default };
    },
  },
  {
    path: routePath('auth'),
    async lazy() {
      const Auth = await import('@/modules/auth');
      return { Component: Auth.default };
    },
    children: [
      {
        path: routePath('auth.login'),
        async lazy() {
          const { Login: Component } = await import('@/modules/auth');
          return { Component };
        },
      },
      {
        path: routePath('auth.signup'),
        children: [
          {
            path: routePath('auth.signup.choose-role'),
            async lazy() {
              const { ChooseRole: Component } = await import('@/modules/auth');
              return { Component };
            },
          },
          {
            path: routePath('auth.signup.account'),
            async lazy() {
              const { Signup: Component } = await import('@/modules/auth');
              return { Component };
            },
          },
        ],
      },
    ],
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
