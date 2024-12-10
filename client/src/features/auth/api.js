const API_URL = 'http://localhost:3001/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getToken = () => {
	return localStorage.getItem('token') || null;
};
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
			}),
		}),
		fetchAllMembers: builder.query({
			query: (token) => ({
				url: '/fetch-all-members',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useFetchProfileQuery,
	useRefetchUserQuery,
	useFetchAllMembersQuery,
} = authApi;
