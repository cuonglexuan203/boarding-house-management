import { IRoomDetails } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roomDetailsApi = createApi({
  reducerPath: 'roomDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/rooms/',
    // credentials: 'include',
  }),
  refetchOnReconnect: true,
  tagTypes: ['room'],
  endpoints: (builder) => ({
    getRoomDetails: builder.query<IRoomDetails, number>({
      query: (roomId) => roomId.toString(),
      providesTags: ['room'],
    }),
  }),
});

export const { useGetRoomDetailsQuery } = roomDetailsApi;
