import { useSelector, useDispatch } from 'react-redux';
import {
	loginUser,
	registerUser,
	logout,
	clearError,
	fetchUserProfile,
} from '../src/features/authSlice';

export const useAuth = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	return {
		...auth,
		login: (credentials) => dispatch(loginUser(credentials)),
		register: (userData) => dispatch(registerUser(userData)),
		logout: () => dispatch(logout()),
		clearError: () => dispatch(clearError()),
		fetchProfile: () => dispatch(fetchUserProfile()),
	};
};
