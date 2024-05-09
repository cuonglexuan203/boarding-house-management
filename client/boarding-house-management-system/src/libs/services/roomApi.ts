import { IRoom } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/rooms',
    // credentials: 'include',
  }),
  refetchOnReconnect: true,
  tagTypes: ['rooms', 'room'],
  endpoints: (builder) => ({
    getRooms: builder.query<IRoom[], null>({
      query: () => '',
      providesTags: ['rooms'],
    }),
    getRoom: builder.query<IRoom, number>({
      query: (roomId) => roomId.toString(),
      providesTags: ['room'],
    }),
    addRoom: builder.mutation<IRoom, IRoom>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['rooms'],
    }),
    updateRoom: builder.mutation<IRoom, IRoom>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['rooms'],
    }),
    deleteRoom: builder.mutation<void, number>({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['rooms'],
    }),
    //
  }),
});

export const {
  useGetRoomQuery,
  useGetRoomsQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;

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
