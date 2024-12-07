import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from './auth/api';

export const registerUser = createAsyncThunk(
	'/register',
	async (userData, { rejectWithValue }) => {
		try {
			return await authApi.register(userData);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	'/login',
	async (credentials, { rejectWithValue }) => {
		try {
			return await authApi.login(credentials);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchUserProfile = createAsyncThunk(
	'/fetchProfile',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { auth } = getState();
			if (!auth.token) throw new Error('No token available');
			return await authApi.fetchProfile(auth.token);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	user: null,
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	isLoading: false,
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
			// Register
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
				localStorage.setItem('token', action.payload.token);
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// Login
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
				localStorage.setItem('token', action.payload.token);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// Fetch Profile
			.addCase(fetchUserProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
