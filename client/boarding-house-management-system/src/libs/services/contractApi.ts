import { IAddContract, IContract } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const contractApi = createApi({
  reducerPath: 'contractApi',
  tagTypes: ['contracts', 'rooms'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI + '/api/contracts',
    prepareHeaders: (headers) => {
      const token = Cookies.get('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getContracts: builder.query<IContract, void>({
      query: () => '',
      providesTags: ['contracts'],
    }),
    addContract: builder.mutation<IContract, IAddContract>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['contracts', 'rooms'],
    }),
    updateContract: builder.mutation<IContract, IContract>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['contracts'],
    }),
    deleteContract: builder.mutation<void, number>({
      query: (contractId) => ({
        url: `/${contractId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contracts'],
    }),
  }),
});

export const {
  useGetContractsQuery,
  useAddContractMutation,
  useUpdateContractMutation,
  useDeleteContractMutation,
} = contractApi;
