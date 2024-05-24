import { IAuthResponse, ISignIn } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/auth/',
    // credentials: 'include',
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    signIn: builder.mutation<IAuthResponse, ISignIn>({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
