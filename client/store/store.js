import { configureStore } from '@reduxjs/toolkit';
import authReducer, { refetchUser } from '../src/features/authSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

//trying this to rehydrate

// const token = localStorage.getItem('token');
// if (token) {
// 	store.dispatch(refetchUser());
// }

export default store;
