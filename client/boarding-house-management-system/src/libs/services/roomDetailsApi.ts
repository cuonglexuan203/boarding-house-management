import { IRoomDetails } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const roomDetailsApi = createApi({
  reducerPath: 'roomDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI + '/api/rooms/',
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
  tagTypes: ['room'],
  endpoints: (builder) => ({
    getRoomDetails: builder.query<IRoomDetails, number>({
      query: (roomId) => roomId.toString(),
      providesTags: ['room'],
    }),
  }),
});

export const { useGetRoomDetailsQuery } = roomDetailsApi;
