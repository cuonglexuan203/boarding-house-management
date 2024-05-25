import { IRoom } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI + '/api/rooms',
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
  tagTypes: ['rooms', 'room'],
  endpoints: (builder) => ({
    getRooms: builder.query<IRoom[], void>({
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
