import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/authSlice';
import { authApi } from '../src/features/auth/api';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});
