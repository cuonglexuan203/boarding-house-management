import {IService} from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  tagTypes: ['services'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/services',
    //credentials: 'include',
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getServices: builder.query<IService[], void>({
      query: () => '',
      providesTags: ['services']
    }),
    addService: builder.mutation<IService, IService>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['services'],
    }),
    updateService: builder.mutation<IService, IService>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['services'],
    }),
    deleteService: builder.mutation<void, number>({
      query: (ServiceId) => ({
        url: `/${ServiceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['services'],
    }),
  }),
});

export const { useGetServicesQuery, useAddServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation } = serviceApi;