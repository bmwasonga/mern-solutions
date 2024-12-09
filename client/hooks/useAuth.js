import { useSelector, useDispatch } from 'react-redux';
import {
	useLoginMutation,
	useRegisterMutation,
	useFetchProfileQuery,
} from '../src/features/auth/api';
import { logout, clearError } from '../src/features/authSlice';

export const useAuth = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	// Get mutations from RTK Query
	const [loginMutation] = useLoginMutation();
	const [registerMutation] = useRegisterMutation();

	// Create wrapped functions that handle async operations
	const login = async (credentials) => {
		try {
			await loginMutation(credentials).unwrap();
			return { success: true };
		} catch (error) {
			return { success: false, error: error.data?.message || 'Login failed' };
		}
	};

	const register = async (userData) => {
		try {
			await registerMutation(userData).unwrap();
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error.data?.message || 'Registration failed',
			};
		}
	};

	// Use the query hook with skip option if no token is available
	const { data: profile, refetch: refetchProfile } = useFetchProfileQuery(
		undefined,
		{
			skip: !auth.token,
			onError: (error) => {
				if (error.status === 401) {
					window.location.href = '/auth/register';
				}
			},
		}
	);

	return {
		...auth,
		user: auth.user || profile,
		login,
		register,
		logout: () => dispatch(logout()),
		clearError: () => dispatch(clearError()),
		refetchProfile,
		isAuthenticated: Boolean(auth.token && (auth.user || profile)),
	};
};
