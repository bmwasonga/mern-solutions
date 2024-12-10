import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, getToken } from '../../constants';

export const authApi = createApi({
	reducerPath: 'authApi',
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
		register: builder.mutation({
			query: (userData) => ({
				url: '/register',
				method: 'POST',
				body: userData,
			}),
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		fetchProfile: builder.query({
			query: (token) => ({
				url: '/refetch-user',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		refetchUser: builder.query({
			query: (token) => ({
				url: '/refetch-useer',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				keepUnusedDataFor: 10000,
				refetchOnMountOrArgChange: true, // Ensure fresh data on mount
			}),
		}),
		getAllMembers: builder.query({
			query: (token) => ({
				url: '/get-all-members',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		// getAllActivities: builder.query({
		// 	query: (token) => ({
		// 		url: '/activities',
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	}),
		// }),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useFetchProfileQuery,
	useRefetchUserQuery,
	useGetAllMembersQuery,
	// useGetAllActivitiesQuery,
} = authApi;
