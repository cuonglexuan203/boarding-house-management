import { IDistrict, IProvince, IWard } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IGetProvinceResponse {
  results: IProvince[];
}

export interface IGetDistrictResponse {
  results: IDistrict[];
}

export interface IGetWardResponse {
  results: IWard[];
}

export const locationApi = createApi({
  reducerPath: 'location',
  tagTypes: ['provines', 'districts', 'wards'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vapi.vnappmob.com',
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getProvinces: builder.query<IGetProvinceResponse, void>({
      query: () => 'api/province',
      providesTags: ['provines'],
    }),
    getDistricts: builder.query<IGetDistrictResponse, number>({
      query: (provinceId) => `api/province/district/${provinceId}`,
      providesTags: ['districts'],
    }),
    getWards: builder.query<IGetWardResponse, number>({
      query: (districtId) => `api/province/ward/${districtId}`,
      providesTags: ['districts'],
    }),
  }),
});

export const { useGetProvincesQuery, useGetDistrictsQuery, useGetWardsQuery } =
  locationApi;
