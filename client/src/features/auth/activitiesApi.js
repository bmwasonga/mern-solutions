import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, getToken } from '../../constants';

export const activitiesApi = createApi({
	reducerPath: 'activitiesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers) => {
			const token = getToken();
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getAllActivities: builder.query({
			query: (params) => ({
				url: '/activities',
				params,
			}),
		}),
	}),
});

export const { useGetAllActivitiesQuery } = activitiesApi;
