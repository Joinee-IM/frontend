import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import { routePath } from '@/constants';
import viewPath from '@/view/route';

const router = createBrowserRouter([
  {
    path: routePath('index'),
    async lazy() {
      const Main = await import('@/modules/main');
      return { Component: Main.default };
    },
    loader: ({ request }) => {
      // const [searchParams] = useSearchParams();
      const error = new URL(request.url).searchParams.get('error');
      const account_id = new URL(request.url).searchParams.get('account_id');
      if (error === 'LoginFailed') {
        return redirect(`/auth/signup/edit-role/${account_id}`);
      }
      return null;
    },
    children: [
      {
        path: routePath('index.stadium'),
        children: [
          {
            index: true,
            async lazy() {
              const { Stadium: Component } = await import('@/modules/main/pages');
              return { Component };
            },
          },
          {
            path: routePath('index.stadium.venue'),
            async lazy() {
              const { Venue: Component } = await import('@/modules/main/pages');
              return { Component };
            },
          },
        ],
      },
      {
        path: routePath('index.user-info'),
        async lazy() {
          const { UserInfo } = await import('@/modules/main/pages');
          return { Component: UserInfo };
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
          {
            path: routePath('auth.signup.edit-role'),
            async lazy() {
              const { EditRole: Component } = await import('@/modules/auth');
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
