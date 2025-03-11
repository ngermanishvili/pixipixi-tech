import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute, PublicRoute } from './components/RouteGuards';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// ლეიზი ლოდინგის გამოყენება პერფორმანსისთვის
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage').then(module => ({ default: module.RegisterPage })));
const HomePage = lazy(() => import('@/features/images/pages/HomePage').then(module => ({ default: module.HomePage })));
const ImageDetailPage = lazy(() => import('@/features/images/pages/ImageDetailPage').then(module => ({ default: module.ImageDetailPage })));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<LoadingSpinner />}>
        {children}
    </Suspense>
);

export const routes: RouteObject[] = [
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/login',
                element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
            },
            {
                path: '/register',
                element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper>,
            },
        ],
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <SuspenseWrapper><HomePage /></SuspenseWrapper>,
            },
            {
                path: '/images/:id',
                element: <SuspenseWrapper><ImageDetailPage /></SuspenseWrapper>,
            },
        ],
    },
    {
        path: '*',
        element: <SuspenseWrapper><HomePage /></SuspenseWrapper>,
    },
];