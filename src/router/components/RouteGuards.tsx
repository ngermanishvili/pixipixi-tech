import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';


export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuthStore();

    // თუ ჯერ ვამოწმებთ ავთენტიფიკაციის სტატუსს, ვაჩვენოთ ლოადინგი
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>;
    }

    // თუ არ არის ავტორიზებული, გადავამისამართოთ ლოგინზე
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // სხვა შემთხვევაში ვაჩვენოთ დაცული კონტენტი
    return <Outlet />;
};

//! გადამისამართება მთავარ გვერდზე ავტორიზებული მომხმარებლებისთვის
export const PublicRoute = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};