import { ITenant } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const tenantApi = createApi({
  reducerPath: 'tenantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI + '/api/tenants',
    // credentials: 'include',
    prepareHeaders: (headers) => {
      const token = Cookies.get('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  tagTypes: ['tenants', 'tenant'],
  endpoints: (builder) => ({
    getTenants: builder.query<ITenant[], void>({
      query: () => '',
      providesTags: ['tenants'],
    }),
    getTenant: builder.query<ITenant, number>({
      query: (tenantId) => `/${tenantId}`,
      providesTags: ['tenant'],
    }),
    addTenant: builder.mutation<ITenant, ITenant>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['tenants'],
    }),
    updateTenant: builder.mutation<ITenant, any>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['tenants'],
    }),
    deleteTenant: builder.mutation<void, number>({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tenants'],
    }),
    //
  }),
});

export const {
  useGetTenantQuery,
  useGetTenantsQuery,
  useAddTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
} = tenantApi;
