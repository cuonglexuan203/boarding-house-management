import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    credentials: 'include',
  }),
  refetchOnReconnect: true,
  tagTypes: [],
  endpoints: (builder) => ({}),
});

// export const {} = productsApi;

// endpoints: (builder) => ({
//   purchase: builder.mutation<null, null>({
//     query: (body) => ({
//       url: 'purchase',
//       method: 'POST',
//       body,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }),
//     invalidatesTags: [],
//   }),
//   getInvoices: builder.query<null, null>({
//     query: (userId) => `invoices?userId=${userId}`,
//     providesTags: [],
//   }),
// }),
