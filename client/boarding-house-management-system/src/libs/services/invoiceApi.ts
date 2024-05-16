import { IInvoice } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const invoiceApi = createApi({
  reducerPath: 'invoice',
  tagTypes: ['invoices', 'invoice'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/invoices',
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getInvoices: builder.query<IInvoice[], void>({
      query: () => '',
      providesTags: ['invoices'],
    }),
    getInvoice: builder.query<IInvoice, number>({
      query: (InvoiceId) => InvoiceId.toString(),
      providesTags: ['invoice'],
    }),
    addInvoice: builder.mutation<IInvoice, IInvoice>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['invoices'],
    }),
    updateInvoice: builder.mutation<IInvoice, IInvoice>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['invoices'],
    }),
    deleteInvoice: builder.mutation<void, number>({
      query: (InvoiceId) => ({
        url: `/${InvoiceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['invoices'],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
