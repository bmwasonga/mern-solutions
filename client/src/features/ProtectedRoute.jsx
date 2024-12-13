import { useLocation, Navigate, Outlet } from 'react-router';
import { useRefetchUserQuery } from './auth/api';
import { getToken } from '../constants';
import { Loading } from '../components/Handlers';
const ProtectedRoute = () => {
	const location = useLocation();
	const token = getToken();

	const { data: userData, isLoading } = useRefetchUserQuery();

	if (isLoading) {
		return <Loading />;
	}

	if (!userData) {
		return <Navigate to='/login' />;
	}

	return token ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
