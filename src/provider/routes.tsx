import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routePath } from '@/constants';
import viewPath from '@/view/route';

const router = createBrowserRouter([
  {
    path: routePath('index'),
    async lazy() {
      const App = await import('@/App');
      return { Component: App.default };
    },
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
          {
            path: routePath('auth.signup.send-mail'),
            async lazy() {
              const { SendMail: Component } = await import('@/modules/auth');
              return { Component };
            },
          },
          {
            path: routePath('auth.signup.success'),
            async lazy() {
              const { Success: Component } = await import('@/modules/auth');
              return { Component };
            },
          },
        ],
      },
      {
        path: routePath('auth.forgetPassword'),
        children: [
          {
            index: true,
            async lazy() {
              const ForgetPassword = await import('@/modules/auth/pages/forgetPassword');
              return { Component: ForgetPassword.default };
            },
          },
          {
            path: routePath('auth.forgetPassword.send-mail'),
            async lazy() {
              const SendMail = await import('@/modules/auth/pages/forgetPassword/SendMail');
              return { Component: SendMail.default };
            },
          },
          {
            path: routePath('auth.forgetPassword.reset-password'),
            async lazy() {
              const ResetPassword = await import(
                '@/modules/auth/pages/forgetPassword/ResetPassword'
              );
              return { Component: ResetPassword.default };
            },
          },
        ],
      },
    ],
  },
  {
    path: routePath('notFound'),
    async lazy() {
      const NotFound = await import('@/modules/notFound');
      return { Component: NotFound.default };
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
