import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['user', 'account', 'invoices'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    // credentials: 'include',
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});

// export const {} = userApi;

// //
// endpoints: (builder) => ({
//   getUser: builder.query<User, { id: number }>({
//     query: (id) => `users/${id}`,
//     providesTags: ['user'],
//   }),
//   updateUser: builder.mutation<ResponseData, UserInfo>({
//     query: (userInfo) => ({
//       url: `users`,
//       method: 'PUT',
//       body: userInfo,
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//       },
//     }),
//     invalidatesTags: ['account', 'user'],
//   }),
//   signUp: builder.mutation<AuthResponseBody, SignUpRequestBody>({
//     query: (body) => ({
//       url: 'auth/signup',
//       method: 'POST',
//       body: body,
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//       },
//     }),
//     invalidatesTags: ['account', 'user'],
//   }),
//   signIn: builder.mutation<AuthResponseBody, Account>({
//     query: (account) => ({
//       url: 'auth/signin',
//       method: 'POST',
//       body: account,
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//       },
//     }),
//     invalidatesTags: ['account', 'user'],
//   }),
//   changePassword: builder.mutation<ResponseData, ChangePasswordRequestBody>({
//     query: (body) => ({
//       url: 'changepassword',
//       method: 'PUT',
//       body,
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//       },
//     }),
//     invalidatesTags: [],
//   }),
// }),
