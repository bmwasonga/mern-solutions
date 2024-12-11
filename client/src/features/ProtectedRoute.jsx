import { useLocation, Navigate, Outlet } from 'react-router';
import { useRefetchUserQuery } from './auth/api';
import { getToken } from '../constants';
const ProtectedRoute = () => {
	const location = useLocation();
	const token = getToken();

	const { data: userData, isLoading } = useRefetchUserQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!userData) {
		return <Navigate to='/auth/login' />;
	}

	return token ? (
		<Outlet />
	) : (
		<Navigate to='/auth/login' state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
