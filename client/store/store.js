import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/authSlice';
// import activitiesReducer from '../src/features/activitiesSlice';
import { authApi } from '../src/features/auth/api';
import activitiesReducer, {
	getAllActivities,
} from '../src/features/auth/activitiesApi';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		activities: activitiesReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat(authApi.middleware),
});
