import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://localhost:3001';

export const registerUser = createAsyncThunk(
	'auth/register',
	async ({ username, email, password }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${backendURL}/api/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData.message || 'Registration failed');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${backendURL}/api/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData.message || 'Login failed');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

//to deletethis file
