import { useLocation, Navigate, Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = () => {
	const location = useLocation();
	const { token } = useAuth();

	return token ? (
		<Outlet />
	) : (
		<Navigate to='/' state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
