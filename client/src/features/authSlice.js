import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth/api';

// Export hooks for usage in components
export const {
	useRegisterMutation,
	useLoginMutation,
	useFetchProfileQuery,
	useRefetchUserQuery,
} = authApi;

const initialState = {
	user: null,
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('token');
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			state.error = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Handle registration success
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, { payload }) => {
					state.isAuthenticated = true;
					state.user = payload.user;
					state.token = payload.token;
					state.error = null;
					localStorage.setItem('token', payload.token);
				}
			)
			// Handle login success
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, { payload }) => {
					state.isAuthenticated = true;
					state.user = payload.user;
					state.token = payload.token;
					state.error = null;
					localStorage.setItem('token', payload.token);
				}
			)
			// Handle fetch profile success
			.addMatcher(
				authApi.endpoints.fetchProfile.matchFulfilled,
				(state, { payload }) => {
					state.user = payload;
					state.error = null;
				}
			)
			// Handle fetch profile success
			.addMatcher(
				authApi.endpoints.refetchUser.matchFulfilled,
				(state, { payload }) => {
					state.user = payload;
					state.error = null;
				}
			)
			// Handle any API errors
			.addMatcher(
				authApi.endpoints.register.matchRejected,
				(state, { payload }) => {
					state.error = payload?.data?.message || 'Registration failed';
				}
			)
			.addMatcher(
				authApi.endpoints.login.matchRejected,
				(state, { payload }) => {
					state.error = payload?.data?.message || 'Login failed';
				}
			)
			.addMatcher(
				authApi.endpoints.fetchProfile.matchRejected,
				(state, { payload }) => {
					state.error = payload?.data?.message || 'Failed to fetch profile';
				}
			);
	},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
