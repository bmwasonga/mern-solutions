import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/authSlice';
import { authApi } from '../src/features/auth/api';
import activitiesReducer from '../src/features/auth/activitiesApi';
import membersReducer from '../src/features/auth/membersApi';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		activities: activitiesReducer,
		members: membersReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat(authApi.middleware),
});
