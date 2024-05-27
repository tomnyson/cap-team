import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ForgotPassword = lazy(() => import('src/pages/forgot'));
export const ConfirmOTPPage = lazy(() => import('src/pages/confirm-otp'));
export const VerifyEmail = lazy(() => import('src/pages/verify-email'));
import PrivateRoute from '../components/PrivateRoute';
import VerifyEmailPage from 'src/pages/verify-email';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (

        <DashboardLayout>
          <PrivateRoute>
            <Suspense>
              <Outlet />
            </Suspense>
          </PrivateRoute>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: 'confirm-otp',
      element: <ConfirmOTPPage />,
    },
    {
      path: 'verify-email',
      element: <VerifyEmailPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
