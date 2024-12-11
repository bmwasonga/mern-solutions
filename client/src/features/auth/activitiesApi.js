import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, getToken } from '../../constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getAllActivities = createAsyncThunk('/activities', async () => {
	const response = await fetch(`${API_URL}/activities`, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});
	const data = await response.json();
	return data;
});

const activitiesSlice = createSlice({
	name: 'activities',
	initialState: {
		activities: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllActivities.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllActivities.fulfilled, (state, action) => {
				state.isLoading = false;
				state.activities = action.payload;
			})
			.addCase(getAllActivities.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export default activitiesSlice.reducer;

export { getAllActivities };

// export const activitiesApi = createApi({
// 	reducerPath: 'activitiesApi',
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: API_URL,
// 		prepareHeaders: (headers) => {
// 			const token = getToken();
// 			if (token) {
// 				headers.set('Authorization', `Bearer ${token}`);
// 			}
// 			headers.set('Content-Type', 'application/json');
// 			return headers;
// 		},
// 	}),
// 	endpoints: (builder) => ({
// 		getAllActivities: builder.query({
// 			query: (params) => ({
// 				url: '/activities',
// 				params,
// 			}),
// 		}),
// 	}),
// });

// export const { useGetAllActivitiesQuery } = activitiesApi;
