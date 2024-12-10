import { createSlice } from '@reduxjs/toolkit';
import { activitiesApi } from './auth/activitiesApi';

export const activitiesSlice = createSlice({
	name: 'activities',
	initialState: {
		activities: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			activitiesApi.endpoints.getAllActivities.matchFulfilled,
			(state, { payload }) => {
				state.activities = payload;
			}
		);
	},
});

export default activitiesSlice.reducer;
