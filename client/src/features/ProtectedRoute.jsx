import { useLocation, Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
//create a custom hook to select the current token

const ProtectedRoute = () => {
	const location = useLocation();
	const { token } = useSelector((state) => state.auth);

	if (!token) {
		return <Navigate to='/' state={{ from: location }} />;
	}

	return token ? (
		<Outlet />
	) : (
		<Navigate to='/' state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
