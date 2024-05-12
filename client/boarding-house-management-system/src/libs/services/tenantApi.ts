import { ITenant } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tenantApi = createApi({
  reducerPath: 'tenantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/tenants',
    // credentials: 'include',
  }),
  refetchOnReconnect: true,
  tagTypes: ['tenants', 'tenant'],
  endpoints: (builder) => ({
    getTenants: builder.query<ITenant[], null>({
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
